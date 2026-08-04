from pydantic import BaseModel, Field
from typing import List, Optional, Literal

class Dimension(BaseModel):
    name: str
    type: Literal["time", "categorical", "numerical"]
    table_alias: str
    column: str

class MetricGovernanceDef(BaseModel):
    name: str
    description: str
    formula: str # A custom format or valid SQL aggregate expression
    aggregation_type: Literal["sum", "count", "avg", "min", "max", "custom", "count_distinct"]
    data_source: str # e.g., 'orders', 'sales'
    allowed_dimensions: List[str]
    allowed_filters: List[str]
    allowed_time_grains: List[str]
    owner: str = "System"

# Predefined Governed Metrics
GOVERNED_METRICS = [
    MetricGovernanceDef(
        name="Revenue",
        description="Total revenue generated from completed orders.",
        formula="SUM(orders.total_amount)",
        aggregation_type="sum",
        data_source="orders",
        allowed_dimensions=["Time", "Product", "Customer", "Region", "Department"],
        allowed_filters=["status", "date_range"],
        allowed_time_grains=["Daily", "Weekly", "Monthly", "Quarterly", "Yearly", "YTD", "MTD"]
    ),
    MetricGovernanceDef(
        name="Profit",
        description="Net profit (Revenue - Expenses).",
        formula="SUM(orders.total_amount) - (SELECT SUM(amount) FROM expenses)", # Simplification for engine handling
        aggregation_type="custom",
        data_source="orders",
        allowed_dimensions=["Time", "Region", "Department"],
        allowed_filters=["date_range"],
        allowed_time_grains=["Daily", "Monthly", "Yearly"]
    ),
    MetricGovernanceDef(
        name="Margin",
        description="Profit Margin percentage.",
        formula="((SUM(orders.total_amount) - (SELECT SUM(amount) FROM expenses)) / NULLIF(SUM(orders.total_amount), 0)) * 100",
        aggregation_type="custom",
        data_source="orders",
        allowed_dimensions=["Time", "Region", "Department"],
        allowed_filters=["date_range"],
        allowed_time_grains=["Daily", "Monthly", "Yearly"]
    ),
    MetricGovernanceDef(
        name="Orders",
        description="Total number of orders placed.",
        formula="COUNT(orders.id)",
        aggregation_type="count",
        data_source="orders",
        allowed_dimensions=["Time", "Product", "Customer", "Region"],
        allowed_filters=["status", "date_range"],
        allowed_time_grains=["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"]
    ),
    MetricGovernanceDef(
        name="Average Order Value",
        description="Average revenue per order.",
        formula="AVG(orders.total_amount)",
        aggregation_type="avg",
        data_source="orders",
        allowed_dimensions=["Time", "Region", "Customer"],
        allowed_filters=["status", "date_range"],
        allowed_time_grains=["Daily", "Weekly", "Monthly", "Yearly"]
    ),
    MetricGovernanceDef(
        name="Customer Count",
        description="Total unique customers.",
        formula="COUNT(DISTINCT orders.customer_id)",
        aggregation_type="count_distinct",
        data_source="orders",
        allowed_dimensions=["Time", "Region"],
        allowed_filters=["date_range"],
        allowed_time_grains=["Daily", "Monthly", "Yearly"]
    ),
    MetricGovernanceDef(
        name="Shipping Cost",
        description="Total shipping costs incurred.",
        formula="SUM(expenses.amount) FILTER (WHERE expenses.category = 'Shipping')",
        aggregation_type="custom",
        data_source="expenses",
        allowed_dimensions=["Time", "Department"],
        allowed_filters=["date_range"],
        allowed_time_grains=["Daily", "Monthly", "Yearly"]
    )
]

# Note: The complete list of metrics will be inserted dynamically into the DB.

class SemanticEngine:
    @staticmethod
    def get_metric_definition(metric_name: str) -> Optional[MetricGovernanceDef]:
        for metric in GOVERNED_METRICS:
            if metric.name.lower() == metric_name.lower():
                return metric
        return None
    
    @staticmethod
    def get_all_metrics() -> List[MetricGovernanceDef]:
        return GOVERNED_METRICS
