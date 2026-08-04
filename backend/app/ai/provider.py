import os
import json
import httpx
from abc import ABC, abstractmethod
from typing import Dict, Any, List

class BaseLLMProvider(ABC):
    @abstractmethod
    async def generate(self, system_prompt: str, user_prompt: str) -> str:
        pass

class OrchestratedProvider(BaseLLMProvider):
    """
    Implements a fallback mechanism: Gemini -> Deepseek -> OpenRouter
    """
    def __init__(self):
        from app.core.config import settings
        self.gemini_key = settings.GEMINI_API_KEY
        self.deepseek_key = settings.DEEPSEEK_API_KEY
        self.openrouter_key = settings.OPENROUTER_API_KEY
        
    async def generate(self, system_prompt: str, user_prompt: str) -> str:
        import asyncio
        tasks = [
            asyncio.create_task(self._call_gemini(system_prompt, user_prompt), name="Gemini"),
            asyncio.create_task(self._call_deepseek(system_prompt, user_prompt), name="Deepseek"),
            asyncio.create_task(self._call_openrouter(system_prompt, user_prompt), name="OpenRouter")
        ]
        
        pending = set(tasks)
        while pending:
            done, pending = await asyncio.wait(pending, return_when=asyncio.FIRST_COMPLETED)
            for task in done:
                try:
                    result = task.result()
                    # Cancel remaining tasks
                    for p in pending:
                        p.cancel()
                    print(f"{task.get_name()} succeeded first. Canceling others.")
                    return result
                except Exception as e:
                    print(f"{task.get_name()} failed: {e}")
                    pass
                    
        raise RuntimeError("All configured LLM providers failed.")

    async def _call_gemini(self, system_prompt: str, user_prompt: str) -> str:
        if not self.gemini_key: raise ValueError("No Gemini Key")
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.gemini_key}"
        payload = {
            "system_instruction": {"parts": [{"text": system_prompt}]},
            "contents": [{"parts": [{"text": user_prompt}]}],
            "generationConfig": {"temperature": 0.1}
        }
        async with httpx.AsyncClient() as client:
            resp = await client.post(url, json=payload, timeout=20.0)
            resp.raise_for_status()
            return resp.json()['candidates'][0]['content']['parts'][0]['text']

    async def _call_deepseek(self, system_prompt: str, user_prompt: str) -> str:
        if not self.deepseek_key: raise ValueError("No Deepseek Key")
        url = "https://api.deepseek.com/chat/completions"
        headers = {"Authorization": f"Bearer {self.deepseek_key}", "Content-Type": "application/json"}
        payload = {
            "model": "deepseek-chat",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "temperature": 0.1
        }
        async with httpx.AsyncClient() as client:
            resp = await client.post(url, headers=headers, json=payload, timeout=20.0)
            resp.raise_for_status()
            return resp.json()['choices'][0]['message']['content']

    async def _call_openrouter(self, system_prompt: str, user_prompt: str) -> str:
        if not self.openrouter_key: raise ValueError("No OpenRouter Key")
        url = "https://openrouter.ai/api/v1/chat/completions"
        headers = {"Authorization": f"Bearer {self.openrouter_key}", "Content-Type": "application/json"}
        payload = {
            "model": "openai/gpt-4o-mini", # Fallback model
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            "temperature": 0.1
        }
        async with httpx.AsyncClient() as client:
            resp = await client.post(url, headers=headers, json=payload, timeout=20.0)
            resp.raise_for_status()
            return resp.json()['choices'][0]['message']['content']

def get_llm_provider(provider_name: str = "orchestrated") -> BaseLLMProvider:
    return OrchestratedProvider()
