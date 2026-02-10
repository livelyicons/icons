import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { requireAuth } from '@/lib/auth';
import { requireTeamMember } from '@/lib/team-auth';
import { db, generatedIcons } from '@/db';

interface RouteParams {
  params: Promise<{ teamId: string }>;
}

/**
 * GET /api/teams/:teamId/figma
 * List team icons in a Figma-compatible format (SVG code + metadata).
 * Viewer+ access.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { teamId } = await params;
    await requireTeamMember(teamId, userId, 'viewer');

    const icons = await db
      .select({
        id: generatedIcons.id,
        name: generatedIcons.name,
        svgCode: generatedIcons.svgCode,
        style: generatedIcons.style,
        animation: generatedIcons.animation,
        trigger: generatedIcons.trigger,
        tags: generatedIcons.tags,
        createdAt: generatedIcons.createdAt,
      })
      .from(generatedIcons)
      .where(eq(generatedIcons.teamId, teamId))
      .orderBy(generatedIcons.createdAt);

    // Return in a format that Figma plugins can consume directly
    const figmaIcons = icons.map((icon) => ({
      id: icon.id,
      name: icon.name,
      svg: icon.svgCode,
      metadata: {
        style: icon.style,
        animation: icon.animation,
        trigger: icon.trigger,
        tags: icon.tags ?? [],
        createdAt: icon.createdAt.toISOString(),
      },
    }));

    return NextResponse.json({
      version: 1,
      teamId,
      iconCount: figmaIcons.length,
      icons: figmaIcons,
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Figma API error:', error);
    return NextResponse.json({ error: 'Failed to fetch team icons' }, { status: 500 });
  }
}
