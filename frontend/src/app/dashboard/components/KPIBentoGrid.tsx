import React from 'react';

import {
  FileText,
  Network,
  MessageSquare,
  Target,
  Flame,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';

interface Props {
  stats: any;
  insights?: any;
  loading: boolean;
}

function TrendIcon({
  trend,
}: {
  trend: 'up' | 'down' | 'neutral';
}) {
  if (trend === 'up')
    return <TrendingUp size={12} />;

  if (trend === 'down')
    return <TrendingDown size={12} />;

  return <Minus size={12} />;
}

function KPICard({ card }: any) {

  return (
    <div
      className="rounded-2xl border p-6 flex flex-col gap-4 bg-[#071120]"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >

      <div className="flex items-center justify-between">

        <span className="text-xs uppercase text-gray-400 font-semibold tracking-wide">
          {card.label}
        </span>

        <div className="text-white">
          {card.icon}
        </div>

      </div>

      <div>

        <p className="text-5xl font-bold text-white">
          {card.value}
        </p>

        {card.subValue && (
          <p className="text-sm text-gray-400 mt-2">
            {card.subValue}
          </p>
        )}

      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400">

        <TrendIcon trend={card.trend} />

        {card.changeLabel}

      </div>

    </div>
  );
}

export default function KPIBentoGrid({
  stats,
  insights,
  loading,
}: Props) {

  const weakTopics =
    insights?.weak_topics || [];

  const data = [

    {
      label: 'Total Documents',

      value: loading
        ? '...'
        : stats?.total_documents || 0,

      icon: <FileText size={22} />,

      trend: 'up',

      changeLabel: 'uploaded',
    },

    {
      label: 'Knowledge Nodes',

      value: loading
        ? '...'
        : stats?.total_chunks || 0,

      icon: <Network size={22} />,

      trend: 'up',

      changeLabel: 'chunks',
    },

    {
      label: 'Questions Answered',

      value: loading
        ? '...'
        : stats?.questions_answered || 0,

      icon: <MessageSquare size={22} />,

      trend: 'up',

      changeLabel: 'quiz attempts',
    },

    {
      label: 'Retrieval Quality',

      value: loading
        ? '...'
        : `${stats?.retrieval_quality || 0}%`,

      icon: <Target size={22} />,

      trend: 'neutral',

      changeLabel: 'accuracy',
    },

    {
      label: 'Learning Activity',

      value: loading
        ? '...'
        : `${stats?.questions_answered || 0} quizzes`,

      icon: <Flame size={22} />,

      trend: 'up',

      changeLabel: 'learning streak',
    },

    {
      label: 'Weak Topics',

      value: loading
        ? '...'
        : weakTopics.length,

      icon: <AlertTriangle size={22} />,

      trend:
        weakTopics.length > 0
          ? 'down'
          : 'up',

      changeLabel:
        weakTopics.length > 0
          ? 'needs improvement'
          : 'great progress',

      alert: weakTopics.length > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

      <div className="sm:col-span-2">
        <KPICard card={data[0]} />
      </div>

      <KPICard card={data[1]} />

      <KPICard card={data[2]} />

      <KPICard card={data[3]} />

      <KPICard card={data[4]} />

      <div className="sm:col-span-2">
        <KPICard card={data[5]} />
      </div>

    </div>
  );
}