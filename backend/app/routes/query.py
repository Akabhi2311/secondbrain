from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel

from app.services.vector_store import search

import requests

from app.auth import get_current_user

router = APIRouter()


class QueryRequest(BaseModel):

    question: str

    document_id: int | None = None


@router.post("/query")
def query_rag(
    req: QueryRequest,
    user_id: int = Depends(get_current_user)
):

    from app.services import state

    state.questions_answered += 1

    try:
        print("DOCUMENT ID:", req.document_id)
        # ✅ SEARCH WITH FILE FILTER
        context_chunks = search(
            user_id=user_id,
            query=req.question,
            document_id=req.document_id
        )

        print("📊 CHUNKS FOUND:", len(context_chunks))

        if not context_chunks:

            return {
                "response":
                "I don't know based on the provided document."
            }

        filtered_chunks = []

        for chunk in context_chunks:

            if chunk and len(chunk.strip()) > 40:
                filtered_chunks.append(chunk)

        if len(filtered_chunks) == 0:

            return {
                "response":
                "I don't know based on the provided document."
            }

        filtered_chunks = filtered_chunks[:3]

        context = "\n\n".join(filtered_chunks)

        prompt = f"""
You are a STRICT document-based AI assistant.

You MUST answer ONLY using the provided context.

STRICT RULES:
- If answer is NOT in context:
  say EXACTLY:
  "I don't know based on the provided document."

- DO NOT use outside knowledge
- DO NOT hallucinate
- Keep answers concise

================ CONTEXT ================
{context}
=========================================

QUESTION:
{req.question}

ANSWER:
"""

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi",
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.0,
                    "top_p": 0.1,
                    "num_predict": 200
                }
            }
        )

        if response.status_code != 200:

            raise HTTPException(
                status_code=500,
                detail="LLM request failed"
            )

        result = response.json()

        answer = result.get(
            "response",
            ""
        ).strip()

        if len(answer.strip()) == 0:

            return {
                "response":
                "I don't know based on the provided document."
            }

        return {
            "response": answer
        }

    except Exception as e:

        print("❌ QUERY ERROR:", str(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )