import pytest
from app.semantic.engine import SemanticEngine
from app.query_engine.validator import QueryValidator
from fastapi import HTTPException

def test_semantic_engine_loads_metrics():
    metrics = SemanticEngine.get_all_metrics()
    assert len(metrics) > 0, "Semantic Engine should load predefined governed metrics"
    
def test_query_validator_rejects_hallucinated_metrics():
    with pytest.raises(HTTPException) as exc_info:
        QueryValidator.validate(["Fake_Metric"], [], [])
    
    assert exc_info.value.status_code == 400
    assert "Invalid metric 'Fake_Metric'" in str(exc_info.value.detail)

def test_query_validator_accepts_valid_metrics():
    # Should not raise exception
    QueryValidator.validate(["Revenue"], ["Region"], [])
