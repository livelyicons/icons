'use client';

import { RoleBadge } from './RoleBadge';

interface Member {
  id: string;
  clerkUserId: string;
  role: string;
  name: string | null;
  email: string | null;
  imageUrl: string | null;
  joinedAt: string;
}

interface MemberListProps {
  members: Member[];
  currentUserId: string;
  ownerUserId: string;
  isAdmin: boolean;
  onRoleChange: (memberId: string, newRole: string) => void;
  onRemove: (memberId: string) => void;
}

export function MemberList({
  members,
  currentUserId,
  ownerUserId,
  isAdmin,
  onRoleChange,
  onRemove,
}: MemberListProps) {
  return (
    <div className="space-y-2">
      {members.map((member) => {
        const isOwner = member.clerkUserId === ownerUserId;
        const isSelf = member.clerkUserId === currentUserId;

        return (
          <div
            key={member.id}
            className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {member.imageUrl ? (
                <img
                  src={member.imageUrl}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-zinc-300">
                  {(member.name?.[0] ?? member.email?.[0] ?? '?').toUpperCase()}
                </div>
              )}
              <div>
                <div className="text-sm text-white">
                  {member.name ?? member.email ?? 'Unknown'}
                  {isSelf && <span className="text-xs text-zinc-500 ml-1">(you)</span>}
                </div>
                {member.email && member.name && (
                  <div className="text-xs text-zinc-500">{member.email}</div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RoleBadge role={isOwner ? 'owner' : member.role} />
              {isAdmin && !isOwner && !isSelf && (
                <>
                  <select
                    value={member.role}
                    onChange={(e) => onRoleChange(member.id, e.target.value)}
                    className="bg-zinc-800 border border-zinc-700 rounded text-xs text-zinc-300 px-1.5 py-0.5"
                  >
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <button
                    onClick={() => onRemove(member.id)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Remove
                  </button>
                </>
              )}
              {!isAdmin && isSelf && !isOwner && (
                <button
                  onClick={() => onRemove(member.id)}
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Leave
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
