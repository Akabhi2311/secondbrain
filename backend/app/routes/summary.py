from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import requests

from app.database import get_db
from app.auth import get_current_user
from app.models.document import Document

router = APIRouter()


@router.get("/summary/{doc_id}")
def get_summary(
    doc_id: int,
    user_id: int = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    document = (
        db.query(Document)
        .filter(
            Document.id == doc_id,
            Document.user_id == user_id
        )
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    text = document.content[:12000]

    prompt = f"""
Generate a detailed summary of the following document.

RULES:
- Summary must be 200-300 words
- Explain key concepts clearly
- Use simple readable language
- Include important technical ideas
- Do NOT make up information
- Stay strictly within the document

DOCUMENT:
{text}

SUMMARY:
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

    result = response.json()

    return {
        "summary": result.get("response", "")
    }