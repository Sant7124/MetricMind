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
    BACKEND_CORS_ORIGINS: list[str] = ["*"]
    
    SECRET_KEY: str = "changeme_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    ENVIRONMENT: str = "production"
    DATABASE_URL: str = ""
    SQLALCHEMY_DATABASE_URI: str = "sqlite+aiosqlite:///./metricmind.db"
    
    @property
    def get_database_url(self) -> str:
        if self.DATABASE_URL:
            url = self.DATABASE_URL
            if url.startswith("postgres://"):
                url = url.replace("postgres://", "postgresql+asyncpg://", 1)
            elif url.startswith("postgresql://") and "asyncpg" not in url:
                url = url.replace("postgresql://", "postgresql+asyncpg://", 1)
            return url
            
        if self.ENVIRONMENT == "production":
            raise ValueError("DATABASE_URL is required in production environment. Refusing to fallback to SQLite.")
            
        return self.SQLALCHEMY_DATABASE_URI
    
    GEMINI_API_KEY: str = ""
    DEEPSEEK_API_KEY: str = ""
    OPENROUTER_API_KEY: str = ""
    
    model_config = SettingsConfigDict(env_file=_find_env_file(), case_sensitive=True, extra='ignore')

settings = Settings()
