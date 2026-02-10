import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { getSubscription, getPlanLimits } from '@/lib/subscription';
import { getTeamsForUser } from '@/lib/team-auth';
import { db, styleTemplates } from '@/db';
import { eq, and, or, desc, sql } from 'drizzle-orm';

const createSchema = z.object({
  name: z.string().min(1).max(255),
  promptModifier: z.string().max(500).optional(),
  style: z.enum(['line', 'solid', 'outline', 'duotone', 'pixel', 'isometric', 'hand-drawn']).optional(),
  color: z.string().max(50).optional(),
  strokeWeight: z.number().min(0.5).max(5).optional(),
  animation: z.string().max(50).optional(),
  trigger: z.string().max(50).optional(),
  duration: z.number().min(0.1).max(3).optional(),
  teamId: z.string().uuid().optional(),
  isShared: z.boolean().optional(),
});

/**
 * GET /api/user/templates
 * List user's style templates.
 */
export async function GET() {
  try {
    const userId = await requireAuth();

    // Get user's personal templates
    const personalTemplates = await db
      .select()
      .from(styleTemplates)
      .where(eq(styleTemplates.clerkUserId, userId))
      .orderBy(desc(styleTemplates.createdAt));

    // Get shared team templates from all teams the user belongs to
    const userTeams = await getTeamsForUser(userId);
    let teamTemplates: typeof personalTemplates = [];

    if (userTeams.length > 0) {
      const teamIds = userTeams.map((t) => t.id);
      teamTemplates = await db
        .select()
        .from(styleTemplates)
        .where(
          and(
            eq(styleTemplates.isShared, true),
            or(...teamIds.map((id) => eq(styleTemplates.teamId, id))),
          ),
        )
        .orderBy(desc(styleTemplates.createdAt));
    }

    return NextResponse.json({
      templates: personalTemplates,
      teamTemplates,
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Templates list error:', error);
    return NextResponse.json({ error: 'Failed to load templates' }, { status: 500 });
  }
}

/**
 * POST /api/user/templates
 * Create a new style template. Enforced by plan limits.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth();

    // Check plan limits
    const sub = await getSubscription(userId);
    if (!sub) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 403 },
      );
    }

    const limits = getPlanLimits(sub.planType as 'free' | 'pro' | 'team' | 'enterprise');
    const maxTemplates = limits.maxTemplates;

    if (maxTemplates === 0) {
      return NextResponse.json(
        { error: 'Templates are not available on the Free plan. Upgrade to Pro to create templates.' },
        { status: 403 },
      );
    }

    // Count existing templates
    const [countResult] = await db
      .select({ count: sql<number>`COUNT(*)::int` })
      .from(styleTemplates)
      .where(eq(styleTemplates.clerkUserId, userId));

    if (countResult.count >= maxTemplates) {
      return NextResponse.json(
        { error: `You've reached the maximum of ${maxTemplates} templates for your plan.` },
        { status: 403 },
      );
    }

    const body = await request.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const [template] = await db
      .insert(styleTemplates)
      .values({
        clerkUserId: userId,
        teamId: parsed.data.teamId ?? null,
        name: parsed.data.name,
        promptModifier: parsed.data.promptModifier ?? null,
        style: parsed.data.style ?? null,
        color: parsed.data.color ?? null,
        strokeWeight: parsed.data.strokeWeight ?? null,
        animation: parsed.data.animation ?? null,
        trigger: parsed.data.trigger ?? null,
        duration: parsed.data.duration ?? null,
        isShared: parsed.data.isShared ?? false,
      })
      .returning();

    return NextResponse.json({ template }, { status: 201 });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('Template create error:', error);
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
  }
}
