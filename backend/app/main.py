from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.generate_questions import router as question_router
from app.routes import upload, query
from app.routes.files import router as files_router
from app.routes.stats import router as stats_router
app = FastAPI()
from app.database import engine, Base
from app.models import user, document, chunk, quiz

Base.metadata.create_all(bind=engine)
from app.routes import auth
from app.routes import quiz
app.include_router(quiz.router)
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
from app.routes import insights
app.include_router(insights.router)
from app.routes import recommendations
app.include_router(recommendations.router)

from app.routes.summary import router as summary_router
app.include_router(summary_router)
from app.routes.delete_document import router as delete_router
app.include_router(delete_router)

from app.routes.analytics import router as analytics_router

app.include_router(analytics_router)
from app.routes.topic_coverage import router as topic_router

app.include_router(topic_router)
from app.routes.activity import router as activity_router
app.include_router(activity_router)
from app.routes.recent_activity import router as recent_activity_router
app.include_router(recent_activity_router)
from app.routes.google_signup import router as google_signup_router
from app.routes.create_password import router as create_password_router
app.include_router(google_signup_router)
app.include_router(create_password_router)
from app.routes.reset_password import router as reset_password_router
app.include_router(reset_password_router)
from app.routes import profile
app.include_router(profile.router)
# ✅ CORS (IMPORTANT for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # later restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Routes
app.include_router(upload.router)
app.include_router(query.router)
app.include_router(files_router)
app.include_router(stats_router)
app.include_router(question_router)