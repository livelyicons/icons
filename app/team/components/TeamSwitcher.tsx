'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TeamInfo {
  id: string;
  name: string;
  slug: string;
  role: string;
}

export function TeamSwitcher() {
  const [teams, setTeams] = useState<TeamInfo[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch('/api/teams')
      .then((res) => res.json())
      .then((data) => setTeams(data.teams ?? []))
      .catch(() => {});
  }, []);

  if (teams.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
      >
        Team
        <svg className="w-3 h-3" fill="none" viewBox="0 0 12 12">
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-48 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 py-1">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/team/${team.slug}`}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              {team.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
