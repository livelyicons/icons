import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { db, generatedIcons } from '@/db';
import { eq, and, isNull, desc, ilike, or } from 'drizzle-orm';
import type { IconStyle } from '@/db/schema';

/**
 * GET /api/user/library
 * List user's generated icons with optional filtering.
 */
export async function GET(request: NextRequest) {
  try {
    const userId = await requireAuth();
    const { searchParams } = new URL(request.url);

    const search = searchParams.get('search');
    const style = searchParams.get('style');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0', 10);

    const conditions = [
      eq(generatedIcons.clerkUserId, userId),
      isNull(generatedIcons.deletedAt),
    ];

    if (style) {
      conditions.push(eq(generatedIcons.style, style as IconStyle));
    }

    if (search) {
      conditions.push(
        or(
          ilike(generatedIcons.name, `%${search}%`),
          ilike(generatedIcons.prompt, `%${search}%`),
        )!,
      );
    }

    const icons = await db
      .select({
        id: generatedIcons.id,
        name: generatedIcons.name,
        prompt: generatedIcons.prompt,
        style: generatedIcons.style,
        animation: generatedIcons.animation,
        trigger: generatedIcons.trigger,
        svgCode: generatedIcons.svgCode,
        componentCode: generatedIcons.componentCode,
        previewUrl: generatedIcons.previewUrl,
        tags: generatedIcons.tags,
        color: generatedIcons.color,
        strokeWeight: generatedIcons.strokeWeight,
        duration: generatedIcons.duration,
        isActive: generatedIcons.isActive,
        createdAt: generatedIcons.createdAt,
        updatedAt: generatedIcons.updatedAt,
      })
      .from(generatedIcons)
      .where(and(...conditions))
      .orderBy(desc(generatedIcons.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ icons, count: icons.length });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Library list error:', error);
    return NextResponse.json({ error: 'Failed to load library' }, { status: 500 });
  }
}
