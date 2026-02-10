'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import DOMPurify from 'dompurify';
import type { GeneratedIcon } from '@/db/schema';

/**
 * Sanitize SVG string to prevent XSS when rendering user-generated content.
 */
function sanitizeSvg(svg: string): string {
  return DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true, svgFilters: true },
    ADD_TAGS: ['use'],
  });
}

/**
 * Renders DOMPurify-sanitized SVG via DOMParser + importNode.
 */
function SafeSvgPreview({ html, className, style: cssStyle }: { html: string; className?: string; style?: React.CSSProperties }) {
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

  return <div ref={containerRef} className={className} style={cssStyle} />;
}

interface Collection {
  id: string;
  name: string;
  description: string | null;
  parentCollectionId: string | null;
  createdAt: string;
  updatedAt: string;
  iconCount: number;
}

interface MyIconsPanelProps {
  onSelectIcon?: (icon: GeneratedIcon) => void;
}

export function MyIconsPanel({ onSelectIcon }: MyIconsPanelProps) {
  const { isSignedIn } = useUser();
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [editingIcon, setEditingIcon] = useState<GeneratedIcon | null>(null);

  // Phase 2: Collections
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | null>(null);
  const [showNewCollection, setShowNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const [creatingCollection, setCreatingCollection] = useState(false);
  const [exportingCollection, setExportingCollection] = useState(false);

  // Phase 2: CDN (track which icons have active CDN slug prompts)
  const [cdnSlugInputIcon, setCdnSlugInputIcon] = useState<string | null>(null);
  const [cdnSlugValue, setCdnSlugValue] = useState('');
  const [publishingCdn, setPublishingCdn] = useState(false);

  // Phase 2: Add-to-collection dropdown
  const [addToCollectionIcon, setAddToCollectionIcon] = useState<string | null>(null);

  // Phase 3: Team Library tab
  const [activeTab, setActiveTab] = useState<'personal' | 'team'>('personal');
  const [userTeams, setUserTeams] = useState<Array<{ id: string; name: string }>>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [teamIcons, setTeamIcons] = useState<GeneratedIcon[]>([]);
  const [teamLoading, setTeamLoading] = useState(false);

  const fetchIcons = useCallback(async () => {
    if (!isSignedIn) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (selectedCollectionId) params.set('collectionId', selectedCollectionId);
      const res = await fetch(`/api/user/library?${params}`);
      if (res.ok) {
        const data = await res.json();
        setIcons(data.icons);
      }
    } catch (err) {
      console.error('Failed to load library:', err);
    } finally {
      setLoading(false);
    }
  }, [isSignedIn, search, selectedCollectionId]);

  const fetchCollections = useCallback(async () => {
    if (!isSignedIn) return;
    try {
      const res = await fetch('/api/user/collections');
      if (res.ok) {
        const data = await res.json();
        setCollections(data.collections);
      }
    } catch (err) {
      console.error('Failed to load collections:', err);
    }
  }, [isSignedIn]);

  useEffect(() => {
    fetchIcons();
  }, [fetchIcons]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  // Phase 3: Load teams
  useEffect(() => {
    if (!isSignedIn) return;
    fetch('/api/teams')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.teams?.length) {
          setUserTeams(data.teams);
          setSelectedTeamId(data.teams[0].id);
        }
      })
      .catch(() => {});
  }, [isSignedIn]);

  // Phase 3: Load team icons
  const fetchTeamIcons = useCallback(async () => {
    if (!selectedTeamId) return;
    setTeamLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      const res = await fetch(`/api/teams/${selectedTeamId}/library?${params}`);
      if (res.ok) {
        const data = await res.json();
        setTeamIcons(data.icons);
      }
    } catch {} finally {
      setTeamLoading(false);
    }
  }, [selectedTeamId, search]);

  useEffect(() => {
    if (activeTab === 'team') fetchTeamIcons();
  }, [activeTab, fetchTeamIcons]);

  const handleDelete = async (iconId: string) => {
    if (!confirm('Delete this icon? It can be recovered within 30 days.')) return;
    try {
      const res = await fetch(`/api/user/library/${iconId}`, { method: 'DELETE' });
      if (res.ok) {
        setIcons((prev) => prev.filter((i) => i.id !== iconId));
      }
    } catch (err) {
      console.error('Failed to delete icon:', err);
    }
  };

  const handleUpdateIcon = async (iconId: string, updates: Partial<GeneratedIcon>) => {
    try {
      const res = await fetch(`/api/user/library/${iconId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const data = await res.json();
        setIcons((prev) => prev.map((i) => (i.id === iconId ? data.icon : i)));
        setEditingIcon(null);
      }
    } catch (err) {
      console.error('Failed to update icon:', err);
    }
  };

  // Phase 2: Create a new collection
  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) return;
    setCreatingCollection(true);
    try {
      const res = await fetch('/api/user/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCollectionName.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setCollections((prev) => [data.collection, ...prev]);
        setShowNewCollection(false);
        setNewCollectionName('');
      }
    } catch (err) {
      console.error('Failed to create collection:', err);
    } finally {
      setCreatingCollection(false);
    }
  };

  // Phase 2: Add icon to collection
  const handleAddToCollection = async (iconId: string, collectionId: string) => {
    try {
      await fetch(`/api/user/collections/${collectionId}/icons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ iconIds: [iconId] }),
      });
      setAddToCollectionIcon(null);
      fetchCollections(); // refresh counts
    } catch (err) {
      console.error('Failed to add to collection:', err);
    }
  };

  // Phase 2: Export collection as ZIP
  const handleExportCollection = async (format: 'svg' | 'react' | 'vue' | 'html') => {
    if (!selectedCollectionId) return;
    setExportingCollection(true);
    try {
      const res = await fetch(`/api/user/collections/${selectedCollectionId}/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formats: [format] }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'collection.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExportingCollection(false);
    }
  };

  // Phase 2: Publish icon to CDN
  const handlePublishCdn = async (iconId: string) => {
    if (!cdnSlugValue.trim()) return;
    setPublishingCdn(true);
    try {
      const res = await fetch('/api/user/cdn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ iconId, slug: cdnSlugValue.trim() }),
      });
      if (res.ok) {
        setIcons((prev) =>
          prev.map((i) => (i.id === iconId ? { ...i, cdnSlug: cdnSlugValue.trim() } : i)),
        );
        setCdnSlugInputIcon(null);
        setCdnSlugValue('');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to publish to CDN');
      }
    } catch (err) {
      console.error('CDN publish failed:', err);
    } finally {
      setPublishingCdn(false);
    }
  };

  // Phase 2: Unpublish icon from CDN
  const handleUnpublishCdn = async (iconId: string) => {
    try {
      const res = await fetch('/api/user/cdn', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ iconId }),
      });
      if (res.ok) {
        setIcons((prev) =>
          prev.map((i) => (i.id === iconId ? { ...i, cdnSlug: null } : i)),
        );
      }
    } catch (err) {
      console.error('CDN unpublish failed:', err);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-white/70 mb-4">Sign in to view your icon library</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Phase 3: Tab switcher (only shown if user has teams) */}
      {userTeams.length > 0 && (
        <div className="flex gap-1 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('personal')}
            className={`flex-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'personal'
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            My Library
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex-1 px-3 py-1.5 rounded-md text-sm transition-colors ${
              activeTab === 'team'
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white/70'
            }`}
          >
            Team Library
          </button>
        </div>
      )}

      {/* Phase 3: Team library view */}
      {activeTab === 'team' && userTeams.length > 0 ? (
        <div className="space-y-4">
          {userTeams.length > 1 && (
            <select
              value={selectedTeamId ?? ''}
              onChange={(e) => setSelectedTeamId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff88]/50"
            >
              {userTeams.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          )}

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search team icons..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00ff88]/50"
            />
            <span className="text-sm text-white/50">{teamIcons.length} icons</span>
          </div>

          {teamLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-2 border-[#00ff88]/30 border-t-[#00ff88] rounded-full animate-spin" />
            </div>
          ) : teamIcons.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <h3 className="text-lg font-medium text-white mb-2">No team icons yet</h3>
              <p className="text-white/50">Generate icons with team context to populate the team library.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {teamIcons.map((icon) => (
                <div
                  key={icon.id}
                  className="group relative bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#00ff88]/30 transition-colors cursor-pointer"
                  onClick={() => onSelectIcon?.(icon)}
                >
                  <SafeSvgPreview
                    html={sanitizeSvg(icon.svgCode)}
                    className="w-full aspect-square flex items-center justify-center mb-3 [&>svg]:w-full [&>svg]:h-full"
                  />
                  <p className="text-sm text-white truncate">{icon.name}</p>
                  <p className="text-xs text-white/40 mt-1">
                    {new Date(icon.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
      <>
      {/* Collections Bar */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCollectionId(null)}
            className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
              !selectedCollectionId
                ? 'bg-[#00ff88]/20 border border-[#00ff88]/50 text-[#00ff88]'
                : 'bg-white/5 border border-white/10 text-white/60 hover:border-white/20'
            }`}
          >
            All Icons
          </button>
          {collections.map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedCollectionId(col.id)}
              className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                selectedCollectionId === col.id
                  ? 'bg-[#00ff88]/20 border border-[#00ff88]/50 text-[#00ff88]'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:border-white/20'
              }`}
            >
              {col.name}
              <span className="ml-1.5 text-xs opacity-50">{col.iconCount}</span>
            </button>
          ))}
          <button
            onClick={() => setShowNewCollection(true)}
            className="px-3 py-1.5 rounded-lg text-sm whitespace-nowrap bg-white/5 border border-dashed border-white/20 text-white/40 hover:text-white/60 hover:border-white/30"
          >
            + New
          </button>
        </div>

        {/* New Collection Form */}
        {showNewCollection && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Collection name..."
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00ff88]/50 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleCreateCollection()}
              autoFocus
            />
            <button
              onClick={handleCreateCollection}
              disabled={creatingCollection || !newCollectionName.trim()}
              className="px-4 py-2 rounded-lg bg-[#00ff88] text-black font-medium text-sm hover:bg-[#00ff88]/90 disabled:opacity-50"
            >
              {creatingCollection ? '...' : 'Create'}
            </button>
            <button
              onClick={() => { setShowNewCollection(false); setNewCollectionName(''); }}
              className="px-3 py-2 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Export Collection Button (when a collection is selected) */}
        {selectedCollectionId && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40">Export as:</span>
            {(['svg', 'react', 'vue', 'html'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => handleExportCollection(fmt)}
                disabled={exportingCollection}
                className="px-2.5 py-1 rounded-md text-xs bg-white/5 border border-white/10 text-white/50 hover:text-white/70 hover:border-white/20 disabled:opacity-50"
              >
                {exportingCollection ? '...' : fmt.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search your icons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-[#00ff88]/50"
        />
        <span className="text-sm text-white/50">{icons.length} icons</span>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-[#00ff88]/30 border-t-[#00ff88] rounded-full animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && icons.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            {selectedCollectionId ? 'This collection is empty' : 'Your icon library is empty'}
          </h3>
          <p className="text-white/50 mb-6">
            {selectedCollectionId
              ? 'Add icons to this collection from the grid.'
              : 'Generate your first icon to start building your collection.'}
          </p>
        </div>
      )}

      {/* Icon Grid */}
      {!loading && icons.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {icons.map((icon) => (
            <IconCard
              key={icon.id}
              icon={icon}
              collections={collections}
              onSelect={onSelectIcon}
              onEdit={setEditingIcon}
              onDelete={handleDelete}
              addToCollectionIcon={addToCollectionIcon}
              onToggleAddToCollection={(iconId) =>
                setAddToCollectionIcon(addToCollectionIcon === iconId ? null : iconId)
              }
              onAddToCollection={handleAddToCollection}
              cdnSlugInputIcon={cdnSlugInputIcon}
              cdnSlugValue={cdnSlugValue}
              publishingCdn={publishingCdn}
              onToggleCdnInput={(iconId) => {
                setCdnSlugInputIcon(cdnSlugInputIcon === iconId ? null : iconId);
                setCdnSlugValue(
                  icon.name.replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 50),
                );
              }}
              onCdnSlugChange={setCdnSlugValue}
              onPublishCdn={handlePublishCdn}
              onUnpublishCdn={handleUnpublishCdn}
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingIcon && (
        <IconEditModal
          icon={editingIcon}
          onClose={() => setEditingIcon(null)}
          onSave={handleUpdateIcon}
        />
      )}
      </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────
// Icon Card
// ─────────────────────────────────────────────────

interface IconCardProps {
  icon: GeneratedIcon;
  collections: Collection[];
  onSelect?: (icon: GeneratedIcon) => void;
  onEdit: (icon: GeneratedIcon) => void;
  onDelete: (iconId: string) => void;
  addToCollectionIcon: string | null;
  onToggleAddToCollection: (iconId: string) => void;
  onAddToCollection: (iconId: string, collectionId: string) => void;
  cdnSlugInputIcon: string | null;
  cdnSlugValue: string;
  publishingCdn: boolean;
  onToggleCdnInput: (iconId: string) => void;
  onCdnSlugChange: (slug: string) => void;
  onPublishCdn: (iconId: string) => void;
  onUnpublishCdn: (iconId: string) => void;
}

function IconCard({
  icon,
  collections,
  onSelect,
  onEdit,
  onDelete,
  addToCollectionIcon,
  onToggleAddToCollection,
  onAddToCollection,
  cdnSlugInputIcon,
  cdnSlugValue,
  publishingCdn,
  onToggleCdnInput,
  onCdnSlugChange,
  onPublishCdn,
  onUnpublishCdn,
}: IconCardProps) {
  const sanitizedSvg = useMemo(() => sanitizeSvg(icon.svgCode), [icon.svgCode]);

  return (
    <div
      className="group relative bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#00ff88]/30 transition-colors cursor-pointer"
      onClick={() => onSelect?.(icon)}
    >
      <SafeSvgPreview
        html={sanitizedSvg}
        className="w-full aspect-square flex items-center justify-center mb-3 [&>svg]:w-full [&>svg]:h-full"
      />
      <p className="text-sm text-white truncate">{icon.name}</p>
      <p className="text-xs text-white/40 mt-1">
        {new Date(icon.createdAt).toLocaleDateString()}
      </p>

      {/* CDN Badge */}
      {icon.cdnSlug && (
        <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded bg-[#00ff88]/20 text-[#00ff88]">
          CDN
        </span>
      )}

      {!icon.isActive && !icon.cdnSlug && (
        <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
          Read-only
        </span>
      )}

      {/* Hover Actions */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(icon); }}
          className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/70"
          title="Edit"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(icon.componentCode); }}
          className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/70"
          title="Copy code"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleAddToCollection(icon.id); }}
          className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/70"
          title="Add to collection"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (icon.cdnSlug) {
              onUnpublishCdn(icon.id);
            } else {
              onToggleCdnInput(icon.id);
            }
          }}
          className={`p-1.5 rounded-md text-white/70 ${
            icon.cdnSlug
              ? 'bg-[#00ff88]/20 hover:bg-red-500/20 hover:text-red-400'
              : 'bg-white/10 hover:bg-white/20'
          }`}
          title={icon.cdnSlug ? 'Unpublish from CDN' : 'Publish to CDN'}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(icon.id); }}
          className="p-1.5 rounded-md bg-white/10 hover:bg-red-500/30 text-white/70 hover:text-red-400"
          title="Delete"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      {/* Add-to-Collection Dropdown */}
      {addToCollectionIcon === icon.id && (
        <div
          className="absolute z-10 top-10 right-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl p-1"
          onClick={(e) => e.stopPropagation()}
        >
          {collections.length === 0 ? (
            <p className="px-3 py-2 text-xs text-white/40">No collections yet</p>
          ) : (
            collections.map((col) => (
              <button
                key={col.id}
                onClick={() => onAddToCollection(icon.id, col.id)}
                className="w-full text-left px-3 py-2 text-sm text-white/70 hover:bg-white/10 rounded-md"
              >
                {col.name}
              </button>
            ))
          )}
        </div>
      )}

      {/* CDN Slug Input */}
      {cdnSlugInputIcon === icon.id && (
        <div
          className="absolute z-10 top-10 right-2 w-56 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl p-3 space-y-2"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-xs text-white/50">CDN slug (lowercase, hyphens)</p>
          <input
            type="text"
            value={cdnSlugValue}
            onChange={(e) => onCdnSlugChange(e.target.value.replace(/[^a-z0-9-]/g, ''))}
            className="w-full px-2 py-1.5 rounded-md bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#00ff88]/50"
            placeholder="my-icon-slug"
          />
          <button
            onClick={() => onPublishCdn(icon.id)}
            disabled={publishingCdn || !cdnSlugValue.trim()}
            className="w-full py-1.5 rounded-md bg-[#00ff88] text-black font-medium text-xs hover:bg-[#00ff88]/90 disabled:opacity-50"
          >
            {publishingCdn ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────
// Icon Edit Modal
// ─────────────────────────────────────────────────

interface IconEditModalProps {
  icon: GeneratedIcon;
  onClose: () => void;
  onSave: (iconId: string, updates: Partial<GeneratedIcon>) => Promise<void>;
}

function IconEditModal({ icon, onClose, onSave }: IconEditModalProps) {
  const [name, setName] = useState(icon.name);
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(icon.tags ?? []);
  const [animation, setAnimation] = useState(icon.animation);
  const [trigger, setTrigger] = useState(icon.trigger);
  const [color, setColor] = useState(icon.color ?? '#ffffff');
  const [saving, setSaving] = useState(false);

  const sanitizedSvg = useMemo(() => sanitizeSvg(icon.svgCode), [icon.svgCode]);

  const animations = [
    'scale', 'rotate', 'translate', 'shake', 'pulse', 'bounce',
    'draw', 'spin', 'ring', 'wiggle', 'heartbeat', 'swing', 'float', 'none',
  ];
  const triggers = ['hover', 'loop', 'mount', 'inView'];

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(icon.id, { name, tags, animation, trigger, color });
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white">Edit Icon</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <SafeSvgPreview
            html={sanitizedSvg}
            className="w-24 h-24 flex items-center justify-center bg-white/5 rounded-xl [&>svg]:w-16 [&>svg]:h-16"
            style={{ color }}
          />
        </div>

        <label className="block mb-4">
          <span className="text-sm text-white/60 mb-1 block">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00ff88]/50"
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-white/60 mb-1 block">Tags</span>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 text-sm text-white/80">
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="text-white/40 hover:text-white">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Add tag..."
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00ff88]/50"
            />
            <button onClick={handleAddTag} className="px-3 py-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20">
              Add
            </button>
          </div>
        </label>

        <label className="block mb-4">
          <span className="text-sm text-white/60 mb-1 block">Animation</span>
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00ff88]/50"
          >
            {animations.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-sm text-white/60 mb-1 block">Trigger</span>
          <select
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00ff88]/50"
          >
            {triggers.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label className="block mb-6">
          <span className="text-sm text-white/60 mb-1 block">Color</span>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded-lg border border-white/10 cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00ff88]/50 font-mono text-sm"
            />
          </div>
        </label>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white/70 hover:bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-2.5 rounded-lg bg-[#00ff88] text-black font-medium hover:bg-[#00ff88]/90 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
