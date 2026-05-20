'use client';

import React, {
  useEffect,
  useState
} from 'react';
import AuthGuard from '@/components/AuthGuard';
import AppLayout from '@/components/AppLayout';

export default function InsightsPage() {

  const [insights, setInsights] = useState<any>(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {

    try {

      const token = localStorage.getItem('token');

      const res = await fetch(
        'http://localhost:8000/insights',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setInsights(data);

    } catch (err) {

      console.error(err);

    }
  };

  return (
    <AuthGuard>
    <AppLayout currentPath="/insights">

      <div className="p-8 text-white">

        <h1 className="text-3xl font-bold mb-8">
          🧠 AI Insights
        </h1>

        {/* WEAK TOPICS */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6">

          <h2 className="text-2xl font-semibold mb-4">
            Weak Topics
          </h2>

          {insights?.weak_topics?.length === 0 ? (

            <p className="text-green-400">
              No weak topics 🎉
            </p>

          ) : (

            insights?.weak_topics?.map(
              (topic: any, index: number) => (

                <div
                  key={index}
                  className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-3"
                >

                  <h3 className="text-xl font-bold text-red-300">
                    {topic.topic}
                  </h3>

                  <p className="text-red-200">
                    Accuracy: {topic.accuracy}%
                  </p>

                </div>

              )
            )

          )}

        </div>

        {/* STRONG TOPICS */}
        <div className="bg-gray-900 rounded-2xl p-6">

          <h2 className="text-2xl font-semibold mb-4">
            Strong Topics
          </h2>

          {insights?.strong_topics?.length === 0 ? (

            <p className="text-gray-400">
              No strong topics yet
            </p>

          ) : (

            insights?.strong_topics?.map(
              (topic: any, index: number) => (

                <div
                  key={index}
                  className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-3"
                >

                  <h3 className="text-xl font-bold text-green-300">
                    {topic.topic}
                  </h3>

                  <p className="text-green-200">
                    Accuracy: {topic.accuracy}%
                  </p>

                </div>

              )
            )

          )}

        </div>

      </div>

    </AppLayout>
    </AuthGuard>
  );
}