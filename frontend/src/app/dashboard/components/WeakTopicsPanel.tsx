import React from 'react';
import { AlertTriangle, TrendingDown } from 'lucide-react';

const weakTopics = [
  { id: 'wt-001', topic: 'Bayesian Statistics', score: 41, lastReviewed: '18 days ago', docs: 3 },
  { id: 'wt-002', topic: 'Computer Vision', score: 54, lastReviewed: '12 days ago', docs: 5 },
  { id: 'wt-003', topic: 'Reinforcement Learning', score: 38, lastReviewed: '24 days ago', docs: 2 },
  { id: 'wt-004', topic: 'Graph Neural Networks', score: 62, lastReviewed: '9 days ago', docs: 4 },
  { id: 'wt-005', topic: 'Ethics in AI', score: 47, lastReviewed: '31 days ago', docs: 2 },
  { id: 'wt-006', topic: 'Distributed Systems', score: 58, lastReviewed: '15 days ago', docs: 3 },
];

function ScoreBar({ score }: { score: number }) {
  const color =
    score < 50
      ? 'hsl(var(--negative))'
      : score < 65
      ? 'hsl(var(--warning))'
      : 'hsl(var(--positive))';

  return (
    <div
      className="h-1 rounded-full overflow-hidden"
      style={{ backgroundColor: 'hsl(var(--border))' }}
    >
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${score}%`, backgroundColor: color }}
      />
    </div>
  );
}

type Props = {
  weakTopics: { topic: string; accuracy: number }[];
};

export default function WeakTopicsPanel({ weakTopics }: Props) {
  return (
    <div className="bg-red-900/30 p-4 rounded">
      <h2 className="text-lg font-bold mb-2 text-red-400">
        ⚠ Weak Topics
      </h2>

      {weakTopics.length === 0 ? (
        <p className="text-gray-400">No weak topics 🎉</p>
      ) : (
        weakTopics.map((t, i) => (
          <div key={i} className="mb-2">
            <p className="text-white">{t.topic}</p>
            <p className="text-sm text-red-300">
              Accuracy: {t.accuracy ?? 0}%
            </p>
          </div>
        ))
      )}
    </div>
  );
}