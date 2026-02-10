import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { getSubscription, getPlanLimits } from '@/lib/subscription';
import { db, generatedIcons } from '@/db';
import { eq, and, isNull, isNotNull, sql } from 'drizzle-orm';
import type { PlanType } from '@/db/schema';

const publishSchema = z.object({
  iconId: z.string().uuid(),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
});

const unpublishSchema = z.object({
  iconId: z.string().uuid(),
});

/**
 * GET /api/user/cdn
 * List user's published CDN icons.
 */
export async function GET() {
  try {
    const userId = await requireAuth();

    const publishedIcons = await db
      .select({
        id: generatedIcons.id,
        name: generatedIcons.name,
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

    return NextResponse.json({ icons: publishedIcons });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('CDN list error:', error);
    return NextResponse.json({ error: 'Failed to load CDN icons' }, { status: 500 });
  }
}

/**
 * POST /api/user/cdn
 * Publish an icon to the user's CDN bundle.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth();

    const body = await request.json();
    const parsed = publishSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { iconId, slug } = parsed.data;

    // Check plan limits
    const sub = await getSubscription(userId);
    if (!sub) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 403 });
    }

    const limits = getPlanLimits(sub.planType as PlanType);
    const maxCdnIcons = limits.maxCdnIcons;

    if (maxCdnIcons === 0) {
      return NextResponse.json(
        { error: 'CDN publishing is not available on the Free plan.' },
        { status: 403 },
      );
    }

    // Count existing published icons
    const [countResult] = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(generatedIcons)
      .where(
        and(
          eq(generatedIcons.clerkUserId, userId),
          isNotNull(generatedIcons.cdnSlug),
          isNull(generatedIcons.deletedAt),
        ),
      );

    if (countResult.count >= maxCdnIcons) {
      return NextResponse.json(
        { error: `You've reached the maximum of ${maxCdnIcons} CDN icons for your plan.` },
        { status: 403 },
      );
    }

    // Check slug uniqueness for this user
    const [existingSlug] = await db
      .select({ id: generatedIcons.id })
      .from(generatedIcons)
      .where(
        and(
          eq(generatedIcons.clerkUserId, userId),
          eq(generatedIcons.cdnSlug, slug),
          isNull(generatedIcons.deletedAt),
        ),
      )
      .limit(1);

    if (existingSlug) {
      return NextResponse.json(
        { error: `Slug "${slug}" is already in use. Choose a different slug.` },
        { status: 409 },
      );
    }

    // Verify icon ownership
    const [icon] = await db
      .select({ id: generatedIcons.id })
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

    // Publish by setting cdnSlug
    await db
      .update(generatedIcons)
      .set({ cdnSlug: slug, updatedAt: new Date() })
      .where(eq(generatedIcons.id, iconId));

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('CDN publish error:', error);
    return NextResponse.json({ error: 'Failed to publish to CDN' }, { status: 500 });
  }
}

/**
 * DELETE /api/user/cdn
 * Unpublish an icon from the CDN.
 */
export async function DELETE(request: NextRequest) {
  try {
    const userId = await requireAuth();

    const body = await request.json();
    const parsed = unpublishSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { iconId } = parsed.data;

    // Verify ownership
    const [icon] = await db
      .select({ id: generatedIcons.id })
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

    await db
      .update(generatedIcons)
      .set({ cdnSlug: null, updatedAt: new Date() })
      .where(eq(generatedIcons.id, iconId));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('CDN unpublish error:', error);
    return NextResponse.json({ error: 'Failed to unpublish from CDN' }, { status: 500 });
  }
}
