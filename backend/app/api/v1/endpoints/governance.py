from fastapi import APIRouter
from typing import List, Dict, Any
from app.utils.responses import success_response, APIResponse

router = APIRouter()

# In-memory store for AI queries to power the Query Inspector (Phase 4)
# In production, this would be queried from the AuditLog database table.
_query_inspector_logs: List[Dict[str, Any]] = []

def log_query_inspection(query_data: Dict[str, Any]):
    """Called by the Orchestrator to securely log generated SQL and performance."""
    _query_inspector_logs.insert(0, query_data)
    if len(_query_inspector_logs) > 100:
        _query_inspector_logs.pop()

@router.get("/queries", response_model=APIResponse)
async def get_governance_queries():
    """Returns recent AI/Semantic queries for the Query Inspector."""
    return success_response(data=_query_inspector_logs)
