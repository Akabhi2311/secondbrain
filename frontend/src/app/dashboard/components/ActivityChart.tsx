'use client';

import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export default function ActivityChart() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:8000/activity', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {

        // ✅ ONLY LAST 7 DAYS
        const sorted = [...res]
          .sort(
            (a, b) =>
              new Date(a.date).getTime() -
              new Date(b.date).getTime()
          )
          .slice(-7);

        setData(sorted);
      })
      .catch(console.error);
  }, []);

  return (
    <div
      className="rounded-3xl border p-6 h-[560px]"
      style={{
        background: '#04113a',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <h2 className="text-5xl font-bold text-white mb-2">
        Daily Activity
      </h2>

      <p className="text-gray-400 text-2xl mb-10">
        Uploads, quizzes, and AI queries
      </p>

      {data.length === 0 ? (
        <div className="h-[380px] flex items-center justify-center text-gray-500 text-3xl">
          No activity yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={380}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 20,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.08)"
            />

            <XAxis
              dataKey="date"
              tick={{
                fill: '#cbd5e1',
                fontSize: 12,
              }}
            />

            <YAxis
              tick={{
                fill: '#cbd5e1',
                fontSize: 12,
              }}
            />

            <Tooltip />

            {/* uploads */}
            <Line
              type="monotone"
              dataKey="uploads"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            {/* quizzes */}
            <Line
              type="monotone"
              dataKey="quizzes"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            {/* queries */}
            <Line
              type="monotone"
              dataKey="queries"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}