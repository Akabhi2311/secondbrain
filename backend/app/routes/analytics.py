from fastapi import APIRouter, Depends
from sqlalchemy import func

from app.auth import get_current_user
from app.database import SessionLocal

from app.models.document import Document
from app.models.chunk import Chunk
from app.models.quiz import QuizResult

router = APIRouter()


@router.get("/daily-activity")
def daily_activity(
    user_id: int = Depends(get_current_user)
):

    db = SessionLocal()

    uploads = db.query(
        func.date(Document.created_at),
        func.count(Document.id)
    ).filter_by(
        user_id=user_id
    ).group_by(
        func.date(Document.created_at)
    ).all()

    chunks = db.query(
        func.date(Chunk.created_at),
        func.count(Chunk.id)
    ).filter_by(
        user_id=user_id
    ).group_by(
        func.date(Chunk.created_at)
    ).all()

    quizzes = db.query(
        func.date(QuizResult.created_at),
        func.count(QuizResult.id)
    ).filter_by(
        user_id=user_id
    ).group_by(
        func.date(QuizResult.created_at)
    ).all()

    db.close()

    result = []

    upload_map = {
        str(d): c for d, c in uploads
    }

    chunk_map = {
        str(d): c for d, c in chunks
    }

    quiz_map = {
        str(d): c for d, c in quizzes
    }

    all_dates = set(
        list(upload_map.keys()) +
        list(chunk_map.keys()) +
        list(quiz_map.keys())
    )

    for date in sorted(all_dates):

        result.append({
            "date": date,
            "uploads": upload_map.get(date, 0),
            "nodes": chunk_map.get(date, 0),
            "queries": quiz_map.get(date, 0)
        })

    return result