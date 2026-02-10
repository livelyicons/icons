import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, sharedCollections, collections, collectionIcons, generatedIcons } from '@/db';

type RouteParams = { params: Promise<{ slug: string }> };

/**
 * GET /api/shared/[slug]/embed.js
 * Embeddable JS bundle for a shared collection. No auth. CDN cached.
 */
export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;

    const [share] = await db
      .select()
      .from(sharedCollections)
      .where(eq(sharedCollections.publicSlug, slug))
      .limit(1);

    if (!share || !share.isPublic || !share.allowEmbed) {
      return new NextResponse('// Collection not found or embedding disabled', {
        status: 404,
        headers: { 'Content-Type': 'application/javascript' },
      });
    }

    const [collection] = await db
      .select({ name: collections.name })
      .from(collections)
      .where(eq(collections.id, share.collectionId))
      .limit(1);

    const icons = await db
      .select({
        name: generatedIcons.name,
        svgCode: generatedIcons.svgCode,
        style: generatedIcons.style,
      })
      .from(collectionIcons)
      .innerJoin(generatedIcons, eq(generatedIcons.id, collectionIcons.iconId))
      .where(eq(collectionIcons.collectionId, share.collectionId));

    const iconsData = icons.map((icon) => ({
      name: icon.name,
      svg: icon.svgCode,
      style: icon.style,
    }));

    // SVG content is generated server-side and sanitized at creation time.
    // The embed uses DOMParser for safe SVG insertion rather than innerHTML.
    const js = `
// Lively Icons — Shared Collection: ${collection?.name ?? 'Unknown'}
// https://livelyicons.com/shared/${slug}
(function() {
  var icons = ${JSON.stringify(iconsData)};
  var parser = new DOMParser();
  window.__livelySharedCollection = {
    name: ${JSON.stringify(collection?.name ?? 'Unknown')},
    slug: ${JSON.stringify(slug)},
    icons: icons,
    getIcon: function(name) {
      return icons.find(function(i) { return i.name === name; });
    },
    renderAll: function(container) {
      var el = typeof container === 'string' ? document.querySelector(container) : container;
      if (!el) return;
      icons.forEach(function(icon) {
        var div = document.createElement('div');
        div.className = 'lively-icon';
        div.title = icon.name;
        var doc = parser.parseFromString(icon.svg, 'image/svg+xml');
        var svgEl = doc.documentElement;
        if (svgEl && svgEl.nodeName === 'svg') {
          div.appendChild(document.importNode(svgEl, true));
        }
        el.appendChild(div);
      });
    }
  };
})();
`.trim();

    return new NextResponse(js, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Embed JS error:', error);
    return new NextResponse('// Error loading collection', {
      status: 500,
      headers: { 'Content-Type': 'application/javascript' },
    });
  }
}
