import json
from typing import Any, Optional

class CacheService:
    """
    Abstracted Caching Layer.
    Currently uses an in-memory dictionary.
    Ready to swap to Redis using redis-py for production environments.
    """
    def __init__(self):
        self._memory_cache = {}

    async def get(self, key: str) -> Optional[Any]:
        # TODO: Implement Redis `await redis_client.get(key)`
        data = self._memory_cache.get(key)
        if data:
            return json.loads(data)
        return None

    async def set(self, key: str, value: Any, ttl_seconds: int = 3600) -> None:
        # TODO: Implement Redis `await redis_client.setex(key, ttl_seconds, json_data)`
        self._memory_cache[key] = json.dumps(value)

    async def invalidate(self, key: str) -> None:
        if key in self._memory_cache:
            del self._memory_cache[key]

cache_service = CacheService()
