'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import AppLayout from '@/components/AppLayout';
import AuthGuard from '@/components/AuthGuard';
import DashboardHeader from './components/DashboardHeader';
import KPIBentoGrid from './components/KPIBentoGrid';
import ActivityChart from './components/ActivityChart';
import TopicCoverageChart from './components/TopicCoverageChart';
import InsightCards from './components/InsightCards';
import RecentActivityFeed from './components/RecentActivityFeed';
import RecommendationsPanel from './components/RecommendationsPanel';

// ================= API CALLS =================

async function getStats(token: string) {
  const res = await fetch(
    'http://localhost:8000/stats',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch stats');
  }

  return res.json();
}

async function getInsights(token: string) {
  const res = await fetch(
    'http://localhost:8000/insights',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch insights');
  }

  return res.json();
}

async function getRecommendations(token: string) {
  const res = await fetch(
    'http://localhost:8000/recommendations',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch recommendations');
  }

  return res.json();
}

async function getActivity(token: string) {
  const res = await fetch(
    'http://localhost:8000/activity',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch activity');
  }

  return res.json();
}

async function getTopicCoverage(token: string) {
  const res = await fetch(
    'http://localhost:8000/topic-coverage',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch topic coverage');
  }

  return res.json();
}

async function getRecentActivity(token: string) {
  const res = await fetch(
    'http://localhost:8000/recent-activity',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch recent activity');
  }

  return res.json();
}

// ================= PAGE =================

export default function DashboardPage() {

  const [stats, setStats] = useState<any>(null);

  const [insights, setInsights] = useState<any>(null);

  const [recommendations, setRecommendations] =
    useState<any>(null);

  const [activityData, setActivityData] =
    useState<any[]>([]);

  const [topicData, setTopicData] =
    useState<any[]>([]);

  const [recentActivity, setRecentActivity] =
    useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  const router = useRouter();

  // ================= AUTH =================

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      router.push("/login");

      return;
    }

    setAuthorized(true);

    loadData(token);

  }, []);

  // ================= LOAD DATA =================

  const loadData = async (token: string) => {

    try {

      const [
        statsData,
        insightsData,
        recommendationsData,
        activity,
        topics,
        activities
      ] = await Promise.all([
        getStats(token),
        getInsights(token),
        getRecommendations(token),
        getActivity(token),
        getTopicCoverage(token),
        getRecentActivity(token),
      ]);

      setStats(statsData);

      setInsights(insightsData);

      setRecommendations(recommendationsData);

      setActivityData(
        Array.isArray(activity)
          ? activity
          : []
      );

      setTopicData(
        Array.isArray(topics)
          ? topics
          : []
      );

      // ✅ FIXED
      setRecentActivity(
        Array.isArray(activities)
          ? activities
          : []
      );

      console.log("STATS:", statsData);
      console.log("ACTIVITY:", activity);
      console.log("TOPICS:", topics);
      console.log("RECENT:", activities);

    } catch (err) {

      console.error(
        'Dashboard loading error:',
        err
      );

    } finally {

      setLoading(false);

    }
  };

  // ================= REFRESH =================

  const refreshStats = async () => {

    const token =
      localStorage.getItem('token');

    if (!token) return;

    setLoading(true);

    await loadData(token);
  };

  if (!authorized) return null;

  // ================= UI =================

  return (
    <AuthGuard>
    <AppLayout currentPath="/dashboard">

      <div className="min-h-full px-6 py-6 xl:px-8 2xl:px-10">

        {/* HEADER */}
        <DashboardHeader
          onRefresh={refreshStats}
        />

        {/* KPI */}
        <KPIBentoGrid
          stats={stats}
          insights={insights}
          loading={loading}
        />

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">

          {/* DAILY ACTIVITY */}
          <div className="lg:col-span-2">

            <ActivityChart/>

          </div>

          {/* TOPIC COVERAGE */}
          <div>

            <TopicCoverageChart/>

          </div>

        </div>

        {/* INSIGHTS + RECOMMENDATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">

          <InsightCards
            insights={insights}
          />

          <RecommendationsPanel
            recommendations={recommendations}
          />

        </div>

        {/* RECENT ACTIVITY */}
        <div className="mt-5">

          {/* ✅ FIXED */}
          <RecentActivityFeed
            activities={recentActivity}
          />

        </div>

      </div>

    </AppLayout>
    </AuthGuard>
  );
}