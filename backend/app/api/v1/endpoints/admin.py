from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from app.utils.responses import success_response, error_response, APIResponse
# from app.api.deps import get_current_active_superuser # In real app

router = APIRouter()

# Mock Database for Users Phase 4
USERS_DB = [
    {"id": "usr-1", "name": "Alice Executive", "email": "alice@metricmind.com", "role": "Super Admin", "status": "Active", "last_login": "2026-08-04T10:00:00Z"},
    {"id": "usr-2", "name": "Bob Analyst", "email": "bob@metricmind.com", "role": "Analyst", "status": "Active", "last_login": "2026-08-03T15:30:00Z"},
    {"id": "usr-3", "name": "Charlie Manager", "email": "charlie@metricmind.com", "role": "Manager", "status": "Inactive", "last_login": "2026-07-28T09:12:00Z"}
]

@router.get("/users", response_model=APIResponse)
async def get_users():
    return success_response(data=USERS_DB, message="Users retrieved successfully")

@router.post("/users", response_model=APIResponse)
async def create_user(user: Dict[str, Any]):
    user["id"] = f"usr-{len(USERS_DB)+1}"
    user["status"] = "Active"
    USERS_DB.append(user)
    return success_response(data=user, message="User created successfully")

@router.put("/users/{user_id}/role", response_model=APIResponse)
async def update_user_role(user_id: str, payload: Dict[str, str]):
    for u in USERS_DB:
        if u["id"] == user_id:
            u["role"] = payload.get("role")
            return success_response(data=u, message="Role updated successfully")
    return error_response("User not found", 404)

@router.get("/settings", response_model=APIResponse)
async def get_system_settings():
    settings = {
        "theme": "System Default",
        "timezone": "UTC",
        "ai_provider": "Gemini",
        "warehouse_type": "PostgreSQL",
        "session_timeout_minutes": 60,
        "two_factor_auth": True
    }
    return success_response(data=settings)

@router.post("/settings", response_model=APIResponse)
async def update_system_settings(settings: Dict[str, Any]):
    # Note: In a real app, this updates DB or config file
    return success_response(data=settings, message="Settings updated successfully")
