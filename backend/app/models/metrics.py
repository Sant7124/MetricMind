from sqlalchemy import Column, String, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from .base_model import BaseModel, GUID

class MetricDefinition(BaseModel):
    __tablename__ = "metric_definitions"

    name = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(Text)
    sql_query = Column(Text, nullable=False) # Template or actual SQL
    owner_id = Column(GUID(), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    
    metrics = relationship("Metric", back_populates="definition")


class Metric(BaseModel):
    __tablename__ = "metrics"

    definition_id = Column(GUID(), ForeignKey("metric_definitions.id", ondelete="CASCADE"), nullable=False)
    value_data = Column(JSON, nullable=False) # Store calculated values/dimensions
    time_period = Column(String(50)) # e.g., '2023-Q1', '2023-01'

    definition = relationship("MetricDefinition", back_populates="metrics")
