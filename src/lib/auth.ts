import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

/**
 * Get the current authenticated user's Clerk ID.
 * Throws a 401 response if not authenticated.
 */
export async function requireAuth(): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    throw new NextResponse(
      JSON.stringify({ error: 'Unauthorized', message: 'Please sign in to continue.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }

  return userId;
}

/**
 * Get the current user's Clerk ID if authenticated, or null.
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}

/**
 * Get full Clerk user object for the current session.
 */
export async function getCurrentUser() {
  return currentUser();
}
