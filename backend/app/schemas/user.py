from typing import Optional, List
from pydantic import EmailStr, BaseModel, Field
from uuid import UUID
from .base import BaseSchema, BaseSchemaCreate, BaseSchemaUpdate

class RoleBase(BaseModel):
    name: str = Field(..., max_length=50)
    description: Optional[str] = Field(None, max_length=255)

class RoleCreate(RoleBase, BaseSchemaCreate):
    pass

class RoleUpdate(RoleBase, BaseSchemaUpdate):
    name: Optional[str] = Field(None, max_length=50)

class Role(RoleBase, BaseSchema):
    pass


class UserBase(BaseModel):
    email: EmailStr
    first_name: Optional[str] = Field(None, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    is_active: bool = True
    is_superuser: bool = False
    role_id: Optional[UUID] = None
    company_id: Optional[UUID] = None
    department_id: Optional[UUID] = None

class UserCreate(UserBase, BaseSchemaCreate):
    password: str = Field(..., min_length=8)

class UserUpdate(UserBase, BaseSchemaUpdate):
    email: Optional[EmailStr] = None
    password: Optional[str] = Field(None, min_length=8)

class User(UserBase, BaseSchema):
    pass


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenPayload(BaseModel):
    sub: Optional[str] = None
