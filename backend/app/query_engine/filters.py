from typing import Dict, Any, Tuple
from datetime import datetime, timedelta
from app.core.config import settings

def build_filter_clause(filter_def: Dict[str, Any]) -> Tuple[str, Dict[str, Any]]:
    """
    Translates a frontend filter definition into a raw SQL clause and parameters.
    Expected filter_def format: {"field": "status", "operator": "equals", "value": "completed"}
    """
    field = filter_def.get("field")
    operator = filter_def.get("operator")
    value = filter_def.get("value")
    
    # Safe alias generation for parameters to avoid conflicts
    param_key = f"{field}_{operator}_{id(filter_def)}"
    
    if operator == "equals":
        return f"{field} = :{param_key}", {param_key: value}
    elif operator == "not_equals":
        return f"{field} != :{param_key}", {param_key: value}
    elif operator == "contains":
        is_postgres = "postgres" in settings.get_database_url
        op = "ILIKE" if is_postgres else "LIKE"
        return f"{field} {op} :{param_key}", {param_key: f"%{value}%"}
    elif operator == "greater_than":
        return f"{field} > :{param_key}", {param_key: value}
    elif operator == "less_than":
        return f"{field} < :{param_key}", {param_key: value}
    elif operator == "in":
        if not isinstance(value, list):
            raise ValueError("'in' operator requires a list of values")
        
        # Create multiple params for IN clause
        in_params = {}
        param_names = []
        for i, val in enumerate(value):
            p_name = f"{param_key}_{i}"
            in_params[p_name] = val
            param_names.append(f":{p_name}")
            
        return f"{field} IN ({', '.join(param_names)})", in_params
    elif operator == "between":
        if not isinstance(value, list) or len(value) != 2:
            raise ValueError("'between' operator requires a list of two values")
        
        p1, p2 = f"{param_key}_start", f"{param_key}_end"
        return f"{field} BETWEEN :{p1} AND :{p2}", {p1: value[0], p2: value[1]}
    
    raise ValueError(f"Unsupported filter operator: {operator}")
