import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod/v4';
import { requireAuth } from '@/lib/auth';
import { canGenerate } from '@/lib/subscription';
import { deductTokens } from '@/lib/tokens';
import { checkRateLimit } from '@/lib/rate-limit';
import {
  generateSvgWithRecraft,
  RecraftApiError,
  validateAndNormalizeSvg,
  buildIconPrompt,
  suggestAnimation,
  suggestTrigger,
  generateReactComponent,
  moderatePrompt,
} from '@/lib/ai';
import { db, generatedIcons } from '@/db';
import type { IconStyle } from '@/db/schema';

const requestSchema = z.object({
  prompt: z.string().min(3).max(500),
  style: z.enum(['line', 'solid', 'outline', 'duotone', 'pixel', 'isometric', 'hand-drawn']),
  animation: z.string().optional(),
  trigger: z.string().optional(),
  duration: z.number().min(0.1).max(3).optional(),
});

/**
 * POST /api/ai/generate
 * Generate an AI icon from a text prompt.
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

    const { prompt, style, duration = 0.5 } = parsed.data;

    // Content moderation
    const moderation = moderatePrompt(prompt);
    if (!moderation.allowed) {
      return NextResponse.json(
        { error: 'Moderation', reason: moderation.reason },
        { status: 400 },
      );
    }

    // Check subscription & token balance
    const eligibility = await canGenerate(userId);
    if (!eligibility.allowed) {
      return NextResponse.json(
        { error: 'Forbidden', reason: eligibility.reason },
        { status: 403 },
      );
    }

    // Rate limiting
    const rateCheck = await checkRateLimit(userId, eligibility.planType);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Rate limited',
          message: `Rate limit exceeded. Try again in ${rateCheck.retryAfter} seconds.`,
          retryAfter: rateCheck.retryAfter,
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rateCheck.retryAfter) },
        },
      );
    }

    // Build prompt and call Recraft V3 API
    const fullPrompt = buildIconPrompt(prompt, style);

    let rawSvg: string;
    try {
      rawSvg = await generateSvgWithRecraft({ prompt: fullPrompt, style });
    } catch (err) {
      if (err instanceof RecraftApiError) {
        console.error('[ai/generate] Recraft API error:', err.message);
        return NextResponse.json(
          { error: 'AI generation failed. No token was charged. Please try again.' },
          { status: 502 },
        );
      }
      throw err;
    }

    // Validate and normalize SVG
    const validation = validateAndNormalizeSvg(rawSvg);
    if (!validation.valid) {
      console.error('[ai/generate] SVG validation failed:', validation.errors);
      return NextResponse.json(
        { error: 'Generated SVG failed validation. No token was charged. Please try again.' },
        { status: 502 },
      );
    }

    // Deduct token AFTER successful generation
    const tokenResult = await deductTokens(userId, 1);
    if (!tokenResult.success) {
      return NextResponse.json(
        { error: 'Forbidden', reason: 'Insufficient token balance.' },
        { status: 403 },
      );
    }

    // Suggest animation and trigger if not provided
    const resolvedAnimation = parsed.data.animation || suggestAnimation(prompt);
    const resolvedTrigger = parsed.data.trigger || suggestTrigger(prompt);

    // Generate name from prompt
    const iconName = prompt.slice(0, 80).replace(/[^a-zA-Z0-9\s-]/g, '').trim() || 'Generated Icon';

    // Generate React component code
    const componentCode = generateReactComponent({
      name: iconName,
      svgCode: validation.svg,
      animation: resolvedAnimation,
      trigger: resolvedTrigger,
      duration,
    });

    // Save to database
    const [savedIcon] = await db
      .insert(generatedIcons)
      .values({
        clerkUserId: userId,
        name: iconName,
        prompt,
        style: style as IconStyle,
        animation: resolvedAnimation,
        trigger: resolvedTrigger,
        svgCode: validation.svg,
        componentCode,
        previewUrl: '',
        blobStorageKey: '',
      })
      .returning({ id: generatedIcons.id });

    return NextResponse.json({
      iconId: savedIcon.id,
      svgCode: validation.svg,
      componentCode,
      suggestedAnimation: resolvedAnimation,
      suggestedTrigger: resolvedTrigger,
      tokensRemaining: tokenResult.remaining,
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('[ai/generate] Unexpected error:', error);
    return NextResponse.json(
      { error: "We couldn't generate this icon. No token was charged. Please try again." },
      { status: 500 },
    );
  }
}
