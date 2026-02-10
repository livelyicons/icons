import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { canGenerate, getSubscription } from '@/lib/subscription';
import { deductTokens } from '@/lib/tokens';
import { requireTeamMember } from '@/lib/team-auth';
import { canTeamGenerate, deductTeamTokens } from '@/lib/team-tokens';
import { moderatePrompt } from '@/lib/ai';
import { db, batchJobs } from '@/db';
import { inngest } from '@/lib/inngest';
import { TOKEN_COSTS } from '@/lib/stripe';
import type { PlanType } from '@/db/schema';

const batchSchema = z.object({
  prompts: z.array(z.string().min(3).max(500)).min(1).max(20),
  style: z.enum(['line', 'solid', 'outline', 'duotone', 'pixel', 'isometric', 'hand-drawn']),
  animation: z.string().optional(),
  trigger: z.string().optional(),
  duration: z.number().min(0.1).max(3).optional(),
  teamId: z.string().uuid().optional(),
});

/**
 * POST /api/ai/batch
 * Start a batch icon generation job.
 * Pro+ plans only. Deducts all tokens upfront.
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth();

    const body = await request.json();
    const parsed = batchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { prompts, style, animation, trigger, duration, teamId } = parsed.data;
    const isTeamContext = !!teamId;

    // Team context: verify editor+ role
    if (isTeamContext) {
      await requireTeamMember(teamId, userId, 'editor');
    } else {
      // Check plan eligibility (Pro+ only for personal)
      const sub = await getSubscription(userId);
      if (!sub) {
        return NextResponse.json(
          { error: 'No subscription found' },
          { status: 403 },
        );
      }

      const planType = sub.planType as PlanType;
      if (planType === 'free') {
        return NextResponse.json(
          { error: 'Batch generation requires a Pro or higher plan.' },
          { status: 403 },
        );
      }
    }

    // Moderate all prompts
    for (const prompt of prompts) {
      const moderation = moderatePrompt(prompt);
      if (!moderation.allowed) {
        return NextResponse.json(
          { error: 'Moderation', reason: moderation.reason, prompt },
          { status: 400 },
        );
      }
    }

    // Check token balance for entire batch
    const totalCost = prompts.length * TOKEN_COSTS.batchGenerate;

    if (isTeamContext) {
      const teamEligibility = await canTeamGenerate(teamId!);
      if (!teamEligibility.allowed) {
        return NextResponse.json(
          { error: 'Forbidden', reason: teamEligibility.reason },
          { status: 403 },
        );
      }
      if (teamEligibility.tokensRemaining < totalCost) {
        return NextResponse.json(
          {
            error: 'Insufficient tokens',
            reason: `Batch requires ${totalCost} tokens but the team has ${teamEligibility.tokensRemaining}.`,
          },
          { status: 403 },
        );
      }
    } else {
      const eligibility = await canGenerate(userId);
      if (!eligibility.allowed) {
        return NextResponse.json(
          { error: 'Forbidden', reason: eligibility.reason },
          { status: 403 },
        );
      }
      if (eligibility.tokensRemaining < totalCost) {
        return NextResponse.json(
          {
            error: 'Insufficient tokens',
            reason: `Batch requires ${totalCost} tokens but you have ${eligibility.tokensRemaining}.`,
          },
          { status: 403 },
        );
      }
    }

    // Deduct all tokens upfront
    const tokenResult = isTeamContext
      ? await deductTeamTokens(teamId!, totalCost)
      : await deductTokens(userId, totalCost);
    if (!tokenResult.success) {
      return NextResponse.json(
        { error: 'Forbidden', reason: 'Failed to deduct tokens.' },
        { status: 403 },
      );
    }

    // Create batch job record
    const [batchJob] = await db
      .insert(batchJobs)
      .values({
        clerkUserId: userId,
        teamId: isTeamContext ? teamId : null,
        status: 'queued',
        totalPrompts: prompts.length,
        completedCount: 0,
        failedCount: 0,
        prompts,
        style,
        animation: animation ?? null,
      })
      .returning();

    // Fire Inngest event to process the batch
    await inngest.send({
      name: 'batch/generate.start',
      data: {
        batchId: batchJob.id,
        clerkUserId: userId,
        teamId: isTeamContext ? teamId : null,
        prompts,
        style,
        animation: animation ?? 'scale',
        trigger: trigger ?? 'hover',
        duration: duration ?? 0.5,
      },
    });

    return NextResponse.json({
      batchId: batchJob.id,
      status: 'queued',
      totalPrompts: prompts.length,
      tokensCost: totalCost,
      tokensRemaining: tokenResult.remaining,
    }, { status: 202 });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('[ai/batch] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Failed to start batch generation.' },
      { status: 500 },
    );
  }
}
