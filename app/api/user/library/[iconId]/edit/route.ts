import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { validateAndNormalizeSvg, generateReactComponent } from '@/lib/ai';
import { db, generatedIcons } from '@/db';
import { eq, and, isNull } from 'drizzle-orm';

const editSchema = z.object({
  svgCode: z.string().min(10).max(50000),
});

/**
 * PUT /api/user/library/:iconId/edit
 * Save manual SVG edits. Validates the SVG before persisting.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ iconId: string }> },
) {
  try {
    const userId = await requireAuth();
    const { iconId } = await params;
    const body = await request.json();
    const parsed = editSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    // Verify ownership
    const [existing] = await db
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

    if (!existing) {
      return NextResponse.json({ error: 'Icon not found' }, { status: 404 });
    }

    if (!existing.isActive) {
      return NextResponse.json(
        { error: 'This icon is read-only. Upgrade your plan to edit.' },
        { status: 403 },
      );
    }

    // Validate the edited SVG
    const validation = validateAndNormalizeSvg(parsed.data.svgCode);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'SVG validation failed', reasons: validation.errors },
        { status: 400 },
      );
    }

    // Regenerate component code with the updated SVG
    const componentCode = generateReactComponent({
      name: existing.name,
      svgCode: validation.svg,
      animation: existing.animation,
      trigger: existing.trigger,
      duration: existing.duration ?? 0.5,
    });

    // Save the edits
    const [updated] = await db
      .update(generatedIcons)
      .set({
        svgCode: validation.svg,
        componentCode,
        updatedAt: new Date(),
      })
      .where(eq(generatedIcons.id, iconId))
      .returning();

    return NextResponse.json({
      icon: {
        id: updated.id,
        svgCode: updated.svgCode,
        componentCode: updated.componentCode,
      },
      warnings: validation.warnings,
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Icon edit error:', error);
    return NextResponse.json({ error: 'Failed to save edits' }, { status: 500 });
  }
}
