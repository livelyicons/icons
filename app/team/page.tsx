import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { getTeamsForUser } from '@/lib/team-auth';
import Link from 'next/link';

export default async function TeamHubPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const userTeams = await getTeamsForUser(userId);

  if (userTeams.length > 0) {
    redirect(`/team/${userTeams[0].slug}`);
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">Create your team</h1>
        <p className="text-zinc-400 text-sm">
          Collaborate with your team on icon generation. Share libraries, manage tokens, and work together in real-time.
        </p>
        <Link
          href="/team/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-black font-medium rounded-lg hover:bg-green-400 transition-colors"
        >
          Create Team
        </Link>
        <p className="text-xs text-zinc-600">
          Requires a Team plan subscription
        </p>
      </div>
    </div>
  );
}
