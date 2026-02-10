'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TeamSidebarProps {
  teamSlug: string;
  teamName: string;
  role: string;
}

const navItems = [
  { label: 'Dashboard', href: '', icon: 'chart' },
  { label: 'Library', href: '/library', icon: 'grid' },
  { label: 'Collections', href: '/collections', icon: 'folder' },
  { label: 'Members', href: '/members', icon: 'users', minRole: 'viewer' },
  { label: 'Settings', href: '/settings', icon: 'settings', minRole: 'admin' },
];

const ROLE_LEVEL: Record<string, number> = { viewer: 0, editor: 1, admin: 2 };

export function TeamSidebar({ teamSlug, teamName, role }: TeamSidebarProps) {
  const pathname = usePathname();
  const basePath = `/team/${teamSlug}`;

  return (
    <aside className="w-56 shrink-0 border-r border-zinc-800 bg-zinc-950 min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-white truncate">{teamName}</h2>
        <span className="text-xs text-zinc-500">Team workspace</span>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          if (item.minRole && ROLE_LEVEL[role] < ROLE_LEVEL[item.minRole]) return null;
          const href = `${basePath}${item.href}`;
          const isActive = pathname === href;
          return (
            <Link
              key={item.href}
              href={href}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
