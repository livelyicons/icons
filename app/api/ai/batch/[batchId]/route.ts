import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { db, batchJobs, generatedIcons } from '@/db';
import { eq, and, inArray, isNull } from 'drizzle-orm';

/**
 * GET /api/ai/batch/:batchId
 * Get the status of a batch generation job with completed icon IDs.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ batchId: string }> },
) {
  try {
    const userId = await requireAuth();
    const { batchId } = await params;

    const [batch] = await db
      .select()
      .from(batchJobs)
      .where(
        and(
          eq(batchJobs.id, batchId),
          eq(batchJobs.clerkUserId, userId),
        ),
      )
      .limit(1);

    if (!batch) {
      return NextResponse.json({ error: 'Batch job not found' }, { status: 404 });
    }

    // Fetch completed icons if any
    let icons: Array<{ id: string; name: string; svgCode: string }> = [];
    if (batch.iconIds && batch.iconIds.length > 0) {
      icons = await db
        .select({
          id: generatedIcons.id,
          name: generatedIcons.name,
          svgCode: generatedIcons.svgCode,
        })
        .from(generatedIcons)
        .where(
          and(
            inArray(generatedIcons.id, batch.iconIds),
            isNull(generatedIcons.deletedAt),
          ),
        );
    }

    return NextResponse.json({
      batchId: batch.id,
      status: batch.status,
      totalPrompts: batch.totalPrompts,
      completedCount: batch.completedCount,
      failedCount: batch.failedCount,
      icons,
      createdAt: batch.createdAt,
      completedAt: batch.completedAt,
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('[ai/batch] Status check error:', error);
    return NextResponse.json({ error: 'Failed to check batch status' }, { status: 500 });
  }
}
