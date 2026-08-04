from fastapi import APIRouter
from app.api.v1.endpoints import health, auth, users, roles, permissions, companies, dashboards, reports, analytics, chat

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
# api_router.include_router(users.router, prefix="/users", tags=["users"])
# api_router.include_router(roles.router, prefix="/roles", tags=["roles"])
# api_router.include_router(permissions.router, prefix="/permissions", tags=["permissions"])
# api_router.include_router(companies.router, prefix="/companies", tags=["companies"])
# api_router.include_router(dashboards.router, prefix="/dashboards", tags=["dashboards"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])


