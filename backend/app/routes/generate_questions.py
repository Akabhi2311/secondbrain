from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import json
import re

router = APIRouter()


class QuizRequest(BaseModel):
    topic: str
    num_questions: int


# ✅ VALIDATION FUNCTION
def validate_questions(data):
    valid_questions = []

    for q in data:
        if (
            isinstance(q, dict)
            and "question" in q
            and "options" in q
            and "answer" in q
            and isinstance(q["options"], list)
            and len(q["options"]) == 4
            and isinstance(q["answer"], str)
            and q["answer"] in q["options"]
        ):
            valid_questions.append(q)

    return valid_questions


# ✅ REMOVE DUPLICATES
def remove_duplicates(data):
    unique = []
    seen = set()

    for q in data:
        question_text = q.get("question", "").strip()

        if question_text and question_text not in seen:
            unique.append(q)
            seen.add(question_text)

    return unique


# ✅ CLEAN + EXTRACT JSON
def extract_json(text):
    # remove markdown
    text = text.replace("```json", "").replace("```", "").strip()

    # remove trailing garbage like """
    text = re.sub(r'"""$', '', text).strip()

    # extract JSON array
    match = re.search(r"\[.*\]", text, re.DOTALL)

    if not match:
        raise ValueError("❌ No valid JSON found in LLM output")

    return match.group(0)


@router.post("/generate-questions")
def generate_questions(req: QuizRequest):
    try:
        prompt = f"""
Generate EXACTLY {req.num_questions} multiple choice questions on the topic: "{req.topic}"

STRICT RULES:
- Output MUST be valid JSON
- NO markdown, NO code blocks
- EXACTLY 4 options per question
- Each option must be meaningful and distinct
- The answer MUST be EXACTLY one of the options (copy-paste)
- DO NOT repeat questions
- DO NOT include anything outside JSON

FORMAT:
[
  {{
    "question": "string",
    "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
    "answer": "B. exact matching option text"
  }}
]

CRITICAL:
- Answer MUST MATCH one option EXACTLY
- Do NOT return indices
- Ensure answers are factually correct
- Return EXACTLY {req.num_questions} questions
"""

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi",
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.2
                }
            }
        )

        result = response.json().get("response", "").strip()

        print("🧠 RAW LLM OUTPUT:", result)

        # 🔥 CLEAN + EXTRACT JSON
        clean_json = extract_json(result)

        # 🔥 PARSE JSON
        data = json.loads(clean_json)

        # 🔥 REMOVE DUPLICATES
        data = remove_duplicates(data)

        # 🔥 VALIDATE QUESTIONS
        data = validate_questions(data)

        # 🔥 ENSURE COUNT
        if len(data) < req.num_questions:
            raise ValueError("❌ Not enough valid questions generated")

        return {"questions": data[:req.num_questions]}

    except Exception as e:
        print("❌ QUIZ ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Failed to generate quiz")