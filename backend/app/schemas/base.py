from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional
from uuid import UUID

class BaseSchema(BaseModel):
    id: UUID
    created_at: datetime
    updated_at: datetime
    created_by: Optional[UUID] = None
    updated_by: Optional[UUID] = None
    soft_delete: bool = False
    
    model_config = ConfigDict(from_attributes=True)

class BaseSchemaCreate(BaseModel):
    pass

class BaseSchemaUpdate(BaseModel):
    pass
