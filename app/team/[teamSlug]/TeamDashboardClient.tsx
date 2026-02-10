'use client';

import { useEffect, useState } from 'react';
import { TeamUsageChart } from '../components/TeamUsageChart';

interface TeamData {
  id: string;
  name: string;
  slug: string;
  ownerClerkUserId: string;
}

interface DailyUsage {
  date: string;
  tokensUsed: number;
  count: number;
}

interface Analytics {
  dailyUsage: DailyUsage[];
  byMember: Array<{ clerkUserId: string; total: number }>;
  byStyle: Array<{ style: string; total: number }>;
}

interface DashboardProps {
  team: TeamData;
  role: string;
  memberCount: number;
  iconCount: number;
  tokenBalance: number;
}

export function TeamDashboardClient({
  team,
  role,
  memberCount,
  iconCount,
  tokenBalance,
}: DashboardProps) {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    if (role === 'admin') {
      fetch(`/api/teams/${team.id}/analytics?period=30d`)
        .then((res) => res.json())
        .then(setAnalytics)
        .catch(() => {});
    }
  }, [team.id, role]);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{team.name}</h1>
        <p className="text-sm text-zinc-500 mt-1">Team dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Members" value={memberCount} />
        <StatCard label="Team Icons" value={iconCount} />
        <StatCard label="Token Balance" value={tokenBalance.toLocaleString()} />
      </div>

      {role === 'admin' && analytics && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="text-sm font-medium text-white mb-4">Token usage (30 days)</h2>
          <TeamUsageChart dailyUsage={analytics.dailyUsage} />
        </div>
      )}

      {role === 'admin' && analytics && analytics.byStyle.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
          <h2 className="text-sm font-medium text-white mb-3">By style</h2>
          <div className="space-y-2">
            {analytics.byStyle.map((s) => (
              <div key={s.style} className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">{s.style}</span>
                <span className="text-white">{s.total}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <div className="text-xs text-zinc-500 mb-1">{label}</div>
      <div className="text-2xl font-semibold text-white">{value}</div>
    </div>
  );
}
