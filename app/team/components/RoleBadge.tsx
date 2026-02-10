'use client';

const roleColors: Record<string, string> = {
  admin: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  editor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  viewer: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
};

export function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${roleColors[role] ?? roleColors.viewer}`}
    >
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
}
