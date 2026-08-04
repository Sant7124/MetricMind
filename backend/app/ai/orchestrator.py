import json
from typing import Dict, Any
from app.ai.provider import get_llm_provider
from app.ai.prompts import SYSTEM_PROMPT_INTENT_EXTRACTION, SYSTEM_PROMPT_INSIGHT_GENERATION
from app.ai.charts import ChartRecommendationEngine
from app.query_engine.generator import QueryGenerator
from app.query_engine.validator import QueryValidator
from app.warehouse.factory import get_warehouse_adapter

class AgentOrchestrator:
    def __init__(self):
        self.provider = get_llm_provider("gemini")
        self.warehouse = get_warehouse_adapter("postgres")
        
    async def process_chat(self, user_message: str, history: list = None) -> str:
        """
        The master pipeline: Natural Language -> Intent -> Semantic Layer -> Warehouse -> Insights -> Response
        """
        # 1. Intent & Entity Extraction
        intent_response = await self.provider.generate(SYSTEM_PROMPT_INTENT_EXTRACTION, user_message)
        
        try:
            # Clean markdown block if provider returns ```json
            clean_json = intent_response.replace("```json", "").replace("```", "").strip()
            parsed_intent = json.loads(clean_json)
        except json.JSONDecodeError:
            return "I'm sorry, I couldn't understand that request. Could you rephrase?"
            
        # 2. AI Safety / Semantic Validation
        if not parsed_intent.get("is_valid"):
            reason = parsed_intent.get("rejection_reason", "That metric is not governed in the Semantic Layer.")
            return f"I cannot answer that: {reason}"
            
        metrics = parsed_intent.get("metrics", [])
        dimensions = parsed_intent.get("dimensions", [])
        filters = parsed_intent.get("filters", [])
        time_grain = parsed_intent.get("time_grain", "Daily")
        
        if not metrics:
            return "I couldn't identify which business metric you want to analyze."
            
        # 3. Query Engine Execution (Completely bypassing LLM SQL generation)
        try:
            QueryValidator.validate(metrics, dimensions, filters)
            sql, params = QueryGenerator.generate_sql(metrics, dimensions, filters, time_grain)
            raw_data = await self.warehouse.execute_query(sql, params)
        except Exception as e:
            return f"Semantic Engine Error: {str(e)}"
            
        # 4. Chart Recommendation
        recommended_chart = ChartRecommendationEngine.recommend(
            parsed_intent.get("intent", ""), metrics, dimensions, raw_data
        )
        
        # 5. Insight Generation
        # Feed the raw data back to the LLM for executive summary
        insight_prompt = f"""
        User Question: {user_message}
        Metrics Used: {', '.join(metrics)}
        Dimensions Used: {', '.join(dimensions)}
        Raw Data (JSON): {json.dumps(raw_data[:50])} # Cap at 50 to avoid token limits
        Recommended Chart Type: {recommended_chart}
        """
        
        final_response = await self.provider.generate(SYSTEM_PROMPT_INSIGHT_GENERATION, insight_prompt)
        
        return final_response

orchestrator = AgentOrchestrator()
