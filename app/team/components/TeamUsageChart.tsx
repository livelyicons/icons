'use client';

interface DailyUsage {
  date: string;
  tokensUsed: number;
  count: number;
}

interface TeamUsageChartProps {
  dailyUsage: DailyUsage[];
}

export function TeamUsageChart({ dailyUsage }: TeamUsageChartProps) {
  if (dailyUsage.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">
        No usage data yet
      </div>
    );
  }

  const maxTokens = Math.max(...dailyUsage.map((d) => d.tokensUsed), 1);

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1 h-40">
        {dailyUsage.map((day) => {
          const height = Math.max((day.tokensUsed / maxTokens) * 100, 2);
          return (
            <div
              key={day.date}
              className="flex-1 group relative"
            >
              <div
                className="bg-green-500/60 hover:bg-green-500/80 rounded-t transition-colors"
                style={{ height: `${height}%` }}
              />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-zinc-800 text-xs text-white px-2 py-1 rounded whitespace-nowrap z-10">
                {day.tokensUsed} tokens / {day.count} icons
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-[10px] text-zinc-500">
        <span>{dailyUsage[0]?.date}</span>
        <span>{dailyUsage[dailyUsage.length - 1]?.date}</span>
      </div>
    </div>
  );
}
