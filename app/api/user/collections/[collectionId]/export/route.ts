import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { db, collections, collectionIcons, generatedIcons } from '@/db';
import { eq, and, isNull } from 'drizzle-orm';
import { generateComponentCode } from '@/lib/ai';
import JSZip from 'jszip';

const exportSchema = z.object({
  formats: z.array(z.enum(['svg', 'react', 'vue', 'html'])).min(1).default(['svg']),
});

/**
 * POST /api/user/collections/:collectionId/export
 * Export all icons in a collection as a ZIP file.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> },
) {
  try {
    const userId = await requireAuth();
    const { collectionId } = await params;

    // Parse format preferences
    let formats: Array<'svg' | 'react' | 'vue' | 'html'> = ['svg'];
    try {
      const body = await request.json();
      const parsed = exportSchema.safeParse(body);
      if (parsed.success) {
        formats = parsed.data.formats;
      }
    } catch {
      // Default to SVG if no body provided
    }

    // Verify collection ownership
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

    // Fetch all icons in collection
    const icons = await db
      .select({
        id: generatedIcons.id,
        name: generatedIcons.name,
        svgCode: generatedIcons.svgCode,
        animation: generatedIcons.animation,
        trigger: generatedIcons.trigger,
        duration: generatedIcons.duration,
      })
      .from(collectionIcons)
      .innerJoin(generatedIcons, eq(collectionIcons.iconId, generatedIcons.id))
      .where(
        and(
          eq(collectionIcons.collectionId, collectionId),
          isNull(generatedIcons.deletedAt),
        ),
      );

    if (icons.length === 0) {
      return NextResponse.json(
        { error: 'Collection is empty' },
        { status: 400 },
      );
    }

    // Build ZIP
    const zip = new JSZip();
    const collectionFolder = sanitizeFileName(collection.name);

    for (const icon of icons) {
      const iconSlug = sanitizeFileName(icon.name);
      const duration = icon.duration ?? 0.5;

      for (const format of formats) {
        const code = generateComponentCode(format, {
          name: icon.name,
          svgCode: icon.svgCode,
          animation: icon.animation,
          trigger: icon.trigger,
          duration,
        });

        const ext = FORMAT_EXTENSIONS[format];
        zip.file(`${collectionFolder}/${iconSlug}.${ext}`, code);
      }
    }

    // Add README
    zip.file(
      `${collectionFolder}/README.md`,
      generateReadme(collection.name, icons.length, formats),
    );

    // Generate ZIP buffer
    const zipBuffer = await zip.generateAsync({
      type: 'arraybuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });

    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${collectionFolder}.zip"`,
        'Cache-Control': 'private, max-age=3600',
      },
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Collection export error:', error);
    return NextResponse.json({ error: 'Failed to export collection' }, { status: 500 });
  }
}

const FORMAT_EXTENSIONS: Record<string, string> = {
  svg: 'svg',
  react: 'tsx',
  vue: 'vue',
  html: 'html',
};

function sanitizeFileName(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .slice(0, 100) || 'untitled';
}

function generateReadme(
  collectionName: string,
  iconCount: number,
  formats: string[],
): string {
  const formatDocs: Record<string, string> = {
    svg: '### SVG\n```html\n<!-- Paste SVG directly into your HTML -->\n```',
    react: '### React\n```tsx\nimport IconName from \'./icon-name\';\n\n<IconName className="w-6 h-6" />\n```',
    vue: '### Vue\n```vue\n<template>\n  <IconName class="w-6 h-6" />\n</template>\n\n<script setup>\nimport IconName from \'./icon-name.vue\';\n</script>\n```',
    html: '### HTML\n```html\n<!-- Include the HTML snippet in your page -->\n```',
  };

  return `# ${collectionName}

Exported from Lively Icons — ${iconCount} icon${iconCount !== 1 ? 's' : ''}.

## Usage

${formats.map((f) => formatDocs[f] || '').join('\n\n')}

## License

Generated icons are licensed for use in your projects per the Lively Icons Terms of Service.
`;
}
