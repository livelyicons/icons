import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { db, collections, collectionIcons, generatedIcons } from '@/db';
import { eq, and, isNull, desc } from 'drizzle-orm';

const updateSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().max(1000).optional(),
  parentCollectionId: z.string().uuid().nullable().optional(),
});

/**
 * GET /api/user/collections/:collectionId
 * Get a collection's details with its icons.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> },
) {
  try {
    const userId = await requireAuth();
    const { collectionId } = await params;

    const [collection] = await db
      .select()
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

    // Fetch icons in this collection
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
        createdAt: generatedIcons.createdAt,
        addedAt: collectionIcons.addedAt,
      })
      .from(collectionIcons)
      .innerJoin(generatedIcons, eq(collectionIcons.iconId, generatedIcons.id))
      .where(
        and(
          eq(collectionIcons.collectionId, collectionId),
          isNull(generatedIcons.deletedAt),
        ),
      )
      .orderBy(desc(collectionIcons.addedAt));

    return NextResponse.json({ collection, icons });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Collection detail error:', error);
    return NextResponse.json({ error: 'Failed to load collection' }, { status: 500 });
  }
}

/**
 * PUT /api/user/collections/:collectionId
 * Update a collection's metadata.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> },
) {
  try {
    const userId = await requireAuth();
    const { collectionId } = await params;
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    // Verify ownership
    const [existing] = await db
      .select({ id: collections.id })
      .from(collections)
      .where(
        and(
          eq(collections.id, collectionId),
          eq(collections.clerkUserId, userId),
        ),
      )
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    // Prevent circular nesting
    if (parsed.data.parentCollectionId === collectionId) {
      return NextResponse.json(
        { error: 'A collection cannot be its own parent' },
        { status: 400 },
      );
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
    if (parsed.data.description !== undefined) updateData.description = parsed.data.description;
    if (parsed.data.parentCollectionId !== undefined) {
      updateData.parentCollectionId = parsed.data.parentCollectionId;
    }

    const [updated] = await db
      .update(collections)
      .set(updateData)
      .where(eq(collections.id, collectionId))
      .returning();

    return NextResponse.json({ collection: updated });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Collection update error:', error);
    return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 });
  }
}

/**
 * DELETE /api/user/collections/:collectionId
 * Delete a collection. Icons are NOT deleted (only join records removed via cascade).
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> },
) {
  try {
    const userId = await requireAuth();
    const { collectionId } = await params;

    const [existing] = await db
      .select({ id: collections.id })
      .from(collections)
      .where(
        and(
          eq(collections.id, collectionId),
          eq(collections.clerkUserId, userId),
        ),
      )
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    await db.delete(collections).where(eq(collections.id, collectionId));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Collection delete error:', error);
    return NextResponse.json({ error: 'Failed to delete collection' }, { status: 500 });
  }
}
