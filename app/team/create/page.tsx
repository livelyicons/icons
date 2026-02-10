import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { CreateTeamClient } from './CreateTeamClient';

export default async function CreateTeamPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  return <CreateTeamClient />;
}
