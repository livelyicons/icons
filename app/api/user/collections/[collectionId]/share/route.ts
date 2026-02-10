import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { eq, and } from 'drizzle-orm';
import crypto from 'crypto';
import { requireAuth } from '@/lib/auth';
import { getSubscription } from '@/lib/subscription';
import { db, collections, sharedCollections } from '@/db';

const shareSchema = z.object({
  password: z.string().max(255).optional(),
  allowEmbed: z.boolean().optional(),
});

type RouteParams = { params: Promise<{ collectionId: string }> };

/**
 * POST /api/user/collections/[collectionId]/share
 * Create a public share for a collection. Team plan required.
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { collectionId } = await params;

    // Verify Team plan
    const sub = await getSubscription(userId);
    if (!sub || (sub.planType !== 'team' && sub.planType !== 'enterprise')) {
      return NextResponse.json(
        { error: 'Collection sharing requires a Team or Enterprise plan.' },
        { status: 403 },
      );
    }

    // Verify collection ownership
    const [collection] = await db
      .select({ id: collections.id })
      .from(collections)
      .where(
        and(
          eq(collections.id, collectionId),
          eq(collections.clerkUserId, userId),
        ),
      )
      .limit(1);

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    // Check if already shared
    const [existing] = await db
      .select({ id: sharedCollections.id })
      .from(sharedCollections)
      .where(eq(sharedCollections.collectionId, collectionId))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { error: 'This collection is already shared.' },
        { status: 409 },
      );
    }

    const body = await request.json();
    const parsed = shareSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const publicSlug = crypto.randomBytes(8).toString('hex');

    const [share] = await db
      .insert(sharedCollections)
      .values({
        collectionId,
        publicSlug,
        isPublic: true,
        allowEmbed: parsed.data.allowEmbed ?? true,
        password: parsed.data.password ?? null,
      })
      .returning();

    return NextResponse.json({
      share,
      shareUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://livelyicons.com'}/shared/${publicSlug}`,
    }, { status: 201 });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Share create error:', error);
    return NextResponse.json({ error: 'Failed to share collection' }, { status: 500 });
  }
}

/**
 * DELETE /api/user/collections/[collectionId]/share
 * Remove public share from a collection.
 */
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const userId = await requireAuth();
    const { collectionId } = await params;

    // Verify collection ownership
    const [collection] = await db
      .select({ id: collections.id })
      .from(collections)
      .where(
        and(
          eq(collections.id, collectionId),
          eq(collections.clerkUserId, userId),
        ),
      )
      .limit(1);

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    await db
      .delete(sharedCollections)
      .where(eq(sharedCollections.collectionId, collectionId));

    return NextResponse.json({ unshared: true });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Unshare error:', error);
    return NextResponse.json({ error: 'Failed to unshare collection' }, { status: 500 });
  }
}
