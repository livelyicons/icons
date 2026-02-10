'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface Icon {
  id: string;
  name: string;
  svgContent: string;
  style: string;
  createdAt: string;
  clerkUserId: string;
}

interface TeamLibraryClientProps {
  teamId: string;
}

/**
 * Renders SVG via DOMParser ref-based approach
 * instead of dangerouslySetInnerHTML.
 */
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

export function TeamLibraryClient({ teamId }: TeamLibraryClientProps) {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [style, setStyle] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 24;

  const fetchIcons = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) });
      if (search) params.set('search', search);
      if (style) params.set('style', style);

      const res = await fetch(`/api/teams/${teamId}/library?${params}`);
      const data = await res.json();
      if (res.ok) {
        setIcons(data.icons);
        setTotal(data.total);
      }
    } catch {} finally {
      setLoading(false);
    }
  }, [teamId, search, style, page]);

  useEffect(() => {
    fetchIcons();
  }, [fetchIcons]);

  useEffect(() => {
    setPage(1);
  }, [search, style]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Team Library</h1>
        <p className="text-sm text-zinc-500 mt-1">{total} icon{total !== 1 ? 's' : ''}</p>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search icons..."
          className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
        />
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
        >
          <option value="">All styles</option>
          <option value="line_art">Line Art</option>
          <option value="flat">Flat</option>
          <option value="glyph">Glyph</option>
          <option value="outline">Outline</option>
          <option value="handdrawn">Hand Drawn</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">
          Loading...
        </div>
      ) : icons.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">
          {search || style ? 'No icons match your filters' : 'No icons generated yet'}
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {icons.map((icon) => (
            <div
              key={icon.id}
              className="group relative bg-zinc-900 border border-zinc-800 rounded-lg p-3 flex items-center justify-center aspect-square hover:border-zinc-700 transition-colors"
            >
              <SafeSvgPreview html={icon.svgContent} className="w-8 h-8 text-white" />
              <div className="absolute inset-x-0 bottom-0 p-1.5 bg-zinc-900/90 rounded-b-lg hidden group-hover:block">
                <p className="text-[10px] text-zinc-400 truncate text-center">{icon.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            Previous
          </button>
          <span className="text-sm text-zinc-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
