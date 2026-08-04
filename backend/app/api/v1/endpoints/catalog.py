from fastapi import APIRouter
from app.utils.responses import success_response, APIResponse
from app.semantic.engine import SemanticEngine

router = APIRouter()

@router.get("/metrics", response_model=APIResponse)
async def get_catalog_metrics():
    """Returns all governed metrics for the Data Catalog."""
    metrics = SemanticEngine.get_all_metrics()
    
    # Enhance with business glossary metadata for the catalog
    catalog_data = []
    for m in metrics:
        dump = m.model_dump()
        dump["business_owner"] = "Finance Team" if "Revenue" in m.name or "Profit" in m.name else "Operations Team"
        dump["last_updated"] = "2026-08-01T00:00:00Z"
        dump["status"] = "Certified"
        catalog_data.append(dump)
        
    return success_response(data=catalog_data)

@router.get("/dimensions", response_model=APIResponse)
async def get_catalog_dimensions():
    """Returns business dimensions."""
    dimensions = [
        {"name": "Time", "type": "Date", "description": "Standard calendar hierarchy (Day, Week, Month, Quarter, Year)."},
        {"name": "Region", "type": "Categorical", "description": "Geographical sales regions."},
        {"name": "Product", "type": "Categorical", "description": "SKU and Product Category hierarchy."},
        {"name": "Customer", "type": "Categorical", "description": "Individual purchasing entities."}
    ]
    return success_response(data=dimensions)
