from fastapi import APIRouter, Depends, HTTPException, Body
from typing import Dict, Any, List
from pydantic import BaseModel

from app.utils.responses import success_response, error_response, APIResponse
from app.ai.orchestrator import orchestrator
from app.ai.memory import ConversationMemory

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    conversation_id: str = None

@router.post("/", response_model=APIResponse)
async def chat(request: ChatRequest):
    try:
        conv_id = request.conversation_id or ConversationMemory.create_conversation()
        
        ConversationMemory.add_message(conv_id, "user", request.message)
        
        # In a real implementation, we would pass the conversation history to the orchestrator
        # for context resolution (e.g. "Now only Europe").
        response_text = await orchestrator.process_chat(request.message, history=[])
        
        ConversationMemory.add_message(conv_id, "assistant", response_text)
        
        return success_response(data={
            "conversation_id": conv_id,
            "response": response_text
        })
    except Exception as e:
        return error_response(f"Chat Error: {str(e)}")

@router.get("/conversations", response_model=APIResponse)
async def list_conversations():
    return success_response(data=ConversationMemory.list_conversations())

@router.get("/{conversation_id}", response_model=APIResponse)
async def get_conversation(conversation_id: str):
    conv = ConversationMemory.get_conversation(conversation_id)
    if not conv:
        return error_response("Conversation not found", 404)
    return success_response(data=conv.model_dump())

@router.delete("/{conversation_id}", response_model=APIResponse)
async def delete_conversation(conversation_id: str):
    ConversationMemory.delete_conversation(conversation_id)
    return success_response(message="Conversation deleted")

@router.get("/suggestions/smart", response_model=APIResponse)
async def get_suggestions():
    suggestions = [
        "Show monthly revenue for the last year",
        "Compare Profit Margin across regions",
        "What is the average order value by department?",
        "Why did revenue drop last month?"
    ]
    return success_response(data=suggestions)
