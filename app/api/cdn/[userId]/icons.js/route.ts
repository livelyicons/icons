import { NextRequest, NextResponse } from 'next/server';
import { db, generatedIcons } from '@/db';
import { eq, and, isNull, isNotNull } from 'drizzle-orm';
import { buildCdnBundle } from '@/lib/cdn';

/**
 * GET /api/cdn/:userId/icons.js
 * Serve a dynamic JS bundle with the user's published CDN icons.
 * Public endpoint (no auth required for embedding).
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;

    const icons = await db
      .select({
        cdnSlug: generatedIcons.cdnSlug,
        svgCode: generatedIcons.svgCode,
        animation: generatedIcons.animation,
        trigger: generatedIcons.trigger,
        duration: generatedIcons.duration,
      })
      .from(generatedIcons)
      .where(
        and(
          eq(generatedIcons.clerkUserId, userId),
          isNotNull(generatedIcons.cdnSlug),
          isNull(generatedIcons.deletedAt),
        ),
      );

    if (icons.length === 0) {
      return new NextResponse('/* No published icons */', {
        status: 200,
        headers: {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Cache-Control': 'public, max-age=60',
        },
      });
    }

    const bundle = buildCdnBundle(
      userId,
      icons.map((i) => ({
        slug: i.cdnSlug!,
        svgCode: i.svgCode,
        animation: i.animation,
        trigger: i.trigger,
        duration: i.duration ?? 0.5,
      })),
    );

    return new NextResponse(bundle, {
      status: 200,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[cdn] Bundle generation error:', error);
    return new NextResponse('/* Error generating bundle */', {
      status: 500,
      headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
    });
  }
}
