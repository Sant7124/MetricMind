from typing import List, Dict, Any, Tuple
from app.semantic.engine import SemanticEngine
from .filters import build_filter_clause
from app.core.config import settings

class QueryGenerator:
    """
    Enterprise SQL Generator based on strictly governed Semantic Layer metrics.
    No user string concatenation - utilizes parameterized SQL for absolute safety.
    """
    
    @staticmethod
    def generate_sql(metric_names: List[str], dimensions: List[str], filters: List[Dict[str, Any]] = None, time_grain: str = None) -> Tuple[str, Dict[str, Any]]:
        # 1. Fetch governed formulas
        select_clauses = []
        group_by_clauses = []
        joins = []
        base_table = None
        
        for name in metric_names:
            metric_def = SemanticEngine.get_metric_definition(name)
            if not metric_def:
                raise ValueError(f"Unknown metric requested: {name}")
            
            # Simple alias assignment
            safe_alias = name.lower().replace(" ", "_")
            select_clauses.append(f"{metric_def.formula} AS {safe_alias}")
            
            # Determine base table (Simplistic routing for this phase, assuming single fact table or predefined view)
            if not base_table:
                base_table = metric_def.data_source
        
        # 2. Dimensions & Time Grain
        if dimensions:
            for dim in dimensions:
                safe_dim = dim.lower().replace(" ", "_")
                # Very basic dimension mapping for scaffold, real implementation would use a dimension registry
                if safe_dim == "time":
                    date_col = "order_date" if base_table == "orders" else "date"
                    is_postgres = "postgres" in settings.get_database_url
                    
                    if time_grain == "Monthly":
                        if is_postgres:
                            func = f"TO_CHAR({base_table}.{date_col}, 'YYYY-MM')"
                        else:
                            func = f"STRFTIME('%Y-%m', {base_table}.{date_col})"
                        select_clauses.append(f"{func} AS time")
                        group_by_clauses.append(f"{func}")
                    else: # Default Daily
                        if is_postgres:
                            # Postgres cast to date
                            func = f"DATE({base_table}.{date_col})"
                        else:
                            func = f"DATE({base_table}.{date_col})"
                        select_clauses.append(f"{func} AS time")
                        group_by_clauses.append(f"{func}")
                elif safe_dim == "region":
                    select_clauses.append("regions.name AS region")
                    group_by_clauses.append("regions.name")
                    if base_table != "regions":
                        joins.append(f"LEFT JOIN regions ON {base_table}.region_id = regions.id")
        
        # 3. Filters
        where_clauses = []
        parameters = {}
        if filters:
            for f in filters:
                clause, params = build_filter_clause(f)
                where_clauses.append(clause)
                parameters.update(params)
                
        # 4. Construct Final SQL
        sql = f"SELECT {', '.join(select_clauses)} FROM {base_table}"
        
        if joins:
            sql += " " + " ".join(joins)
            
        if where_clauses:
            sql += f" WHERE {' AND '.join(where_clauses)}"
            
        if group_by_clauses:
            sql += f" GROUP BY {', '.join(group_by_clauses)}"
            
        return sql, parameters
