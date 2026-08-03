from datetime import datetime
from typing import Any, Optional
from pydantic import BaseModel

class APIResponse(BaseModel):
    status: str
    message: str
    data: Optional[Any] = None
    timestamp: str

def success_response(data: Any = None, message: str = "Success") -> APIResponse:
    return APIResponse(
        status="success",
        message=message,
        data=data,
        timestamp=datetime.utcnow().isoformat()
    )

def error_response(message: str, data: Any = None) -> APIResponse:
    return APIResponse(
        status="error",
        message=message,
        data=data,
        timestamp=datetime.utcnow().isoformat()
    )
