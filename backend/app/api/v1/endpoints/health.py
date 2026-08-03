from fastapi import APIRouter
from app.utils.responses import success_response, APIResponse

router = APIRouter()

@router.get("/", response_model=APIResponse)
async def health_check():
    return success_response(message="API is healthy", data={"service": "MetricMind", "status": "up"})
