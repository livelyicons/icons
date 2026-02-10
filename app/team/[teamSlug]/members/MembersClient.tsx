'use client';

import { useState, useCallback } from 'react';
import { MemberList } from '../../components/MemberList';
import { InviteModal } from '../../components/InviteModal';

interface Member {
  id: string;
  clerkUserId: string;
  role: string;
  name: string | null;
  email: string | null;
  imageUrl: string | null;
  joinedAt: string;
}

interface MembersClientProps {
  teamId: string;
  currentUserId: string;
  ownerUserId: string;
  role: string;
  initialMembers: Member[];
}

export function MembersClient({
  teamId,
  currentUserId,
  ownerUserId,
  role,
  initialMembers,
}: MembersClientProps) {
  const [members, setMembers] = useState(initialMembers);
  const [showInvite, setShowInvite] = useState(false);
  const isAdmin = role === 'admin';

  const refreshMembers = useCallback(async () => {
    try {
      const res = await fetch(`/api/teams/${teamId}/members`);
      const data = await res.json();
      if (res.ok) setMembers(data.members);
    } catch {}
  }, [teamId]);

  async function handleRoleChange(memberId: string, newRole: string) {
    try {
      const res = await fetch(`/api/teams/${teamId}/members/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) refreshMembers();
    } catch {}
  }

  async function handleRemove(memberId: string) {
    const member = members.find((m) => m.id === memberId);
    const isSelf = member?.clerkUserId === currentUserId;
    const confirmMsg = isSelf
      ? 'Are you sure you want to leave this team?'
      : `Remove ${member?.name ?? member?.email ?? 'this member'} from the team?`;

    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch(`/api/teams/${teamId}/members/${memberId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        if (isSelf) {
          window.location.href = '/team';
        } else {
          refreshMembers();
        }
      }
    } catch {}
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Members</h1>
          <p className="text-sm text-zinc-500 mt-1">{members.length} member{members.length !== 1 ? 's' : ''}</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowInvite(true)}
            className="px-4 py-2 bg-green-500 text-black text-sm font-medium rounded-lg hover:bg-green-400 transition-colors"
          >
            Invite Member
          </button>
        )}
      </div>

      <MemberList
        members={members}
        currentUserId={currentUserId}
        ownerUserId={ownerUserId}
        isAdmin={isAdmin}
        onRoleChange={handleRoleChange}
        onRemove={handleRemove}
      />

      <InviteModal
        teamId={teamId}
        open={showInvite}
        onClose={() => setShowInvite(false)}
        onInvited={refreshMembers}
      />
    </div>
  );
}
