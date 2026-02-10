'use client';

import { useState, useEffect, useRef } from 'react';

interface SharedIcon {
  id: string;
  name: string;
  svgCode: string;
  style: string;
}

interface PublicCollectionViewProps {
  collection: {
    name: string;
    description: string | null;
    iconCount: number;
    publicSlug: string;
  };
  icons: SharedIcon[];
  hasPassword: boolean;
}

function SafeSvgPreview({ html, className }: { html: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'image/svg+xml');
    const svgEl = doc.documentElement;
    if (svgEl && svgEl.tagName === 'svg' && !doc.querySelector('parsererror')) {
      containerRef.current.appendChild(document.importNode(svgEl, true));
    }
  }, [html]);

  return <div ref={containerRef} className={className} />;
}

export function PublicCollectionView({ collection, icons, hasPassword }: PublicCollectionViewProps) {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(!hasPassword);
  const [unlocking, setUnlocking] = useState(false);
  const [error, setError] = useState('');
  const [unlockedIcons, setUnlockedIcons] = useState<SharedIcon[]>(icons);
  const [copied, setCopied] = useState(false);

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setUnlocking(true);
    setError('');

    try {
      const res = await fetch(`/api/shared/${collection.publicSlug}`, {
        headers: { 'X-Share-Password': password },
      });

      if (!res.ok) {
        setError('Incorrect password');
        return;
      }

      const data = await res.json();
      setUnlockedIcons(data.icons);
      setUnlocked(true);
    } catch {
      setError('Failed to unlock collection');
    } finally {
      setUnlocking(false);
    }
  }

  function handleCopyEmbed() {
    const embedCode = `<script src="${window.location.origin}/api/shared/${collection.publicSlug}/embed.js"></script>`;
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-2xl font-bold text-white">{collection.name}</h1>
          <p className="text-sm text-zinc-400">This collection is password protected</p>
          <form onSubmit={handleUnlock} className="space-y-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={unlocking}
              className="w-full px-4 py-2.5 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 disabled:opacity-50 transition-colors"
            >
              {unlocking ? 'Unlocking...' : 'View Collection'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">{collection.name}</h1>
            {collection.description && (
              <p className="text-sm text-zinc-400 mt-1">{collection.description}</p>
            )}
            <p className="text-xs text-zinc-600 mt-1">
              {collection.iconCount} icon{collection.iconCount !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleCopyEmbed}
            className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy Embed Code'}
          </button>
        </div>

        {unlockedIcons.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">
            This collection is empty
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
            {unlockedIcons.map((icon) => (
              <div
                key={icon.id}
                className="group relative bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-center aspect-square hover:border-zinc-700 transition-colors"
              >
                <SafeSvgPreview html={icon.svgCode} className="w-8 h-8 text-white" />
                <div className="absolute inset-x-0 bottom-0 p-1.5 bg-zinc-900/90 rounded-b-lg hidden group-hover:block">
                  <p className="text-[10px] text-zinc-400 truncate text-center">{icon.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center pt-8">
          <p className="text-xs text-zinc-600">
            Shared via <span className="text-zinc-500">LivelyIcons</span>
          </p>
        </div>
      </div>
    </div>
  );
}
