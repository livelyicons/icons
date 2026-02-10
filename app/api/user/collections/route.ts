import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { db, collections } from '@/db';
import { eq, and, desc, sql } from 'drizzle-orm';

const createSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  parentCollectionId: z.string().uuid().optional(),
});

/**
 * GET /api/user/collections
 * List user's collections with icon counts.
 */
export async function GET() {
  try {
    const userId = await requireAuth();

    const userCollections = await db
      .select({
        id: collections.id,
        name: collections.name,
        description: collections.description,
        parentCollectionId: collections.parentCollectionId,
        createdAt: collections.createdAt,
        updatedAt: collections.updatedAt,
        iconCount: sql<number>`(
          SELECT COUNT(*)::int FROM collection_icons
          WHERE collection_icons.collection_id = ${collections.id}
        )`,
      })
      .from(collections)
      .where(eq(collections.clerkUserId, userId))
      .orderBy(desc(collections.createdAt));

    return NextResponse.json({ collections: userCollections });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Collections list error:', error);
    return NextResponse.json({ error: 'Failed to load collections' }, { status: 500 });
  }
}

/**
 * POST /api/user/collections
 * Create a new collection.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth();
    const body = await request.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { name, description, parentCollectionId } = parsed.data;

    // If nesting, verify parent belongs to user
    if (parentCollectionId) {
      const [parent] = await db
        .select({ id: collections.id })
        .from(collections)
        .where(
          and(
            eq(collections.id, parentCollectionId),
            eq(collections.clerkUserId, userId),
          ),
        )
        .limit(1);

      if (!parent) {
        return NextResponse.json(
          { error: 'Parent collection not found' },
          { status: 404 },
        );
      }
    }

    const [collection] = await db
      .insert(collections)
      .values({
        clerkUserId: userId,
        name,
        description: description ?? null,
        parentCollectionId: parentCollectionId ?? null,
      })
      .returning();

    return NextResponse.json({ collection }, { status: 201 });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Collection create error:', error);
    return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
  }
}
