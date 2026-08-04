import httpx
import asyncio
from app.core.config import settings

async def test():
    print("Testing Gemini...")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={settings.GEMINI_API_KEY}"
    payload = {
        "system_instruction": {"parts": [{"text": "hi"}]},
        "contents": [{"parts": [{"text": "hi"}]}]
    }
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(url, json=payload)
            print("Gemini:", resp.status_code, resp.text[:200])
        except Exception as e: print("Gemini Error:", e)

    print("Testing OpenRouter...")
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {"Authorization": f"Bearer {settings.OPENROUTER_API_KEY}", "Content-Type": "application/json"}
    payload = {
        "model": "openai/gpt-4o-mini",
        "messages": [{"role": "user", "content": "hi"}]
    }
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.post(url, headers=headers, json=payload)
            print("OpenRouter:", resp.status_code, resp.text[:200])
        except Exception as e: print("OpenRouter Error:", e)

asyncio.run(test())
