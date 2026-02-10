'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CreateTeamClient() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleNameChange(value: string) {
    setName(value);
    if (autoSlug) {
      setSlug(
        value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .slice(0, 50),
      );
    }
  }

  function handleSlugChange(value: string) {
    setAutoSlug(false);
    setSlug(value.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 50));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create team');
        return;
      }

      router.push(`/team/${data.team.slug}`);
    } catch {
      setError('Failed to create team');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold text-white mb-2">Create a team</h1>
        <p className="text-sm text-zinc-400 mb-8">
          Set up a shared workspace for your team to collaborate on icon generation.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Team name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Acme Design"
              required
              maxLength={255}
              className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Team URL</label>
            <div className="flex items-center gap-0">
              <span className="px-3 py-2 bg-zinc-800 border border-r-0 border-zinc-700 rounded-l-lg text-sm text-zinc-500">
                livelyicons.com/team/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                placeholder="acme-design"
                required
                minLength={3}
                maxLength={50}
                pattern="[a-z0-9][a-z0-9-]{1,48}[a-z0-9]"
                className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-r-lg text-white text-sm focus:outline-none focus:border-green-500"
              />
            </div>
            <p className="text-xs text-zinc-600 mt-1">
              Lowercase letters, numbers, and hyphens only
            </p>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading || !name || !slug}
            className="w-full px-4 py-2.5 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Creating...' : 'Create Team'}
          </button>
        </form>
      </div>
    </div>
  );
}
