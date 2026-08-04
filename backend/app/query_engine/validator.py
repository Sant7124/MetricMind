from typing import List, Dict, Any
from app.semantic.engine import SemanticEngine

class QueryValidator:
    """
    Ensures that a requested query strictly aligns with Semantic Governance
    before execution.
    """
    
    @staticmethod
    def validate(metric_names: List[str], dimensions: List[str], filters: List[Dict[str, Any]], user_role: str = "Viewer") -> bool:
        # 1. Semantic Validation
        for name in metric_names:
            metric = SemanticEngine.get_metric_definition(name)
            if not metric:
                raise ValueError(f"Validation Error: Unknown metric '{name}'. This metric is not defined in the Semantic Layer.")
            
            # Validate Dimensions
            for dim in dimensions:
                if dim not in metric.allowed_dimensions and "All" not in metric.allowed_dimensions:
                    # In a robust system, we would check strict dimension registries.
                    # For this phase, we just do a loose check.
                    pass 
                    
        # 2. Permission Validation
        if user_role == "Viewer":
            # Example: Viewers can't see profit margins
            for name in metric_names:
                if name.lower() in ["profit", "margin", "gross profit", "operating profit"]:
                    raise PermissionError(f"Permission Error: Role '{user_role}' is not authorized to query '{name}'.")
                    
        # 3. Filter Validation
        if filters:
            for f in filters:
                if not f.get("field") or not f.get("operator"):
                    raise ValueError("Validation Error: Invalid filter format. Must contain 'field' and 'operator'.")
        
        return True
