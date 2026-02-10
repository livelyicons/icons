import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { canGenerate } from '@/lib/subscription';
import { deductTokens } from '@/lib/tokens';
import { checkRateLimit } from '@/lib/rate-limit';
import { requireTeamMember } from '@/lib/team-auth';
import { canTeamGenerate, deductTeamTokens } from '@/lib/team-tokens';
import {
  generateFromReference,
  RecraftApiError,
  validateAndNormalizeSvg,
  buildIconPrompt,
  suggestAnimation,
  suggestTrigger,
  generateReactComponent,
  moderatePrompt,
} from '@/lib/ai';
import {
  validateReferenceImage,
  getReferenceImageKey,
  getExtensionFromMime,
} from '@/lib/ai/image-reference';
import { put } from '@vercel/blob';
import { db, generatedIcons } from '@/db';
import type { IconStyle } from '@/db/schema';

/**
 * POST /api/ai/upload-reference
 * Upload a reference image and generate an icon from it.
 * Accepts multipart/form-data with fields: image, prompt, style, animation?, trigger?, duration?
 */
export async function POST(request: NextRequest) {
  try {
    const userId = await requireAuth();

    const formData = await request.formData();
    const imageFile = formData.get('image') as File | null;
    const prompt = formData.get('prompt') as string | null;
    const style = formData.get('style') as string | null;
    const animation = formData.get('animation') as string | null;
    const trigger = formData.get('trigger') as string | null;
    const durationStr = formData.get('duration') as string | null;
    const duration = durationStr ? parseFloat(durationStr) : 0.5;
    const teamId = formData.get('teamId') as string | null;
    const isTeamContext = !!teamId;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }
    if (!prompt || prompt.length < 3) {
      return NextResponse.json({ error: 'Prompt is required (min 3 characters)' }, { status: 400 });
    }
    if (!style) {
      return NextResponse.json({ error: 'Style is required' }, { status: 400 });
    }

    // Validate the uploaded image
    const imageValidation = validateReferenceImage(imageFile);
    if (!imageValidation.valid) {
      return NextResponse.json(
        { error: 'Invalid image', reasons: imageValidation.errors },
        { status: 400 },
      );
    }

    // Content moderation on the prompt
    const moderation = moderatePrompt(prompt);
    if (!moderation.allowed) {
      return NextResponse.json(
        { error: 'Moderation', reason: moderation.reason },
        { status: 400 },
      );
    }

    // Check subscription & token balance + rate limiting
    if (isTeamContext) {
      await requireTeamMember(teamId, userId, 'editor');
      const teamEligibility = await canTeamGenerate(teamId);
      if (!teamEligibility.allowed) {
        return NextResponse.json(
          { error: 'Forbidden', reason: teamEligibility.reason },
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

    // Upload image to Vercel Blob
    const ext = getExtensionFromMime(imageFile.type);
    const tempIconId = crypto.randomUUID();
    const blobKey = getReferenceImageKey(userId, tempIconId, ext);

    const blob = await put(blobKey, imageFile, {
      access: 'public',
      contentType: imageFile.type,
    });

    // Build prompt and generate icon from reference
    const fullPrompt = buildIconPrompt(prompt, style as IconStyle);

    let rawSvg: string;
    try {
      rawSvg = await generateFromReference({
        prompt: fullPrompt,
        style,
        referenceImageUrl: blob.url,
      });
    } catch (err) {
      if (err instanceof RecraftApiError) {
        console.error('[ai/upload-reference] Recraft API error:', err.message);
        return NextResponse.json(
          { error: 'AI generation from reference failed. No token was charged. Please try again.' },
          { status: 502 },
        );
      }
      throw err;
    }

    // Validate and normalize SVG
    const validation = validateAndNormalizeSvg(rawSvg);
    if (!validation.valid) {
      console.error('[ai/upload-reference] SVG validation failed:', validation.errors);
      return NextResponse.json(
        { error: 'Generated SVG failed validation. No token was charged. Please try again.' },
        { status: 502 },
      );
    }

    // Deduct token AFTER successful generation
    const tokenResult = isTeamContext
      ? await deductTeamTokens(teamId!, 1)
      : await deductTokens(userId, 1);
    if (!tokenResult.success) {
      return NextResponse.json(
        { error: 'Forbidden', reason: 'Insufficient token balance.' },
        { status: 403 },
      );
    }

    const resolvedAnimation = animation || suggestAnimation(prompt);
    const resolvedTrigger = trigger || suggestTrigger(prompt);
    const iconName = prompt.slice(0, 80).replace(/[^a-zA-Z0-9\s-]/g, '').trim() || 'Reference Icon';

    const componentCode = generateReactComponent({
      name: iconName,
      svgCode: validation.svg,
      animation: resolvedAnimation,
      trigger: resolvedTrigger,
      duration,
    });

    // Save to database with reference image URL
    const [savedIcon] = await db
      .insert(generatedIcons)
      .values({
        clerkUserId: userId,
        teamId: isTeamContext ? teamId : null,
        name: iconName,
        prompt,
        style: style as IconStyle,
        animation: resolvedAnimation,
        trigger: resolvedTrigger,
        svgCode: validation.svg,
        componentCode,
        previewUrl: '',
        blobStorageKey: blobKey,
        referenceImageUrl: blob.url,
      })
      .returning({ id: generatedIcons.id });

    return NextResponse.json({
      iconId: savedIcon.id,
      svgCode: validation.svg,
      componentCode,
      referenceImageUrl: blob.url,
      suggestedAnimation: resolvedAnimation,
      suggestedTrigger: resolvedTrigger,
      tokensRemaining: tokenResult.remaining,
    });
  } catch (error) {
    if (error instanceof NextResponse) return error;
    console.error('[ai/upload-reference] Unexpected error:', error);
    return NextResponse.json(
      { error: "We couldn't generate this icon from reference. No token was charged. Please try again." },
      { status: 500 },
    );
  }
}
