import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { db, styleTemplates } from '@/db';
import { eq, and } from 'drizzle-orm';

const updateSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  promptModifier: z.string().max(500).optional(),
  style: z.enum(['line', 'solid', 'outline', 'duotone', 'pixel', 'isometric', 'hand-drawn']).optional(),
  color: z.string().max(50).optional(),
  strokeWeight: z.number().min(0.5).max(5).optional(),
  animation: z.string().max(50).optional(),
  trigger: z.string().max(50).optional(),
  duration: z.number().min(0.1).max(3).optional(),
  isShared: z.boolean().optional(),
});

/**
 * PUT /api/user/templates/:templateId
 * Update a style template.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ templateId: string }> },
) {
  try {
    const userId = await requireAuth();
    const { templateId } = await params;
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
      .select({ id: styleTemplates.id })
      .from(styleTemplates)
      .where(
        and(
          eq(styleTemplates.id, templateId),
          eq(styleTemplates.clerkUserId, userId),
        ),
      )
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    const fields = ['name', 'promptModifier', 'style', 'color', 'strokeWeight', 'animation', 'trigger', 'duration', 'isShared'] as const;
    for (const field of fields) {
      if (parsed.data[field] !== undefined) {
        updateData[field] = parsed.data[field];
      }
    }

    const [updated] = await db
      .update(styleTemplates)
      .set(updateData)
      .where(eq(styleTemplates.id, templateId))
      .returning();

    return NextResponse.json({ template: updated });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Template update error:', error);
    return NextResponse.json({ error: 'Failed to update template' }, { status: 500 });
  }
}

/**
 * DELETE /api/user/templates/:templateId
 * Delete a style template.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ templateId: string }> },
) {
  try {
    const userId = await requireAuth();
    const { templateId } = await params;

    const [existing] = await db
      .select({ id: styleTemplates.id })
      .from(styleTemplates)
      .where(
        and(
          eq(styleTemplates.id, templateId),
          eq(styleTemplates.clerkUserId, userId),
        ),
      )
      .limit(1);

    if (!existing) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    await db.delete(styleTemplates).where(eq(styleTemplates.id, templateId));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Template delete error:', error);
    return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 });
  }
}
