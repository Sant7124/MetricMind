from typing import Dict, Any, List

class ChartRecommendationEngine:
    @staticmethod
    def recommend(intent: str, metrics: List[str], dimensions: List[str], data: List[Dict[str, Any]]) -> str:
        """
        Rule-based engine to recommend the best chart type based on the extracted entities.
        """
        if not data:
            return "none"
            
        if "Time" in dimensions:
            if len(metrics) > 1:
                return "area" # Good for comparing metrics over time (e.g. Revenue vs Profit)
            return "line"
            
        if "Region" in dimensions or "Product" in dimensions or "Department" in dimensions:
            if len(dimensions) == 1 and len(metrics) == 1:
                # Check for composition/market share
                if intent == "Market Share" or len(data) <= 5:
                    return "pie"
            return "bar"
            
        if len(dimensions) == 0 and len(metrics) > 0:
            return "cards" # KPIs only
            
        return "table"
