from fastapi import APIRouter
from app.utils.responses import success_response, error_response, APIResponse

router = APIRouter()

@router.get("/", response_model=APIResponse)
async def list_reports():
    return success_response(data=[], message="Reports retrieved successfully")

@router.post("/generate", response_model=APIResponse)
async def generate_report():
    # TODO: Implement PDF/Excel generation using Report Engine
    return success_response(message="Report generation queued")
