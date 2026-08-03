from typing import Any, Dict, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import PostgresDsn, field_validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "MetricMind API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    SQLALCHEMY_DATABASE_URI: str
    
    model_config = SettingsConfigDict(env_file="../.env", case_sensitive=True, extra='ignore')

settings = Settings()
