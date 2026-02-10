'use client';

import { useState } from 'react';

interface ShareCollectionModalProps {
  collectionId: string;
  open: boolean;
  onClose: () => void;
}

export function ShareCollectionModal({ collectionId, open, onClose }: ShareCollectionModalProps) {
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  async function handleShare() {
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/user/collections/${collectionId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password || undefined }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to share collection');
        return;
      }

      setShareUrl(data.shareUrl);
    } catch {
      setError('Failed to share collection');
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-4">Share Collection</h3>

        {shareUrl ? (
          <div className="space-y-3">
            <p className="text-sm text-zinc-400">Your collection is now public!</p>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-green-500 text-black text-sm font-medium rounded-lg hover:bg-green-400 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Password protection (optional)</label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank for no password"
                className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleShare}
                disabled={loading}
                className="px-4 py-2 bg-green-500 text-black text-sm font-medium rounded-lg hover:bg-green-400 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Creating...' : 'Create Share Link'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
