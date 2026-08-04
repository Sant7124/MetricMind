from fastapi import APIRouter
from typing import List, Dict, Any
import random
from datetime import datetime, timedelta
from app.utils.responses import success_response, APIResponse

router = APIRouter()

def generate_mock_audits() -> List[Dict[str, Any]]:
    actions = ["Login", "Logout", "Dashboard Created", "Report Exported", "AI Query", "Analytics Query", "Role Changed"]
    users = ["Alice Executive", "Bob Analyst", "Charlie Manager", "System"]
    logs = []
    
    now = datetime.utcnow()
    for i in range(50):
        logs.append({
            "id": f"log-{1000+i}",
            "timestamp": (now - timedelta(minutes=random.randint(1, 2880))).isoformat(),
            "user": random.choice(users),
            "action": random.choice(actions),
            "ip_address": f"192.168.1.{random.randint(1, 255)}",
            "execution_time_ms": random.randint(10, 1500) if "Query" in actions else None,
            "details": "Action completed successfully."
        })
    return sorted(logs, key=lambda x: x["timestamp"], reverse=True)

AUDIT_DB = generate_mock_audits()

@router.get("/", response_model=APIResponse)
async def get_audit_logs(limit: int = 50, offset: int = 0):
    return success_response(data={
        "logs": AUDIT_DB[offset:offset+limit],
        "total": len(AUDIT_DB)
    })
