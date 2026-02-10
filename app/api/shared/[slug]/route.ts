import { NextRequest, NextResponse } from 'next/server';
import { eq, sql } from 'drizzle-orm';
import { db, sharedCollections, collections, collectionIcons, generatedIcons } from '@/db';

type RouteParams = { params: Promise<{ slug: string }> };

/**
 * GET /api/shared/[slug]
 * Public collection view. No auth required. Increments view count.
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const [share] = await db
      .select()
      .from(sharedCollections)
      .where(eq(sharedCollections.publicSlug, slug))
      .limit(1);

    if (!share || !share.isPublic) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    // Check password if required
    if (share.password) {
      const providedPassword = request.headers.get('x-share-password');
      if (providedPassword !== share.password) {
        return NextResponse.json(
          { error: 'Password required', passwordProtected: true },
          { status: 401 },
        );
      }
    }

    // Get collection details
    const [collection] = await db
      .select()
      .from(collections)
      .where(eq(collections.id, share.collectionId))
      .limit(1);

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    // Get icons in collection
    const icons = await db
      .select({
        id: generatedIcons.id,
        name: generatedIcons.name,
        style: generatedIcons.style,
        animation: generatedIcons.animation,
        trigger: generatedIcons.trigger,
        svgCode: generatedIcons.svgCode,
        previewUrl: generatedIcons.previewUrl,
        duration: generatedIcons.duration,
      })
      .from(collectionIcons)
      .innerJoin(generatedIcons, eq(generatedIcons.id, collectionIcons.iconId))
      .where(eq(collectionIcons.collectionId, share.collectionId));

    // Increment view count (fire and forget)
    db.update(sharedCollections)
      .set({ viewCount: sql`${sharedCollections.viewCount} + 1` })
      .where(eq(sharedCollections.id, share.id))
      .then(() => {})
      .catch(() => {});

    return NextResponse.json({
      collection: {
        name: collection.name,
        description: collection.description,
        iconCount: icons.length,
      },
      icons,
      allowEmbed: share.allowEmbed,
      viewCount: share.viewCount,
    });
  } catch (error) {
    console.error('Shared collection error:', error);
    return NextResponse.json({ error: 'Failed to load shared collection' }, { status: 500 });
  }
}
