from fastapi import APIRouter
from app.utils.responses import success_response, error_response, APIResponse
from app.database.session import AsyncSessionLocal
from sqlalchemy import select, func
from app.models.system import AuditLog

router = APIRouter()

@router.get("/", response_model=APIResponse)
async def get_audit_logs(limit: int = 50, offset: int = 0):
    async with AsyncSessionLocal() as session:
        # Get total count
        count_stmt = select(func.count()).select_from(AuditLog)
        total = await session.execute(count_stmt)
        total_count = total.scalar() or 0
        
        # Get logs
        stmt = select(AuditLog).order_by(AuditLog.created_at.desc()).offset(offset).limit(limit)
        result = await session.execute(stmt)
        logs = result.scalars().all()
        
        formatted_logs = []
        for log in logs:
            formatted_logs.append({
                "id": str(log.id),
                "timestamp": log.created_at.isoformat(),
                "user": "System" if not log.user_id else str(log.user_id), # Ideally join with User table for name
                "action": log.action,
                "ip_address": log.ip_address or "Unknown",
                "details": str(log.changes)
            })
            
        return success_response(data={
            "logs": formatted_logs,
            "total": total_count
        })
