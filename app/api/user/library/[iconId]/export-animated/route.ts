import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { db, generatedIcons } from '@/db';
import { eq, and, isNull } from 'drizzle-orm';
import { generateAnimatedSvg } from '@/lib/animated-export';

const exportSchema = z.object({
  format: z.enum(['animated-svg', 'gif']),
  size: z.number().min(64).max(512).default(256),
  fps: z.number().min(10).max(30).default(15),
});

/**
 * POST /api/user/library/:iconId/export-animated
 * Export an icon as an animated SVG or GIF.
 * Animated SVG uses native SMIL animations.
 * GIF generation requires server-side rendering (future implementation).
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ iconId: string }> },
) {
  try {
    const userId = await requireAuth();
    const { iconId } = await params;

    const body = await request.json();
    const parsed = exportSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { format, size } = parsed.data;

    // Verify ownership
    const [icon] = await db
      .select()
      .from(generatedIcons)
      .where(
        and(
          eq(generatedIcons.id, iconId),
          eq(generatedIcons.clerkUserId, userId),
          isNull(generatedIcons.deletedAt),
        ),
      )
      .limit(1);

    if (!icon) {
      return NextResponse.json({ error: 'Icon not found' }, { status: 404 });
    }

    if (format === 'animated-svg') {
      const animatedSvg = generateAnimatedSvg({
        svgCode: icon.svgCode,
        animation: icon.animation,
        duration: icon.duration ?? 0.5,
      });

      // Replace viewBox size for the requested output size
      const sizedSvg = animatedSvg
        .replace(/<svg([^>]*)>/, `<svg$1 width="${size}" height="${size}">`);

      const slug = icon.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();

      return new NextResponse(sizedSvg, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Content-Disposition': `attachment; filename="${slug}-animated.svg"`,
        },
      });
    }

    if (format === 'gif') {
      // GIF generation requires server-side SVG rendering.
      // This is a placeholder that returns a helpful message.
      // Full implementation would use Playwright or canvas-based rendering.
      return NextResponse.json(
        {
          error: 'GIF export is coming soon. Use animated SVG for now.',
          suggestion: 'animated-svg',
        },
        { status: 501 },
      );
    }

    return NextResponse.json({ error: 'Unsupported format' }, { status: 400 });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Animated export error:', error);
    return NextResponse.json({ error: 'Failed to export animated icon' }, { status: 500 });
  }
}
