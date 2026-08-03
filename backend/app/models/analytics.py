from sqlalchemy import Column, String, Text, ForeignKey, JSON, Integer
from sqlalchemy.orm import relationship
from .base_model import BaseModel, GUID

class Dashboard(BaseModel):
    __tablename__ = "dashboards"

    name = Column(String(150), nullable=False)
    description = Column(Text)
    owner_id = Column(GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    is_public = Column(Integer, default=0) # 0 or 1 for boolean-like behavior or use Boolean
    layout = Column(JSON) # Store grid layout config

    widgets = relationship("DashboardWidget", back_populates="dashboard", cascade="all, delete-orphan")


class DashboardWidget(BaseModel):
    __tablename__ = "dashboard_widgets"

    dashboard_id = Column(GUID(), ForeignKey("dashboards.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(150))
    widget_type = Column(String(50), nullable=False) # e.g., 'chart', 'table', 'metric'
    config = Column(JSON, nullable=False) # specific config for the widget type

    dashboard = relationship("Dashboard", back_populates="widgets")


class Report(BaseModel):
    __tablename__ = "reports"

    name = Column(String(150), nullable=False)
    description = Column(Text)
    owner_id = Column(GUID(), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    file_url = Column(String(255))
    parameters = Column(JSON)


class QueryHistory(BaseModel):
    __tablename__ = "query_history"

    user_id = Column(GUID(), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    natural_language_query = Column(Text, nullable=False)
    generated_sql = Column(Text)
    execution_time_ms = Column(Integer)
    status = Column(String(50)) # 'success', 'error'
    error_message = Column(Text)


class ConversationHistory(BaseModel):
    __tablename__ = "conversation_history"

    user_id = Column(GUID(), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    session_id = Column(String(100), index=True)
    message_type = Column(String(50)) # 'user', 'ai'
    content = Column(Text, nullable=False)
    context_data = Column(JSON) # References to charts, metrics used
