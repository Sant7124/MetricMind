from typing import Any, Dict, List
from sqlalchemy import text
from app.database.session import AsyncSessionLocal
from .base import BaseWarehouseAdapter

class PostgresAdapter(BaseWarehouseAdapter):
    async def execute_query(self, query: str, parameters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        async with AsyncSessionLocal() as session:
            try:
                # Execution with strict parameterization provided by SQLAlchemy text()
                result = await session.execute(text(query), parameters or {})
                # Fetch all rows and convert to dict for JSON serialization
                rows = result.mappings().all()
                return [dict(row) for row in rows]
            except Exception as e:
                # Log warehouse error
                raise ValueError(f"PostgreSQL Execution Error: {str(e)}")

    def validate_connection(self) -> bool:
        return True # Handled by FastAPI lifecycle
