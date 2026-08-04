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
    
    # Mock data for demonstration
    writer.writerow(["Date", "Metric", "Value", "Region"])
    writer.writerow(["2026-08-01", "Revenue", "45000", "North America"])
    writer.writerow(["2026-08-02", "Revenue", "52000", "Europe"])
    
    return Response(
        content=output.getvalue(),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename=export_{report_type}.csv"}
    )
