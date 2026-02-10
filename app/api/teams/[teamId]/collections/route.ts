import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { eq, desc } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember } from '@/lib/team-auth';
import { db, collections } from '@/db';

const createSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
});

type RouteParams = { params: Promise<{ teamId: string }> };

/**
 * GET /api/teams/[teamId]/collections
 * List team collections.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;

    await requireTeamMember(teamId, userId);

    const teamCollections = await db
      .select()
      .from(collections)
      .where(eq(collections.teamId, teamId))
      .orderBy(desc(collections.createdAt));

    return NextResponse.json({ collections: teamCollections });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Team collections error:', error);
    return NextResponse.json({ error: 'Failed to list team collections' }, { status: 500 });
  }
}

/**
 * POST /api/teams/[teamId]/collections
 * Create a team collection. Editor+ role required.
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;

    await requireTeamMember(teamId, userId, 'editor');

    const body = await request.json();
    const parsed = createSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const [collection] = await db
      .insert(collections)
      .values({
        clerkUserId: userId,
        teamId,
        name: parsed.data.name,
        description: parsed.data.description ?? null,
      })
      .returning();

    return NextResponse.json({ collection }, { status: 201 });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Team collection create error:', error);
    return NextResponse.json({ error: 'Failed to create team collection' }, { status: 500 });
  }
}
