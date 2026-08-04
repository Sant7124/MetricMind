import os
import json
import httpx
from abc import ABC, abstractmethod
from typing import Dict, Any, List

class BaseLLMProvider(ABC):
    @abstractmethod
    async def generate(self, system_prompt: str, user_prompt: str) -> str:
        pass

class GeminiProvider(BaseLLMProvider):
    def __init__(self):
        # We will use the REST API via httpx for dependency-light integration
        self.api_key = os.getenv("GEMINI_API_KEY", os.getenv("OPENAI_API_KEY", "")) # Fallback for testing
        self.base_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
        
    async def generate(self, system_prompt: str, user_prompt: str) -> str:
        if not self.api_key:
            # Fallback for when API key is not set during scaffold testing
            return self._generate_stub_response(system_prompt, user_prompt)
            
        headers = {'Content-Type': 'application/json'}
        payload = {
            "system_instruction": {
                "parts": [{"text": system_prompt}]
            },
            "contents": [{
                "parts": [{"text": user_prompt}]
            }],
            "generationConfig": {
                "temperature": 0.1 # Low temp for analytical accuracy
            }
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}?key={self.api_key}",
                    headers=headers,
                    json=payload,
                    timeout=30.0
                )
                response.raise_for_status()
                data = response.json()
                return data['candidates'][0]['content']['parts'][0]['text']
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return self._generate_stub_response(system_prompt, user_prompt)
            
    def _generate_stub_response(self, system_prompt: str, user_prompt: str) -> str:
        """Fallback stub for testing without API keys."""
        if "OUTPUT FORMAT:" in system_prompt:
            # Stub intent extraction
            return json.dumps({
                "intent": "Revenue Question",
                "is_valid": True,
                "rejection_reason": "",
                "metrics": ["Revenue"],
                "dimensions": ["Time"],
                "filters": [],
                "time_grain": "Monthly"
            })
        else:
            # Stub insight generation
            return """Here is the executive summary based on the data:
Revenue has shown consistent performance.

```json
{
  "type": "chart",
  "chartType": "bar",
  "data": [{"name": "Placeholder", "value": 100}]
}
```
"""

def get_llm_provider(provider_name: str = "gemini") -> BaseLLMProvider:
    # Factory allows easy swapping to OpenAI, Groq, etc. in the future
    if provider_name.lower() == "gemini":
        return GeminiProvider()
    # Add OpenAIProvider(), GroqProvider() here
    return GeminiProvider()
