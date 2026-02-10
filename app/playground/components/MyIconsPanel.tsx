'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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

interface MyIconsPanelProps {
  onSelectIcon?: (icon: GeneratedIcon) => void;
}

export function MyIconsPanel({ onSelectIcon }: MyIconsPanelProps) {
  const { isSignedIn } = useUser();
  const [icons, setIcons] = useState<GeneratedIcon[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [editingIcon, setEditingIcon] = useState<GeneratedIcon | null>(null);

  const fetchIcons = useCallback(async () => {
    if (!isSignedIn) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
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
  }, [isSignedIn, search]);

  useEffect(() => {
    fetchIcons();
  }, [fetchIcons]);

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

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-white/70 mb-4">Sign in to view your icon library</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
          <h3 className="text-lg font-medium text-white mb-2">Your icon library is empty</h3>
          <p className="text-white/50 mb-6">Generate your first icon to start building your collection.</p>
        </div>
      )}

      {/* Icon Grid */}
      {!loading && icons.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {icons.map((icon) => (
            <IconCard
              key={icon.id}
              icon={icon}
              onSelect={onSelectIcon}
              onEdit={setEditingIcon}
              onDelete={handleDelete}
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
    </div>
  );
}

// ─────────────────────────────────────────────────
// Icon Card
// ─────────────────────────────────────────────────

interface IconCardProps {
  icon: GeneratedIcon;
  onSelect?: (icon: GeneratedIcon) => void;
  onEdit: (icon: GeneratedIcon) => void;
  onDelete: (iconId: string) => void;
}

function IconCard({ icon, onSelect, onEdit, onDelete }: IconCardProps) {
  const sanitizedSvg = useMemo(() => sanitizeSvg(icon.svgCode), [icon.svgCode]);

  return (
    <div
      className="group relative bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#00ff88]/30 transition-colors cursor-pointer"
      onClick={() => onSelect?.(icon)}
    >
      <div
        className="w-full aspect-square flex items-center justify-center mb-3 [&>svg]:w-full [&>svg]:h-full"
        dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
      />
      <p className="text-sm text-white truncate">{icon.name}</p>
      <p className="text-xs text-white/40 mt-1">
        {new Date(icon.createdAt).toLocaleDateString()}
      </p>

      {!icon.isActive && (
        <span className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
          Read-only
        </span>
      )}

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
          onClick={(e) => { e.stopPropagation(); onDelete(icon.id); }}
          className="p-1.5 rounded-md bg-white/10 hover:bg-red-500/30 text-white/70 hover:text-red-400"
          title="Delete"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
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
          <div
            className="w-24 h-24 flex items-center justify-center bg-white/5 rounded-xl [&>svg]:w-16 [&>svg]:h-16"
            style={{ color }}
            dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
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
