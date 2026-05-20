'use client';

import React, {
  useState,
  useRef,
  useEffect,
} from 'react';

import {
  Send,
  Loader2,
  Copy,
  Sparkles,
  FileText,
} from 'lucide-react';

import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface Props {
  conversationId: string;
}

function AssistantMessage({
  message,
}: {
  message: Message;
}) {
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);

    toast.success('Copied');
  };

  return (
    <div className="flex gap-4">
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{
          background:
            'linear-gradient(135deg,#7c3aed,#2563eb)',
        }}
      >
        <Sparkles size={18} className="text-white" />
      </div>

      <div className="flex-1">
        <div
          className="rounded-3xl p-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="text-gray-200 leading-8 whitespace-pre-wrap">
            {message.content}
          </p>
        </div>

        <div className="mt-2 flex items-center gap-4">
          <button
            onClick={handleCopy}
            className="text-gray-400 hover:text-white"
          >
            <Copy size={15} />
          </button>

          <span className="text-xs text-gray-500">
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}

function UserMessage({
  message,
}: {
  message: Message;
}) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-2xl rounded-3xl px-5 py-4"
        style={{
          background:
            'linear-gradient(135deg,#6d28d9,#2563eb)',
        }}
      >
        <p className="text-white leading-7">
          {message.content}
        </p>
      </div>
    </div>
  );
}

export default function ChatArea({
  conversationId,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState('');

  const [loading, setLoading] = useState(false);

  const [documents, setDocuments] = useState<any[]>([]);

  const [selectedPdf, setSelectedPdf] =
    useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages]);

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');

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
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const text = input;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput('');

    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(
        'http://localhost:8000/query',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            question: text,
            document_id: selectedPdf,
          }),
        }
      );

      const data = await res.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          data.response ||
          'No response generated.',
        timestamp:
          new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);
    } catch (err) {
      console.error(err);

      toast.error('Failed to query AI');
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#050816]">

      {/* HEADER */}
      <div className="px-8 py-6 border-b border-white/10">
        <h1 className="text-4xl font-bold text-white">
          AI PDF Assistant
        </h1>

        <p className="text-gray-400 mt-2">
          Ask questions from your uploaded PDFs
        </p>
      </div>

      {/* PDF SELECTOR */}
      <div className="px-8 py-5 border-b border-white/10">
        <div className="max-w-md">

          <label className="text-sm text-gray-400 mb-2 block">
            Select PDF
          </label>

          <div className="relative">

            <FileText
              size={18}
              className="absolute left-4 top-4 text-violet-400"
            />

            <select
              value={selectedPdf ?? ''}
              onChange={(e) =>
                setSelectedPdf(
                  e.target.value
                    ? Number(e.target.value)
                    : null
                )
              }
              className="
                w-full
                bg-[#0f172a]
                border
                border-white/10
                rounded-2xl
                px-12
                py-4
                text-white
                outline-none
              "
            >
              <option value="">
                Ask across all PDFs
              </option>

              {documents.map((doc: any) => (
                <option
                  key={doc.id}
                  value={doc.id}
                >
                  {doc.filename}
                </option>
              ))}
            </select>

          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">

            <div className="w-28 h-28 rounded-3xl bg-violet-600/20 flex items-center justify-center mb-8">
              <Sparkles
                size={50}
                className="text-violet-400"
              />
            </div>

            <h2 className="text-5xl font-bold text-white mb-5">
              Ask your PDFs anything
            </h2>

            <p className="text-gray-400 max-w-3xl leading-9 text-lg">
              Use AI-powered semantic search to
              retrieve answers directly from your
              uploaded PDFs.
            </p>

          </div>
        )}

        {messages.map((msg) =>
          msg.role === 'user' ? (
            <UserMessage
              key={msg.id}
              message={msg}
            />
          ) : (
            <AssistantMessage
              key={msg.id}
              message={msg}
            />
          )
        )}

        {loading && (
          <div className="flex items-center gap-3 text-violet-400">
            <Loader2
              size={18}
              className="animate-spin"
            />

            <span>Thinking...</span>
          </div>
        )}

        <div ref={bottomRef} />

      </div>

      {/* INPUT */}
      <div className="p-6 border-t border-white/10">

        <div className="flex items-end gap-4">

          <div
            className="flex-1 rounded-3xl overflow-hidden"
            style={{
              background:
                'rgba(255,255,255,0.03)',
              border:
                '1px solid rgba(255,255,255,0.08)',
            }}
          >

            <textarea
              rows={3}
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask questions from your selected PDF..."
              className="
                w-full
                px-5
                py-4
                bg-transparent
                outline-none
                resize-none
                text-white
              "
            />

          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
            "
            style={{
              background:
                'linear-gradient(135deg,#7c3aed,#2563eb)',
            }}
          >
            {loading ? (
              <Loader2
                size={20}
                className="animate-spin text-white"
              />
            ) : (
              <Send
                size={20}
                className="text-white"
              />
            )}
          </button>

        </div>

      </div>

    </div>
  );
}