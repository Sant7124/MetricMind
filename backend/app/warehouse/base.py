from abc import ABC, abstractmethod
from typing import Any, Dict, List

class BaseWarehouseAdapter(ABC):
    @abstractmethod
    async def execute_query(self, query: str, parameters: Dict[str, Any] = None) -> List[Dict[str, Any]]:
        """Executes a strictly formatted SQL query and returns rows as dictionaries."""
        pass
    
    @abstractmethod
    def validate_connection(self) -> bool:
        """Checks if the warehouse connection is healthy."""
        pass
