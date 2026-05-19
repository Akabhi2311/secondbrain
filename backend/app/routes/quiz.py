from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.auth import get_current_user
from app.services.quiz_service import save_quiz_results

router = APIRouter()


class SubmitQuizRequest(BaseModel):

    topic: str

    questions: list

    user_answers: list


@router.post("/submit-quiz")
def submit_quiz(
    req: SubmitQuizRequest,
    user_id: int = Depends(get_current_user)
):

    correct_count = 0

    for i, question in enumerate(req.questions):

        correct_answer = question["answer"]

        selected_answer = req.user_answers[i]

        is_correct = (
            selected_answer == correct_answer
        )

        if is_correct:
            correct_count += 1

    accuracy = (
        correct_count / len(req.questions)
    ) * 100

    save_quiz_results(
        user_id=user_id,
        topic=req.topic,
        questions=req.questions,
        user_answers=req.user_answers
    )

    return {
        "message": "Quiz saved successfully",
        "accuracy": round(accuracy, 1),
        "correct_answers": correct_count,
        "total_questions": len(req.questions)
    }