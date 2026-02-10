'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignInButton } from '@clerk/nextjs';

interface InviteInfo {
  teamName: string;
  role: string;
  invitedBy: string | null;
  expiresAt: string;
}

interface InviteAcceptClientProps {
  token: string;
  invite: InviteInfo;
}

export function InviteAcceptClient({ token, invite }: InviteAcceptClientProps) {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState('');

  async function handleAccept() {
    setAccepting(true);
    setError('');

    try {
      const res = await fetch('/api/invitations/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to accept invitation');
        return;
      }

      router.push('/team');
    } catch {
      setError('Failed to accept invitation');
    } finally {
      setAccepting(false);
    }
  }

  const expired = new Date(invite.expiresAt) < new Date();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">
            Join {invite.teamName}
          </h1>
          {invite.invitedBy && (
            <p className="text-sm text-zinc-400 mt-2">
              {invite.invitedBy} invited you to join as{' '}
              <span className="text-zinc-300">{invite.role}</span>
            </p>
          )}
        </div>

        {expired ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-sm text-red-400">This invitation has expired.</p>
          </div>
        ) : isSignedIn ? (
          <div className="space-y-3">
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              onClick={handleAccept}
              disabled={accepting}
              className="w-full px-6 py-3 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 disabled:opacity-50 transition-colors"
            >
              {accepting ? 'Joining...' : 'Accept Invitation'}
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-zinc-400">Sign in to accept this invitation</p>
            <SignInButton mode="modal">
              <button className="w-full px-6 py-3 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 transition-colors">
                Sign In to Join
              </button>
            </SignInButton>
          </div>
        )}

        <p className="text-xs text-zinc-600">
          {!expired && `Expires ${new Date(invite.expiresAt).toLocaleDateString()}`}
        </p>
      </div>
    </div>
  );
}
