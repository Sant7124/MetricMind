from sqlalchemy import Column, String, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from .base_model import BaseModel, GUID

# Association table for roles and permissions
role_permissions = Table(
    'role_permissions',
    BaseModel.metadata,
    Column('role_id', GUID(), ForeignKey('roles.id', ondelete="CASCADE"), primary_key=True),
    Column('permission_id', GUID(), ForeignKey('permissions.id', ondelete="CASCADE"), primary_key=True)
)

class User(BaseModel):
    __tablename__ = "users"

    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    
    role_id = Column(GUID(), ForeignKey("roles.id", ondelete="SET NULL"), nullable=True)
    company_id = Column(GUID(), ForeignKey("companies.id", ondelete="SET NULL"), nullable=True)
    department_id = Column(GUID(), ForeignKey("departments.id", ondelete="SET NULL"), nullable=True)

    role = relationship("Role", back_populates="users")
    company = relationship("Company", back_populates="users")
    department = relationship("Department", back_populates="users")
    sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")


class Role(BaseModel):
    __tablename__ = "roles"

    name = Column(String(50), unique=True, index=True, nullable=False)
    description = Column(String(255))

    users = relationship("User", back_populates="role")
    permissions = relationship("Permission", secondary=role_permissions, back_populates="roles")


class Permission(BaseModel):
    __tablename__ = "permissions"

    name = Column(String(50), unique=True, index=True, nullable=False)
    description = Column(String(255))

    roles = relationship("Role", secondary=role_permissions, back_populates="permissions")


class Session(BaseModel):
    __tablename__ = "sessions"

    user_id = Column(GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    token = Column(String(500), unique=True, index=True, nullable=False)
    expires_at = Column(String, nullable=False) # Or DateTime
    is_revoked = Column(Boolean, default=False)
    ip_address = Column(String(50))
    user_agent = Column(String(255))

    user = relationship("User", back_populates="sessions")
