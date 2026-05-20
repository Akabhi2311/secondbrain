'use client';

import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Brain,
} from 'lucide-react';

interface Props {
  insights: any;
}

export default function InsightCards({
  insights,
}: Props) {

  const weakTopics = insights?.weak_topics || [];
  const strongTopics = insights?.strong_topics || [];

  return (
    <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">

      <div className="flex items-center gap-2 mb-4">
        <Brain className="text-pink-400" size={20} />

        <h2 className="text-lg font-bold text-white">
          AI Insights
        </h2>
      </div>

      {/* NO DATA */}
      {weakTopics.length === 0 &&
      strongTopics.length === 0 ? (
        <div className="text-green-400 flex items-center gap-2">
          <CheckCircle2 size={18} />
          You're doing great 🎉
        </div>
      ) : (
        <div className="space-y-4">

          {/* WEAK TOPICS */}
          {weakTopics.length > 0 && (
            <div>
              <h3 className="text-red-400 font-semibold mb-2">
                Weak Areas
              </h3>

              <div className="space-y-2">
                {weakTopics.map((topic: any, index: number) => (
                  <div
                    key={index}
                    className="bg-red-950 border border-red-900 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 text-red-300 font-medium">
                      <AlertTriangle size={16} />
                      {topic.topic}
                    </div>

                    <p className="text-sm text-red-200 mt-1">
                      Accuracy: {topic.accuracy || 0}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STRONG TOPICS */}
          {strongTopics.length > 0 && (
            <div>
              <h3 className="text-green-400 font-semibold mb-2">
                Strong Areas
              </h3>

              <div className="space-y-2">
                {strongTopics.map((topic: any, index: number) => (
                  <div
                    key={index}
                    className="bg-green-950 border border-green-900 rounded-lg p-3"
                  >
                    <p className="text-green-300 font-medium">
                      {topic.topic}
                    </p>

                    <p className="text-sm text-green-200 mt-1">
                      Accuracy: {topic.accuracy || 0}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}