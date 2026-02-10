import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { db, collections, collectionIcons, generatedIcons } from '@/db';
import { eq, and, isNull, inArray } from 'drizzle-orm';

const addIconsSchema = z.object({
  iconIds: z.array(z.string().uuid()).min(1).max(100),
});

const removeIconsSchema = z.object({
  iconIds: z.array(z.string().uuid()).min(1).max(100),
});

/**
 * POST /api/user/collections/:collectionId/icons
 * Add icons to a collection.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> },
) {
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

    const body = await request.json();
    const parsed = addIconsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    // Verify all icons belong to user and are not deleted
    const validIcons = await db
      .select({ id: generatedIcons.id })
      .from(generatedIcons)
      .where(
        and(
          inArray(generatedIcons.id, parsed.data.iconIds),
          eq(generatedIcons.clerkUserId, userId),
          isNull(generatedIcons.deletedAt),
        ),
      );

    const validIconIds = new Set(validIcons.map((i) => i.id));
    const invalidIds = parsed.data.iconIds.filter((id) => !validIconIds.has(id));

    if (invalidIds.length > 0) {
      return NextResponse.json(
        { error: 'Some icons not found', invalidIds },
        { status: 400 },
      );
    }

    // Insert into join table (ignore conflicts for already-added icons)
    const values = parsed.data.iconIds.map((iconId) => ({
      collectionId,
      iconId,
    }));

    await db
      .insert(collectionIcons)
      .values(values)
      .onConflictDoNothing();

    return NextResponse.json({ success: true, addedCount: values.length });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Collection add icons error:', error);
    return NextResponse.json({ error: 'Failed to add icons to collection' }, { status: 500 });
  }
}

/**
 * DELETE /api/user/collections/:collectionId/icons
 * Remove icons from a collection.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> },
) {
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

    const body = await request.json();
    const parsed = removeIconsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    await db
      .delete(collectionIcons)
      .where(
        and(
          eq(collectionIcons.collectionId, collectionId),
          inArray(collectionIcons.iconId, parsed.data.iconIds),
        ),
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Collection remove icons error:', error);
    return NextResponse.json({ error: 'Failed to remove icons from collection' }, { status: 500 });
  }
}
