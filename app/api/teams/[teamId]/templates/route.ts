import { NextRequest, NextResponse } from 'next/server';
import { eq, and, desc } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember } from '@/lib/team-auth';
import { db, styleTemplates } from '@/db';

type RouteParams = { params: Promise<{ teamId: string }> };

/**
 * GET /api/teams/[teamId]/templates
 * List shared team templates.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;

    await requireTeamMember(teamId, userId);

    const templates = await db
      .select()
      .from(styleTemplates)
      .where(
        and(
          eq(styleTemplates.teamId, teamId),
          eq(styleTemplates.isShared, true),
        ),
      )
      .orderBy(desc(styleTemplates.createdAt));

    return NextResponse.json({ templates });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Team templates error:', error);
    return NextResponse.json({ error: 'Failed to list team templates' }, { status: 500 });
  }
}
