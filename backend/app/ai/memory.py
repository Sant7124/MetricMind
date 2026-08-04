from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

# Memory structures (In a full implementation, these map to SQLAlchemy models)
class ChatMessage(BaseModel):
    id: str
    role: str
    content: str
    timestamp: datetime
    metrics_used: List[str] = []
    dimensions_used: List[str] = []

class Conversation(BaseModel):
    id: str
    title: str
    messages: List[ChatMessage]
    created_at: datetime
    updated_at: datetime

# In-memory store for Phase 3 (Easily swappable to Postgres/Redis)
_memory_store: Dict[str, Conversation] = {}

class ConversationMemory:
    @staticmethod
    def create_conversation(title: str = "New Chat") -> str:
        conv_id = str(uuid.uuid4())
        _memory_store[conv_id] = Conversation(
            id=conv_id,
            title=title,
            messages=[],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )
        return conv_id
        
    @staticmethod
    def get_conversation(conv_id: str) -> Optional[Conversation]:
        return _memory_store.get(conv_id)
        
    @staticmethod
    def add_message(conv_id: str, role: str, content: str, metrics: List[str] = None, dimensions: List[str] = None):
        conv = _memory_store.get(conv_id)
        if conv:
            msg = ChatMessage(
                id=str(uuid.uuid4()),
                role=role,
                content=content,
                timestamp=datetime.utcnow(),
                metrics_used=metrics or [],
                dimensions_used=dimensions or []
            )
            conv.messages.append(msg)
            conv.updated_at = datetime.utcnow()
            
            # Auto-title if it's the first user message
            if len(conv.messages) == 1 and role == "user":
                conv.title = content[:30] + "..." if len(content) > 30 else content
                
    @staticmethod
    def list_conversations() -> List[Dict]:
        return [{"id": c.id, "title": c.title, "updated_at": c.updated_at} for c in _memory_store.values()]
        
    @staticmethod
    def delete_conversation(conv_id: str):
        if conv_id in _memory_store:
            del _memory_store[conv_id]
