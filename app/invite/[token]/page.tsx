import { InviteAcceptClient } from './InviteAcceptClient';

interface PageProps {
  params: Promise<{ token: string }>;
}

async function getInviteInfo(token: string) {
  // Fetch invitation info from the public API endpoint
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/invitations/${token}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function InviteAcceptPage({ params }: PageProps) {
  const { token } = await params;
  const invite = await getInviteInfo(token);

  if (!invite) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold text-white">Invitation Not Found</h1>
          <p className="text-sm text-zinc-400">
            This invitation link is invalid or has been revoked.
          </p>
        </div>
      </div>
    );
  }

  return <InviteAcceptClient token={token} invite={invite} />;
}
