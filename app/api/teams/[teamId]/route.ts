import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { eq, sql } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember, isTeamOwner } from '@/lib/team-auth';
import { db, teams, teamMembers, generatedIcons } from '@/db';

const slugRegex = /^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/;

const updateSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  slug: z.string().min(3).max(50).regex(slugRegex, {
    message: 'Slug must be 3-50 chars, lowercase alphanumeric and hyphens.',
  }).optional(),
  avatarUrl: z.string().url().optional().nullable(),
});

type RouteParams = { params: Promise<{ teamId: string }> };

/**
 * GET /api/teams/[teamId]
 * Get team details with member count and stats.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;

    await requireTeamMember(teamId, userId);

    const [team] = await db
      .select()
      .from(teams)
      .where(eq(teams.id, teamId))
      .limit(1);

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    const [memberCount] = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(teamMembers)
      .where(eq(teamMembers.teamId, teamId));

    const [iconCount] = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(generatedIcons)
      .where(eq(generatedIcons.teamId, teamId));

    return NextResponse.json({
      team,
      stats: {
        memberCount: memberCount.count,
        iconCount: iconCount.count,
      },
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Team get error:', error);
    return NextResponse.json({ error: 'Failed to get team' }, { status: 500 });
  }
}

/**
 * PUT /api/teams/[teamId]
 * Update team settings. Admin only.
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;

    await requireTeamMember(teamId, userId, 'admin');

    const body = await request.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const updates: Record<string, unknown> = { updatedAt: new Date() };
    if (parsed.data.name !== undefined) updates.name = parsed.data.name;
    if (parsed.data.avatarUrl !== undefined) updates.avatarUrl = parsed.data.avatarUrl;

    if (parsed.data.slug !== undefined) {
      // Check slug uniqueness
      const [existing] = await db
        .select({ id: teams.id })
        .from(teams)
        .where(eq(teams.slug, parsed.data.slug))
        .limit(1);

      if (existing && existing.id !== teamId) {
        return NextResponse.json(
          { error: 'This team URL is already taken.' },
          { status: 409 },
        );
      }
      updates.slug = parsed.data.slug;
    }

    const [updated] = await db
      .update(teams)
      .set(updates)
      .where(eq(teams.id, teamId))
      .returning();

    return NextResponse.json({ team: updated });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Team update error:', error);
    return NextResponse.json({ error: 'Failed to update team' }, { status: 500 });
  }
}

/**
 * DELETE /api/teams/[teamId]
 * Delete a team. Owner only.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;

    const ownerCheck = await isTeamOwner(teamId, userId);
    if (!ownerCheck) {
      return NextResponse.json(
        { error: 'Only the team owner can delete a team.' },
        { status: 403 },
      );
    }

    await db.delete(teams).where(eq(teams.id, teamId));

    return NextResponse.json({ deleted: true });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Team delete error:', error);
    return NextResponse.json({ error: 'Failed to delete team' }, { status: 500 });
  }
}
