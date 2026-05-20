'use client';

import React, { useEffect, useState } from 'react';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

export default function TopicCoverageChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8000/topic-coverage', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res || []);
      })
      .catch(console.error);
  }, []);

  const colors = [
    '#8b5cf6',
    '#06b6d4',
    '#22c55e',
    '#f59e0b',
    '#ef4444',
    '#ec4899',
  ];

  return (
    <div
      className="rounded-3xl border p-6 h-[560px]"
      style={{
        background: '#04113a',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <h2 className="text-5xl font-bold text-white mb-2">
        Topic Coverage
      </h2>

      <p className="text-gray-400 text-2xl mb-10">
        Quiz topic performance
      </p>

      {data.length === 0 ? (
        <div className="h-[380px] flex items-center justify-center text-gray-500 text-3xl">
          No topic data
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 60,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              dataKey="topic"
              interval={0}
              angle={-15}
              textAnchor="end"
              tick={{
                fill: '#cbd5e1',
                fontSize: 12,
              }}
            />

            <YAxis
              domain={[0, 100]}
              tick={{
                fill: '#cbd5e1',
                fontSize: 12,
              }}
            />

            <Tooltip />

            <Bar
              dataKey="accuracy"
              radius={[8, 8, 0, 0]}
            >
              {data.map((_: any, index: number) => (
                <Cell
                  key={index}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}