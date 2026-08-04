from fastapi import APIRouter, Response
import io
import csv

router = APIRouter()

@router.get("/csv")
async def export_csv(report_type: str = "general"):
    """
    Export analytics data as CSV.
    In a real environment, this streams data from the Data Warehouse.
    """
    output = io.StringIO()
    writer = csv.writer(output)
    
    from app.warehouse.factory import get_warehouse_adapter
    adapter = get_warehouse_adapter("postgres")
    
    try:
        # Dynamic query based on report type
        if report_type.lower() == "customer churn analysis":
            sql = "SELECT name, email, company_name FROM customers"
        elif report_type.lower() == "q3 regional sales":
            sql = "SELECT id, order_date, total_amount, status FROM orders WHERE order_date >= '2025-07-01'"
        else:
            sql = "SELECT * FROM orders LIMIT 100"
            
        results = await adapter.execute_query(sql)
        
        if results:
            writer.writerow(results[0].keys()) # Header
            for row in results:
                writer.writerow(row.values())
        else:
            writer.writerow(["No Data Found"])
            
    except Exception as e:
        writer.writerow(["Error generating report:", str(e)])
        
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=export_{report_type.replace(' ', '_')}.csv"}
    )
