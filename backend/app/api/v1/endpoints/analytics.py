from fastapi import APIRouter, Depends, HTTPException, Body
from typing import List, Dict, Any, Optional
import time
import hashlib
import json

from app.core.config import settings

from app.utils.responses import success_response, error_response, APIResponse
from app.semantic.engine import SemanticEngine
from app.query_engine.validator import QueryValidator
from app.query_engine.generator import QueryGenerator
from app.warehouse.factory import get_warehouse_adapter
from app.cache.service import cache_service

router = APIRouter()

@router.get("/metrics", response_model=APIResponse)
async def get_metrics():
    metrics = SemanticEngine.get_all_metrics()
    return success_response(data=[m.model_dump() for m in metrics], message="Governed metrics retrieved successfully.")

@router.get("/dimensions", response_model=APIResponse)
async def get_dimensions():
    # Simplified dimensions dictionary for Phase 2
    dimensions = ["Time", "Product", "Customer", "Region", "Department"]
    return success_response(data=dimensions)

@router.post("/query-preview", response_model=APIResponse)
async def query_preview(
    metrics: List[str] = Body(...),
    dimensions: List[str] = Body(default=[]),
    filters: List[Dict[str, Any]] = Body(default=[]),
    time_grain: str = Body(default="Daily")
):
    try:
        # Validate
        QueryValidator.validate(metrics, dimensions, filters)
        
        # Generate SQL safely
        sql, params = QueryGenerator.generate_sql(metrics, dimensions, filters, time_grain)
        
        return success_response(data={
            "generated_sql": sql,
            "parameters": params,
            "used_metrics": metrics,
            "used_dimensions": dimensions,
            "estimated_rows": "Unknown (EXPLAIN pending)"
        })
    except Exception as e:
        return error_response(str(e))

@router.post("/query", response_model=APIResponse)
async def execute_query(
    metrics: List[str] = Body(...),
    dimensions: List[str] = Body(default=[]),
    filters: List[Dict[str, Any]] = Body(default=[]),
    time_grain: str = Body(default="Daily")
):
    start_time = time.time()
    
    # Cache Check
    query_signature = json.dumps({"m": metrics, "d": dimensions, "f": filters, "t": time_grain}, sort_keys=True)
    cache_key = f"query:{hashlib.md5(query_signature.encode()).hexdigest()}"
    
    cached_result = await cache_service.get(cache_key)
    if cached_result:
        return success_response(data=cached_result, message="Query executed successfully (Cached).")
        
    try:
        # Validate & Generate
        QueryValidator.validate(metrics, dimensions, filters)
        sql, params = QueryGenerator.generate_sql(metrics, dimensions, filters, time_grain)
        
        # Execute
        adapter = get_warehouse_adapter("postgres")
        results = await adapter.execute_query(sql, params)
        
        execution_time_ms = round((time.time() - start_time) * 1000, 2)
        
        response_data = {
            "results": results,
            "execution_time_ms": execution_time_ms,
            "rows_returned": len(results)
        }
        
        # Cache the result
        await cache_service.set(cache_key, response_data, ttl_seconds=300)
        
        # TODO: Log to AuditLog asynchronously
        
        return success_response(data=response_data, message="Query executed successfully.")
    except Exception as e:
        return error_response(f"Query Execution Error: {str(e)}")

# Dashboard Specific Aggregation Endpoints
@router.get("/dashboard/kpis", response_model=APIResponse)
async def get_dashboard_kpis():
    # Helper endpoint for frontend dashboards to quickly fetch top-level metrics
    try:
        adapter = get_warehouse_adapter("postgres")
        # For SQLite compat we just sum/count
        revenue_res = await adapter.execute_query("SELECT SUM(total_amount) as revenue FROM orders WHERE status = 'completed'")
        orders_res = await adapter.execute_query("SELECT COUNT(id) as count FROM orders WHERE status = 'completed'")
        customers_res = await adapter.execute_query("SELECT COUNT(DISTINCT customer_id) as count FROM orders WHERE status = 'completed'")
        
        data = {
            "total_revenue": revenue_res[0]['revenue'] if revenue_res and revenue_res[0]['revenue'] else 0,
            "total_orders": orders_res[0]['count'] if orders_res else 0,
            "total_customers": customers_res[0]['count'] if customers_res else 0
        }
        return success_response(data=data)
    except Exception as e:
        return error_response(str(e))

@router.get("/dashboard/charts", response_model=APIResponse)
async def get_dashboard_charts():
    try:
        adapter = get_warehouse_adapter("postgres")
        is_postgres = "postgres" in settings.get_database_url
        
        month_func = "TO_CHAR(order_date, 'YYYY-MM')" if is_postgres else "strftime('%Y-%m', order_date)"
        
        query = f"""
        SELECT 
            {month_func} as month, 
            SUM(total_amount) as revenue,
            SUM(total_amount) * 0.7 as gross 
        FROM orders 
        WHERE status = 'completed'
        GROUP BY {month_func}
        ORDER BY month DESC
        LIMIT 12
        """
        results = await adapter.execute_query(query)
        
        # Format for recharts: reverse to be chronological
        results.reverse()
        formatted_data = []
        for r in results:
            if not r['month']: continue
            # Convert '2025-08' to 'Aug 25' or just '2025-08'
            formatted_data.append({
                "month": r['month'],
                "revenue": float(r['revenue']),
                "gross": float(r['gross'])
            })
            
        return success_response(data=formatted_data)
    except Exception as e:
        return error_response(str(e))

