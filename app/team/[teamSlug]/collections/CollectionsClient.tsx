'use client';

import { useState, useEffect, useCallback } from 'react';
import { ShareCollectionModal } from '../../components/ShareCollectionModal';

interface Collection {
  id: string;
  name: string;
  description: string | null;
  iconCount: number;
  createdAt: string;
}

interface CollectionsClientProps {
  teamId: string;
  role: string;
}

export function CollectionsClient({ teamId, role }: CollectionsClientProps) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [shareCollectionId, setShareCollectionId] = useState<string | null>(null);
  const isEditor = role === 'admin' || role === 'editor';

  const fetchCollections = useCallback(async () => {
    try {
      const res = await fetch(`/api/teams/${teamId}/collections`);
      const data = await res.json();
      if (res.ok) setCollections(data.collections);
    } catch {} finally {
      setLoading(false);
    }
  }, [teamId]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);

    try {
      const res = await fetch(`/api/teams/${teamId}/collections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      });
      if (res.ok) {
        setNewName('');
        setShowCreate(false);
        fetchCollections();
      }
    } catch {} finally {
      setCreating(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Collections</h1>
          <p className="text-sm text-zinc-500 mt-1">{collections.length} collection{collections.length !== 1 ? 's' : ''}</p>
        </div>
        {isEditor && (
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-green-500 text-black text-sm font-medium rounded-lg hover:bg-green-400 transition-colors"
          >
            New Collection
          </button>
        )}
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} className="flex gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Collection name"
            autoFocus
            className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
          />
          <button
            type="submit"
            disabled={creating}
            className="px-4 py-2 bg-green-500 text-black text-sm font-medium rounded-lg hover:bg-green-400 disabled:opacity-50 transition-colors"
          >
            {creating ? 'Creating...' : 'Create'}
          </button>
          <button
            type="button"
            onClick={() => setShowCreate(false)}
            className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">
          Loading...
        </div>
      ) : collections.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">
          No collections yet
        </div>
      ) : (
        <div className="space-y-2">
          {collections.map((col) => (
            <div
              key={col.id}
              className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="text-sm font-medium text-white">{col.name}</div>
                {col.description && (
                  <div className="text-xs text-zinc-500 mt-0.5">{col.description}</div>
                )}
                <div className="text-xs text-zinc-600 mt-1">
                  {col.iconCount} icon{col.iconCount !== 1 ? 's' : ''}
                </div>
              </div>
              {isEditor && (
                <button
                  onClick={() => setShareCollectionId(col.id)}
                  className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white border border-zinc-700 rounded-lg hover:border-zinc-600 transition-colors"
                >
                  Share
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {shareCollectionId && (
        <ShareCollectionModal
          collectionId={shareCollectionId}
          open={true}
          onClose={() => setShareCollectionId(null)}
        />
      )}
    </div>
  );
}
