import pytest
from app.ai.prompts import SYSTEM_PROMPT, INTENT_EXTRACTION_PROMPT

def test_ai_prompts_contain_strict_lockdowns():
    """Validates that system prompts strictly prevent raw SQL generation."""
    assert "DO NOT write SQL" in SYSTEM_PROMPT or "NEVER write SQL" in SYSTEM_PROMPT, "System prompt must strictly forbid SQL generation"
    assert "hallucinate" in SYSTEM_PROMPT.lower() or "invent" in SYSTEM_PROMPT.lower(), "System prompt must forbid metric invention"

def test_intent_extraction_prompt_formats():
    """Validates JSON structure in extraction prompts."""
    assert "JSON" in INTENT_EXTRACTION_PROMPT
    assert "metrics" in INTENT_EXTRACTION_PROMPT
    assert "dimensions" in INTENT_EXTRACTION_PROMPT
