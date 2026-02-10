'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Team {
  id: string;
  name: string;
  slug: string;
  ownerClerkUserId: string;
  slackWebhookUrl: string | null;
  slackChannelName: string | null;
}

interface SettingsClientProps {
  team: Team;
  isOwner: boolean;
}

export function SettingsClient({ team, isOwner }: SettingsClientProps) {
  const router = useRouter();
  const [name, setName] = useState(team.name);
  const [slug, setSlug] = useState(team.slug);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');

  // Slack integration
  const [slackUrl, setSlackUrl] = useState(team.slackWebhookUrl ?? '');
  const [slackChannel, setSlackChannel] = useState(team.slackChannelName ?? '');
  const [savingSlack, setSavingSlack] = useState(false);
  const [slackError, setSlackError] = useState('');
  const [slackSuccess, setSlackSuccess] = useState('');
  const [testingSlack, setTestingSlack] = useState(false);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`/api/teams/${team.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, slug }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to update team');
        return;
      }

      setSuccess('Team settings updated');
      if (data.team.slug !== team.slug) {
        router.replace(`/team/${data.team.slug}/settings`);
      }
    } catch {
      setError('Failed to update team');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (confirmDelete !== team.name) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/teams/${team.id}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/team');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to delete team');
      }
    } catch {
      setError('Failed to delete team');
    } finally {
      setDeleting(false);
    }
  }

  async function handleSaveSlack(e: React.FormEvent) {
    e.preventDefault();
    setSavingSlack(true);
    setSlackError('');
    setSlackSuccess('');

    try {
      if (!slackUrl.trim()) {
        // Remove Slack config
        const res = await fetch(`/api/teams/${team.id}/integrations/slack`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setSlackSuccess('Slack integration removed');
        } else {
          setSlackError('Failed to remove Slack integration');
        }
      } else {
        const res = await fetch(`/api/teams/${team.id}/integrations/slack`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            webhookUrl: slackUrl.trim(),
            channelName: slackChannel.trim() || undefined,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          setSlackError(data.error || data.reason || 'Failed to save Slack settings');
          return;
        }
        setSlackSuccess('Slack integration configured');
      }
    } catch {
      setSlackError('Failed to save Slack settings');
    } finally {
      setSavingSlack(false);
    }
  }

  async function handleTestSlack() {
    setTestingSlack(true);
    setSlackError('');
    setSlackSuccess('');

    try {
      const res = await fetch(`/api/teams/${team.id}/integrations/slack/test`, {
        method: 'POST',
      });

      const data = await res.json();
      if (!res.ok) {
        setSlackError(data.error || 'Test message failed');
        return;
      }
      setSlackSuccess('Test message sent to Slack');
    } catch {
      setSlackError('Failed to send test message');
    } finally {
      setTestingSlack(false);
    }
  }

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your team settings</p>
      </div>

      <form onSubmit={handleSave} className="space-y-5 bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Team name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={255}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Team URL slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            required
            minLength={3}
            maxLength={50}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {success && <p className="text-sm text-green-400">{success}</p>}

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-green-500 text-black text-sm font-medium rounded-lg hover:bg-green-400 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      {/* Slack Integration */}
      <form onSubmit={handleSaveSlack} className="space-y-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5">
        <div>
          <h2 className="text-sm font-medium text-white">Slack Integration</h2>
          <p className="text-xs text-zinc-500 mt-1">
            Get notified in Slack when team members generate icons.
          </p>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Webhook URL</label>
          <input
            type="url"
            value={slackUrl}
            onChange={(e) => setSlackUrl(e.target.value)}
            placeholder="https://hooks.slack.com/services/..."
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">Channel (optional)</label>
          <input
            type="text"
            value={slackChannel}
            onChange={(e) => setSlackChannel(e.target.value)}
            placeholder="#design-team"
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-green-500"
          />
        </div>

        {slackError && <p className="text-sm text-red-400">{slackError}</p>}
        {slackSuccess && <p className="text-sm text-green-400">{slackSuccess}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={savingSlack}
            className="px-4 py-2 bg-green-500 text-black text-sm font-medium rounded-lg hover:bg-green-400 disabled:opacity-50 transition-colors"
          >
            {savingSlack ? 'Saving...' : slackUrl ? 'Save Slack Config' : 'Remove Slack'}
          </button>
          {team.slackWebhookUrl && (
            <button
              type="button"
              onClick={handleTestSlack}
              disabled={testingSlack}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 rounded-lg hover:border-zinc-600 disabled:opacity-50 transition-colors"
            >
              {testingSlack ? 'Sending...' : 'Send Test'}
            </button>
          )}
        </div>
      </form>

      {isOwner && (
        <div className="bg-zinc-900 border border-red-900/50 rounded-xl p-5 space-y-4">
          <div>
            <h2 className="text-sm font-medium text-red-400">Danger Zone</h2>
            <p className="text-xs text-zinc-500 mt-1">
              Permanently delete this team and all associated data. This action cannot be undone.
            </p>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">
              Type <span className="text-red-400 font-medium">{team.name}</span> to confirm
            </label>
            <input
              type="text"
              value={confirmDelete}
              onChange={(e) => setConfirmDelete(e.target.value)}
              placeholder={team.name}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-red-500"
            />
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting || confirmDelete !== team.name}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-500 disabled:opacity-50 transition-colors"
          >
            {deleting ? 'Deleting...' : 'Delete Team'}
          </button>
        </div>
      )}
    </div>
  );
}
