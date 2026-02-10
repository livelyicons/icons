import { NextRequest, NextResponse } from 'next/server';
import { eq, and, isNull, desc, ilike, sql } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember } from '@/lib/team-auth';
import { db, generatedIcons } from '@/db';
import type { IconStyle } from '@/db/schema';

type RouteParams = { params: Promise<{ teamId: string }> };

/**
 * GET /api/teams/[teamId]/library
 * List team icons with search, style filter, pagination, and createdBy filter.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;

    await requireTeamMember(teamId, userId);

    const url = new URL(request.url);
    const search = url.searchParams.get('search') ?? '';
    const style = url.searchParams.get('style');
    const createdBy = url.searchParams.get('createdBy');
    const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') ?? '50', 10)));
    const offset = (page - 1) * limit;

    const conditions = [
      eq(generatedIcons.teamId, teamId),
      isNull(generatedIcons.deletedAt),
    ];

    if (search) {
      conditions.push(ilike(generatedIcons.name, `%${search}%`));
    }
    if (style) {
      conditions.push(eq(generatedIcons.style, style as IconStyle));
    }
    if (createdBy) {
      conditions.push(eq(generatedIcons.clerkUserId, createdBy));
    }

    const [icons, [countResult]] = await Promise.all([
      db
        .select()
        .from(generatedIcons)
        .where(and(...conditions))
        .orderBy(desc(generatedIcons.createdAt))
        .limit(limit)
        .offset(offset),
      db
        .select({ count: sql<number>`COUNT(*)::int` })
        .from(generatedIcons)
        .where(and(...conditions)),
    ]);

    return NextResponse.json({
      icons,
      pagination: {
        page,
        limit,
        total: countResult.count,
        totalPages: Math.ceil(countResult.count / limit),
      },
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Team library error:', error);
    return NextResponse.json({ error: 'Failed to list team icons' }, { status: 500 });
  }
}
