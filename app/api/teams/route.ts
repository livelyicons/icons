import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { getSubscription } from '@/lib/subscription';
import { getTeamsForUser } from '@/lib/team-auth';
import { db, teams, teamMembers } from '@/db';

const slugRegex = /^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/;

const createSchema = z.object({
  name: z.string().min(1).max(255),
  slug: z.string().min(3).max(50).regex(slugRegex, {
    message: 'Slug must be 3-50 chars, lowercase alphanumeric and hyphens, cannot start/end with hyphen.',
  }),
});

/**
 * GET /api/teams
 * List all teams the current user belongs to.
 */
export async function GET() {
  try {
    const userId = await requireAuth();
    const userTeams = await getTeamsForUser(userId);
    return NextResponse.json({ teams: userTeams });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Teams list error:', error);
    return NextResponse.json({ error: 'Failed to list teams' }, { status: 500 });
  }
}

/**
 * POST /api/teams
 * Create a new team. Requires an active Team plan subscription.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth();

    // Verify Team plan subscription
    const sub = await getSubscription(userId);
    if (!sub || sub.planType !== 'team' || sub.status !== 'active') {
      return NextResponse.json(
        { error: 'A Team plan subscription is required to create a team.' },
        { status: 403 },
      );
    }

    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { name, slug } = parsed.data;

    // Check slug uniqueness
    const [existingSlug] = await db
      .select({ id: teams.id })
      .from(teams)
      .where(eq(teams.slug, slug))
      .limit(1);

    if (existingSlug) {
      return NextResponse.json(
        { error: 'This team URL is already taken. Please choose another.' },
        { status: 409 },
      );
    }

    // Create team + auto-add owner as admin in a transaction-like flow
    const [team] = await db
      .insert(teams)
      .values({
        name,
        slug,
        ownerClerkUserId: userId,
      })
      .returning();

    await db.insert(teamMembers).values({
      teamId: team.id,
      clerkUserId: userId,
      role: 'admin',
    });

    return NextResponse.json({ team }, { status: 201 });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Team create error:', error);
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}
