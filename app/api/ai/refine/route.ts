import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { canGenerate } from '@/lib/subscription';
import { deductTokens } from '@/lib/tokens';
import { checkRateLimit } from '@/lib/rate-limit';
import { requireTeamMember } from '@/lib/team-auth';
import { canTeamGenerate, deductTeamTokens } from '@/lib/team-tokens';
import {
  refineIcon,
  RecraftApiError,
  validateAndNormalizeSvg,
  buildRefinementPrompt,
  generateReactComponent,
  moderatePrompt,
} from '@/lib/ai';
import { db, generatedIcons } from '@/db';
import { eq, and, isNull } from 'drizzle-orm';
import { TOKEN_COSTS } from '@/lib/stripe';
import type { IconStyle } from '@/db/schema';

const requestSchema = z.object({
  iconId: z.string().uuid(),
  instruction: z.string().min(3).max(500),
  teamId: z.string().uuid().optional(),
});

/**
 * POST /api/ai/refine
 * Refine an existing icon with a modification instruction.
 * Costs 0.5 tokens (TOKEN_COSTS.refine).
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth();

    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', reason: parsed.error.issues[0]?.message },
        { status: 400 },
      );
    }

    const { iconId, instruction, teamId } = parsed.data;
    const isTeamContext = !!teamId;

    // Content moderation on the instruction
    const moderation = moderatePrompt(instruction);
    if (!moderation.allowed) {
      return NextResponse.json(
        { error: 'Moderation', reason: moderation.reason },
        { status: 400 },
      );
    }

    // Team context: verify editor+ role
    if (isTeamContext) {
      await requireTeamMember(teamId, userId, 'editor');
    }

    // Load the parent icon (for team context, check team ownership; for personal, check user ownership)
    const conditions = isTeamContext
      ? and(eq(generatedIcons.id, iconId), eq(generatedIcons.teamId, teamId!), isNull(generatedIcons.deletedAt))
      : and(eq(generatedIcons.id, iconId), eq(generatedIcons.clerkUserId, userId), isNull(generatedIcons.deletedAt));

    const [parentIcon] = await db
      .select()
      .from(generatedIcons)
      .where(conditions)
      .limit(1);

    if (!parentIcon) {
      return NextResponse.json(
        { error: 'Icon not found' },
        { status: 404 },
      );
    }

    // Check subscription & token balance
    if (isTeamContext) {
      const teamEligibility = await canTeamGenerate(teamId!);
      if (!teamEligibility.allowed) {
        return NextResponse.json(
          { error: 'Forbidden', reason: teamEligibility.reason },
          { status: 403 },
        );
      }
      if (teamEligibility.tokensRemaining < TOKEN_COSTS.refine) {
        return NextResponse.json(
          { error: 'Forbidden', reason: 'Insufficient team tokens for refinement.' },
          { status: 403 },
        );
      }

      const rateCheck = await checkRateLimit(`team:${teamId}`, 'team');
      if (!rateCheck.allowed) {
        return NextResponse.json(
          {
            error: 'Rate limited',
            message: `Team rate limit exceeded. Try again in ${rateCheck.retryAfter} seconds.`,
            retryAfter: rateCheck.retryAfter,
          },
          { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } },
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
      if (eligibility.tokensRemaining < TOKEN_COSTS.refine) {
        return NextResponse.json(
          { error: 'Forbidden', reason: 'Insufficient tokens for refinement.' },
          { status: 403 },
        );
      }

      const rateCheck = await checkRateLimit(userId, eligibility.planType);
      if (!rateCheck.allowed) {
        return NextResponse.json(
          {
            error: 'Rate limited',
            message: `Rate limit exceeded. Try again in ${rateCheck.retryAfter} seconds.`,
            retryAfter: rateCheck.retryAfter,
          },
          { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } },
        );
      }
    }

    // Build refinement prompt
    const refinementPrompt = buildRefinementPrompt(
      parentIcon.prompt,
      instruction,
      parentIcon.style as IconStyle,
    );

    let rawSvg: string;
    try {
      rawSvg = await refineIcon({ prompt: refinementPrompt, style: parentIcon.style });
    } catch (err) {
      if (err instanceof RecraftApiError) {
        console.error('[ai/refine] Recraft API error:', err.message);
        return NextResponse.json(
          { error: 'AI refinement failed. No token was charged. Please try again.' },
          { status: 502 },
        );
      }
      throw err;
    }

    // Validate and normalize SVG
    const validation = validateAndNormalizeSvg(rawSvg);
    if (!validation.valid) {
      console.error('[ai/refine] SVG validation failed:', validation.errors);
      return NextResponse.json(
        { error: 'Refined SVG failed validation. No token was charged. Please try again.' },
        { status: 502 },
      );
    }

    // Deduct refinement cost AFTER successful generation
    const tokenResult = isTeamContext
      ? await deductTeamTokens(teamId!, TOKEN_COSTS.refine)
      : await deductTokens(userId, TOKEN_COSTS.refine);
    if (!tokenResult.success) {
      return NextResponse.json(
        { error: 'Forbidden', reason: 'Insufficient token balance.' },
        { status: 403 },
      );
    }

    const duration = parentIcon.duration ?? 0.5;
    const iconName = `${parentIcon.name} (refined)`.slice(0, 255);

    // Generate React component code
    const componentCode = generateReactComponent({
      name: iconName,
      svgCode: validation.svg,
      animation: parentIcon.animation,
      trigger: parentIcon.trigger,
      duration,
    });

    // Save new icon with parentIconId reference
    const [savedIcon] = await db
      .insert(generatedIcons)
      .values({
        clerkUserId: userId,
        teamId: isTeamContext ? teamId : null,
        name: iconName,
        prompt: `${parentIcon.prompt} — Refined: ${instruction}`,
        style: parentIcon.style as IconStyle,
        animation: parentIcon.animation,
        trigger: parentIcon.trigger,
        svgCode: validation.svg,
        componentCode,
        previewUrl: '',
        blobStorageKey: '',
        tags: parentIcon.tags,
        color: parentIcon.color,
        strokeWeight: parentIcon.strokeWeight,
        duration,
        parentIconId: parentIcon.id,
      })
      .returning({ id: generatedIcons.id });

    return NextResponse.json({
      iconId: savedIcon.id,
      parentIconId: parentIcon.id,
      svgCode: validation.svg,
      componentCode,
      tokensRemaining: tokenResult.remaining,
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('[ai/refine] Unexpected error:', error);
    return NextResponse.json(
      { error: "We couldn't refine this icon. No token was charged. Please try again." },
      { status: 500 },
    );
  }
}
