````markdown
# 🧠 SecondBrain — AI Powered Personal Knowledge Assistant

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-ffca28?style=for-the-badge&logo=firebase)
![Python](https://img.shields.io/badge/Python-AI-blue?style=for-the-badge&logo=python)
![RAG](https://img.shields.io/badge/RAG-Powered-purple?style=for-the-badge)
![FAISS](https://img.shields.io/badge/FAISS-VectorDB-red?style=for-the-badge)

### 🚀 Your Personal AI Second Brain

Upload PDFs → Chat with Documents → Generate Quizzes → Track Learning → Build an AI Knowledge Space

</div>

---

# ✨ Overview

SecondBrain is a modern AI-powered knowledge management platform that allows users to:

- 📄 Upload and process PDFs
- 💬 Chat with documents using RAG (Retrieval-Augmented Generation)
- 🧠 Generate AI quizzes
- 📊 Visualize learning analytics
- 🎯 Track weak topics and accuracy
- 👤 Build a personalized AI learning space

The project combines:
- Semantic Search
- Vector Databases
- Local LLMs
- AI Analytics
- Authentication Systems
- Modern Frontend Architecture

to create a complete AI productivity ecosystem.

---

# 🏗️ System Architecture

```text
                ┌─────────────────┐
                │   Upload PDF    │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Text Extraction │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │   Chunking      │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Embedding Model │
                │ MiniLM-L6-v2    │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  FAISS Vector   │
                │    Database     │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Semantic Search │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │  Ollama LLM     │
                │   (Phi Model)   │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ AI Response     │
                └─────────────────┘
````

---

# 🔥 Core Features

# 🔐 Authentication System

### ✔ Google Authentication

* Firebase Google Sign-In
* Secure OAuth login
* First-time onboarding flow

### ✔ Password-Based Login

* JWT Authentication
* Protected Routes
* Persistent Sessions

### ✔ Password Recovery

* Forgot Password Flow
* Google Verification

---

# 📄 Smart PDF Upload System

Users can:

* Upload PDFs
* Extract document text
* Store semantic embeddings
* Generate summaries automatically

### Processing Pipeline

```text
PDF → Text Extraction → Chunking → Embeddings → FAISS Storage
```

---

# 💬 Chat with PDFs (RAG)

The chat system uses:

* Semantic Retrieval
* Vector Similarity Search
* Context-Aware Prompting

### Features

* Multi-document querying
* Document-specific chat
* Hallucination reduction
* Context grounding

---

# 🧠 AI Quiz Generation

Generate quizzes directly from uploaded documents.

### Includes

* Topic-based quiz generation
* Accuracy tracking
* Weak topic analysis
* Learning streaks

---

# 📊 AI Analytics Dashboard

Beautiful modern analytics system with:

* Learning streaks
* Retrieval accuracy
* Topic coverage
* Daily activity graphs
* Weak topic detection

---

# 👤 My Space

Personal AI identity system.

Users can:

* Create profile
* Add profession
* Add college
* Add interests
* Add bio

This enables future personalized AI learning experiences.

---

# 🛠️ Tech Stack

# Frontend

| Technology   | Purpose            |
| ------------ | ------------------ |
| Next.js 14   | Frontend Framework |
| TypeScript   | Type Safety        |
| Tailwind CSS | Styling            |
| Lucide Icons | UI Icons           |
| Firebase     | Authentication     |

---

# Backend

| Technology | Purpose        |
| ---------- | -------------- |
| FastAPI    | Backend API    |
| SQLAlchemy | ORM            |
| SQLite     | Database       |
| JWT        | Authentication |
| Pydantic   | Validation     |

---

# AI / ML Stack

| Technology            | Purpose         |
| --------------------- | --------------- |
| Ollama                | Local LLM       |
| Phi Model             | Text Generation |
| FAISS                 | Vector Search   |
| Sentence Transformers | Embeddings      |
| MiniLM-L6-v2          | Embedding Model |

---

# 📂 Project Structure

```bash
SecondBrain/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── auth.py
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── firebase.ts
│   │
│   ├── package.json
│   └── .env.local
│
├── README.md
└── .gitignore
```

---

# 🚀 Complete Setup Guide

# 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/SecondBrain.git

cd SecondBrain
```

---

# 2️⃣ Backend Setup

## Create Virtual Environment

```bash
cd backend

python -m venv venv
```

---

## Activate Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

---

## Install Dependencies

```bash
pip install -r requirements.txt
```

---

## Create `.env`

Inside `backend/.env`

```env
SECRET_KEY=SECOND_BRAIN_SECRET_KEY
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```bash
http://localhost:8000
```

Swagger API Docs:

```bash
http://localhost:8000/docs
```

---

# 3️⃣ Frontend Setup

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

# Create `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
```

---

## Run Frontend

```bash
npm run dev
```

Frontend:

```bash
http://localhost:3000
```

---

# 🔥 Firebase Setup

# Step 1

Go to:

[https://console.firebase.google.com](https://console.firebase.google.com)

---

# Step 2

Create a Firebase Project.

---

# Step 3

Enable:

```text
Authentication → Google Provider
```

---

# Step 4

Copy Firebase config.

---

# Step 5

Paste inside:

```bash
frontend/.env.local
```

---

# 🤖 Ollama Setup

# Install Ollama

👉 [https://ollama.com](https://ollama.com)

---

# Pull Phi Model

```bash
ollama pull phi
```

---

# Run Ollama

```bash
ollama run phi
```

---

# 🧠 Understanding the RAG Pipeline

# What is RAG?

RAG (Retrieval-Augmented Generation) combines:

* Retrieval systems
* LLM generation

to generate grounded responses from uploaded documents.

---

# Query Flow

```text
User Question
      ↓
Question Embedding
      ↓
FAISS Semantic Search
      ↓
Top Relevant Chunks
      ↓
LLM Prompt Injection
      ↓
AI Generated Response
```

---

# 🔒 Security Features

* Password Hashing using bcrypt
* JWT Authentication
* Firebase OAuth Verification
* Protected Routes
* Secure Session Handling

---

# 📈 Future Improvements

* PostgreSQL Migration
* ChromaDB Integration
* Cloud Deployment
* Voice Assistant
* AI Memory System
* Smart Flashcards
* Resume Parsing
* Adaptive Learning AI
* Multi-modal AI
* Persistent Vector Storage

---

# 📸 Screenshots

## Dashboard

Modern AI analytics dashboard with:

* Learning streaks
* Topic coverage
* Activity graphs

---

## Chat Interface

Document-grounded conversational AI.

---

## Upload System

PDF ingestion with semantic processing.

---

## My Space

Personalized AI learning profile.

---

# 🧑‍💻 Interview Concepts Covered

This project demonstrates understanding of:

* Retrieval-Augmented Generation (RAG)
* Semantic Search
* Vector Databases
* Embeddings
* JWT Authentication
* Firebase OAuth
* Full Stack Architecture
* FastAPI APIs
* AI System Design
* Modern Frontend Engineering

---

# ⚡ Performance Optimizations

* Chunk-based retrieval
* Lightweight embedding model
* Local LLM inference
* Semantic vector search
* Modular frontend architecture

---

# 🧠 Key Learnings

This project helped explore:

* AI application architecture
* Production-ready authentication
* Retrieval systems
* Semantic similarity
* Modern SaaS frontend systems
* AI-powered user experiences

---

# 👨‍💻 Author

## Abhishek Singh

AI Enthusiast • Full Stack Developer • Problem Solver

---

# ⭐ Support

If you liked this project:

⭐ Star the repository
🍴 Fork the project
🧠 Build your own SecondBrain

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

# 🚀 Build Your AI Second Brain

Made with ❤️ using AI + Full Stack Engineering

</div>
```
