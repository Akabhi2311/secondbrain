'use client';

import { useEffect, useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import AppLayout from '@/components/AppLayout';

import {
  Brain,
  FileText,
  CheckCircle2,
  XCircle,
  Trophy,
  Loader2,
} from 'lucide-react';

type Question = {
  question: string;
  options: string[];
  answer: number | string;
};

export default function QuizPage() {

  const [topic, setTopic] =
    useState('');

  const [count, setCount] =
    useState(5);

  const [documents, setDocuments] =
    useState<any[]>([]);

  const [selectedDoc, setSelectedDoc] =
    useState<number | null>(null);

  const [userAnswers, setUserAnswers] =
    useState<any[]>([]);

  const [questions, setQuestions] =
    useState<Question[]>([]);

  const [current, setCurrent] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [selected, setSelected] =
    useState<number | null>(null);

  const [finished, setFinished] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  // LOAD DOCUMENTS
  useEffect(() => {

    const fetchDocs = async () => {

      const token =
        localStorage.getItem('token');

      const res = await fetch(
        'http://localhost:8000/files',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setDocuments(data.files || data || []);
    };

    fetchDocs();

  }, []);

  // LOAD QUIZ
  const loadQuiz = async () => {

    if (!topic) {
      alert('Enter topic');
      return;
    }

    const token =
      localStorage.getItem('token');

    setLoading(true);

    try {

      const res = await fetch(
        'http://localhost:8000/generate-questions',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            topic,
            num_questions: count,
            document_id: selectedDoc,
          }),
        }
      );

      const data = await res.json();

      if (
        !data.questions ||
        data.questions.length === 0
      ) {
        alert('Failed to generate quiz');
        setLoading(false);
        return;
      }

      setQuestions(data.questions);

      setCurrent(0);

      setScore(0);

      setSelected(null);

      setFinished(false);

      setUserAnswers([]);

    } catch (err) {

      console.error(err);

      alert('Quiz generation failed');
    }

    setLoading(false);
  };

  // ANSWER
  const handleAnswer = (
    index: number
  ) => {

    if (selected !== null) return;

    setSelected(index);

    const newAnswers = [...userAnswers];

    newAnswers[current] =
      questions[current].options[index];

    setUserAnswers(newAnswers);

    const currentQ =
      questions[current];

    let isCorrect = false;

    if (
      typeof currentQ.answer === 'number'
    ) {

      isCorrect =
        index === currentQ.answer;

    } else {

      isCorrect =
        currentQ.options[index] ===
        currentQ.answer;
    }

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  // SUBMIT QUIZ
  const submitQuiz = async () => {

    const token =
      localStorage.getItem('token');

    await fetch(
      'http://localhost:8000/submit-quiz',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          topic,
          questions,
          user_answers: userAnswers,
        }),
      }
    );
  };

  // NEXT
  const nextQuestion = async () => {

    setSelected(null);

    if (
      current + 1 <
      questions.length
    ) {

      setCurrent((prev) => prev + 1);

    } else {

      await submitQuiz();

      setFinished(true);
    }
  };

  const progress =
    questions.length > 0
      ? (
          ((current + 1) /
            questions.length) *
          100
        )
      : 0;

  // START SCREEN
  if (questions.length === 0) {

    return (
      <AuthGuard>
      <AppLayout currentPath="/quiz">

        <div
          className="
            min-h-screen
            px-6 py-10
          "
          style={{
            background:
              'radial-gradient(circle at top,#0b1020,#050816 60%)',
          }}
        >

          <div className="max-w-3xl mx-auto">

            {/* HEADER */}
            <div className="text-center mb-10">

              <div className="w-24 h-24 rounded-3xl bg-violet-600/20 flex items-center justify-center mx-auto mb-6">
                <Brain
                  size={44}
                  className="text-violet-400"
                />
              </div>

              <h1 className="text-5xl font-bold text-white mb-4">
                AI Quiz Generator
              </h1>

              <p className="text-xl text-gray-400">
                Generate intelligent quizzes from your uploaded PDFs
              </p>

            </div>

            {/* CARD */}
            <div
              className="
                rounded-3xl
                p-8
              "
              style={{
                background:
                  'rgba(255,255,255,0.03)',

                border:
                  '1px solid rgba(255,255,255,0.08)',

                backdropFilter:
                  'blur(14px)',
              }}
            >

              {/* TOPIC */}
              <div className="mb-6">

                <label className="text-white font-medium block mb-3">
                  Quiz Topic
                </label>

                <input
                  type="text"
                  placeholder="e.g. Transactions, DBMS, Networking"
                  value={topic}
                  onChange={(e) =>
                    setTopic(e.target.value)
                  }
                  className="
                    w-full
                    rounded-2xl
                    px-5 py-4
                    bg-white/5
                    border border-white/10
                    text-white
                    outline-none
                  "
                />

              </div>

              {/* DOCUMENT SELECT */}
              <div className="mb-6">

                <label className="text-white font-medium block mb-3">
                  Generate From Document
                </label>

                <select
                  value={selectedDoc ?? ''}
                  onChange={(e) =>
                    setSelectedDoc(
                      e.target.value
                        ? Number(e.target.value)
                        : null
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    px-5 py-4
                    bg-[#111827]
                    border border-white/10
                    text-white
                    outline-none
                  "
                  style={{
                    color: 'white',
                    backgroundColor: '#111827',
                  }}
                >

                  <option
                    value=""
                    style={{
                      backgroundColor: '#111827',
                      color: 'white',
                    }}
                  >
                    All Documents
                  </option>

                  {documents.map(
                    (doc: any) => (
                      <option
                        key={doc.id}
                        value={doc.id}
                        style={{
                          backgroundColor: '#111827',
                          color: 'white',
                        }}
                      >
                        {doc.filename}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* QUESTION COUNT */}
              <div className="mb-8">

                <label className="text-white font-medium block mb-3">
                  Number of Questions
                </label>

                <input
                  type="number"
                  value={count}
                  onChange={(e) =>
                    setCount(
                      Number(e.target.value)
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    px-5 py-4
                    bg-white/5
                    border border-white/10
                    text-white
                    outline-none
                  "
                />

              </div>

              {/* BUTTON */}
              <button
                onClick={loadQuiz}
                disabled={loading}
                className="
                  w-full
                  py-5
                  rounded-2xl
                  font-semibold
                  text-lg
                  transition-all
                "
                style={{
                  background:
                    'linear-gradient(135deg,#7c3aed,#2563eb)',

                  color: 'white',
                }}
              >

                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2
                      size={22}
                      className="animate-spin"
                    />
                    Generating Quiz...
                  </div>
                ) : (
                  'Start AI Quiz'
                )}

              </button>

            </div>

          </div>

        </div>

      </AppLayout>
      </AuthGuard>
    );
  }

  // RESULT SCREEN
  if (finished) {

    return (
      <AuthGuard>
      <AppLayout currentPath="/quiz">

        <div
          className="
            min-h-screen
            flex items-center justify-center
            px-6
          "
          style={{
            background:
              'radial-gradient(circle at top,#0b1020,#050816 60%)',
          }}
        >

          <div
            className="
              max-w-xl
              w-full
              rounded-3xl
              p-10
              text-center
            "
            style={{
              background:
                'rgba(255,255,255,0.03)',

              border:
                '1px solid rgba(255,255,255,0.08)',
            }}
          >

            <div className="w-28 h-28 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-8">

              <Trophy
                size={56}
                className="text-yellow-400"
              />

            </div>

            <h1 className="text-4xl font-bold text-white mb-4">
              Quiz Completed
            </h1>

            <p className="text-2xl text-violet-300 mb-8">
              {score} / {questions.length}
            </p>

            <button
              onClick={() =>
                setQuestions([])
              }
              className="
                w-full
                py-4
                rounded-2xl
                font-semibold
                text-lg
              "
              style={{
                background:
                  'linear-gradient(135deg,#7c3aed,#2563eb)',
                color: 'white',
              }}
            >
              Generate New Quiz
            </button>

          </div>

        </div>

      </AppLayout>
      </AuthGuard>
    );
  }

  // QUIZ SCREEN
  const q = questions[current];

  return (
    <AuthGuard>
    <AppLayout currentPath="/quiz">

      <div
        className="
          min-h-screen
          px-6 py-10
        "
        style={{
          background:
            'radial-gradient(circle at top,#0b1020,#050816 60%)',
        }}
      >

        <div className="max-w-4xl mx-auto">

          {/* PROGRESS */}
          <div className="mb-8">

            <div className="flex justify-between mb-3">

              <span className="text-gray-300">
                Question {current + 1}
              </span>

              <span className="text-violet-300">
                {Math.round(progress)}%
              </span>

            </div>

            <div className="h-3 bg-white/10 rounded-full overflow-hidden">

              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background:
                    'linear-gradient(90deg,#7c3aed,#2563eb)',
                }}
              />

            </div>

          </div>

          {/* QUESTION CARD */}
          <div
            className="
              rounded-3xl
              p-8
            "
            style={{
              background:
                'rgba(255,255,255,0.03)',

              border:
                '1px solid rgba(255,255,255,0.08)',
            }}
          >

            <div className="flex items-center gap-4 mb-8">

              <div className="w-16 h-16 rounded-2xl bg-violet-600/20 flex items-center justify-center">

                <FileText
                  size={28}
                  className="text-violet-400"
                />

              </div>

              <h2 className="text-3xl font-bold text-white leading-relaxed">
                {q.question}
              </h2>

            </div>

            {/* OPTIONS */}
            <div className="space-y-4">

              {q.options.map(
                (opt, i) => {

                  let classes =
                    'bg-white/5 border-white/10 hover:bg-white/10';

                  if (
                    selected !== null
                  ) {

                    const isCorrect =
                      typeof q.answer ===
                      'number'
                        ? i === q.answer
                        : opt === q.answer;

                    const isSelected =
                      i === selected;

                    if (isCorrect) {
                      classes =
                        'bg-green-500/20 border-green-500';
                    } else if (
                      isSelected
                    ) {
                      classes =
                        'bg-red-500/20 border-red-500';
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() =>
                        handleAnswer(i)
                      }
                      className={`
                        w-full
                        text-left
                        rounded-2xl
                        border
                        p-5
                        transition-all
                        ${classes}
                      `}
                    >

                      <div className="flex items-center justify-between">

                        <span className="text-white text-lg">
                          {opt}
                        </span>

                        {selected !== null && (
                          <>
                            {(typeof q.answer ===
                              'number'
                              ? i === q.answer
                              : opt === q.answer) ? (
                              <CheckCircle2
                                size={22}
                                className="text-green-400"
                              />
                            ) : i ===
                              selected ? (
                              <XCircle
                                size={22}
                                className="text-red-400"
                              />
                            ) : null}
                          </>
                        )}

                      </div>

                    </button>
                  );
                }
              )}

            </div>

            {/* NEXT */}
            <button
              onClick={nextQuestion}
              disabled={selected === null}
              className="
                w-full
                py-5
                rounded-2xl
                font-semibold
                text-lg
                mt-8
                disabled:opacity-40
              "
              style={{
                background:
                  'linear-gradient(135deg,#7c3aed,#2563eb)',
                color: 'white',
              }}
            >
              {current + 1 ===
              questions.length
                ? 'Finish Quiz'
                : 'Next Question'}
            </button>

          </div>

        </div>

      </div>

    </AppLayout>
    </AuthGuard>
  );
}