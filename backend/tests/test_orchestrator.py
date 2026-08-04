import pytest
from app.ai.prompts import SYSTEM_PROMPT_INTENT_EXTRACTION, SYSTEM_PROMPT_INSIGHT_GENERATION

def test_ai_prompts_contain_strict_lockdowns():
    """Validates that system prompts strictly prevent raw SQL generation."""
    assert "DO NOT generate SQL" in SYSTEM_PROMPT_INTENT_EXTRACTION or "NEVER write SQL" in SYSTEM_PROMPT_INTENT_EXTRACTION, "System prompt must strictly forbid SQL generation"
    assert "hallucinate" in SYSTEM_PROMPT_INSIGHT_GENERATION.lower() or "invent" in SYSTEM_PROMPT_INSIGHT_GENERATION.lower(), "System prompt must forbid metric invention"

def test_intent_extraction_prompt_formats():
    """Validates JSON structure in extraction prompts."""
    assert "JSON" in SYSTEM_PROMPT_INTENT_EXTRACTION
    assert "metrics" in SYSTEM_PROMPT_INTENT_EXTRACTION
    assert "dimensions" in SYSTEM_PROMPT_INTENT_EXTRACTION
