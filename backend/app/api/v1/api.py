from fastapi import APIRouter
from app.api.v1.endpoints import (
    health, auth, reports, analytics, chat, admin, audit, catalog, governance,
    export, monitoring
)

api_router = APIRouter()

api_router.include_router(health.router, tags=["health"])
api_router.include_router(monitoring.router, prefix="/monitoring", tags=["monitoring"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(admin.router, prefix="/admin", tags=["admin"])
api_router.include_router(audit.router, prefix="/audit", tags=["audit"])
api_router.include_router(catalog.router, prefix="/catalog", tags=["catalog"])
api_router.include_router(governance.router, prefix="/governance", tags=["governance"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(export.router, prefix="/export", tags=["export"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])

@api_router.get("/")
async def api_root():
    return {"status": "success", "message": "MetricMind API v1 is running", "data": None}


