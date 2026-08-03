from sqlalchemy import Column, String, Text, ForeignKey, JSON, Boolean
from sqlalchemy.orm import relationship
from .base_model import BaseModel, GUID

class AuditLog(BaseModel):
    __tablename__ = "audit_logs"

    user_id = Column(GUID(), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String(100), nullable=False)
    entity_type = Column(String(100)) # e.g., 'user', 'dashboard'
    entity_id = Column(String(100))
    changes = Column(JSON) # Old vs New values
    ip_address = Column(String(50))


class Notification(BaseModel):
    __tablename__ = "notifications"

    user_id = Column(GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(150), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    notification_type = Column(String(50)) # e.g., 'alert', 'system', 'report'
