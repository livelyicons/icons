import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { db, generatedIcons } from '@/db';
import { eq, and, isNull } from 'drizzle-orm';
import { z } from 'zod/v4';

const updateSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  tags: z.array(z.string()).optional(),
  animation: z.string().optional(),
  trigger: z.string().optional(),
  color: z.string().optional(),
  duration: z.number().min(0.1).max(3).optional(),
});

/**
 * PUT /api/user/library/:iconId
 * Update an icon's metadata.
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ iconId: string }> },
) {
  try {
    const userId = await requireAuth();
    const { iconId } = await params;
    const body = await request.json();
    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: parsed.error.format() },
        { status: 400 },
      );
    }

    // Verify ownership
    const existing = await db
      .select({ id: generatedIcons.id, isActive: generatedIcons.isActive })
      .from(generatedIcons)
      .where(
        and(
          eq(generatedIcons.id, iconId),
          eq(generatedIcons.clerkUserId, userId),
          isNull(generatedIcons.deletedAt),
        ),
      )
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Icon not found' }, { status: 404 });
    }

    if (!existing[0].isActive) {
      return NextResponse.json(
        { error: 'This icon is read-only. Upgrade your plan to edit.' },
        { status: 403 },
      );
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
    if (parsed.data.tags !== undefined) updateData.tags = parsed.data.tags;
    if (parsed.data.animation !== undefined) updateData.animation = parsed.data.animation;
    if (parsed.data.trigger !== undefined) updateData.trigger = parsed.data.trigger;
    if (parsed.data.color !== undefined) updateData.color = parsed.data.color;
    if (parsed.data.duration !== undefined) updateData.duration = parsed.data.duration;

    const [updated] = await db
      .update(generatedIcons)
      .set(updateData)
      .where(eq(generatedIcons.id, iconId))
      .returning();

    return NextResponse.json({ icon: updated });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Library update error:', error);
    return NextResponse.json({ error: 'Failed to update icon' }, { status: 500 });
  }
}

/**
 * DELETE /api/user/library/:iconId
 * Soft-delete an icon (set deletedAt timestamp).
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ iconId: string }> },
) {
  try {
    const userId = await requireAuth();
    const { iconId } = await params;

    // Verify ownership
    const existing = await db
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

    if (existing.length === 0) {
      return NextResponse.json({ error: 'Icon not found' }, { status: 404 });
    }

    await db
      .update(generatedIcons)
      .set({ deletedAt: new Date(), updatedAt: new Date() })
      .where(eq(generatedIcons.id, iconId));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Library delete error:', error);
    return NextResponse.json({ error: 'Failed to delete icon' }, { status: 500 });
  }
}
