from pydantic_settings import BaseSettings, SettingsConfigDict
import os
from pathlib import Path

def _find_env_file() -> str:
    """Find .env file relative to this file's location regardless of CWD."""
    # Try the root-level .env (project root)
    root_env = Path(__file__).parent.parent.parent.parent / ".env"
    if root_env.exists():
        return str(root_env)
    # Try backend-level .env
    backend_env = Path(__file__).parent.parent.parent / ".env"
    if backend_env.exists():
        return str(backend_env)
    return ".env"

class Settings(BaseSettings):
    PROJECT_NAME: str = "MetricMind API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    SECRET_KEY: str = "changeme_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    SQLALCHEMY_DATABASE_URI: str = "sqlite+aiosqlite:///./metricmind.db"
    
    GEMINI_API_KEY: str = ""
    DEEPSEEK_API_KEY: str = ""
    OPENROUTER_API_KEY: str = ""
    
    model_config = SettingsConfigDict(env_file=_find_env_file(), case_sensitive=True, extra='ignore')

settings = Settings()
