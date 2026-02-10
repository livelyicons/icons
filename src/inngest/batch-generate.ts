import { inngest } from '@/lib/inngest';
import {
  generateSvgWithRecraft,
  validateAndNormalizeSvg,
  buildIconPrompt,
  suggestAnimation,
  suggestTrigger,
  generateReactComponent,
} from '@/lib/ai';
import { db, generatedIcons, batchJobs } from '@/db';
import { eq } from 'drizzle-orm';
import type { IconStyle } from '@/db/schema';

/**
 * Inngest function that processes batch icon generation.
 * Iterates through prompts sequentially, calling the same generation
 * pipeline used by the single-icon endpoint.
 */
export const batchGenerate = inngest.createFunction(
  { id: 'batch-generate' },
  { event: 'batch/generate.start' },
  async ({ event, step }) => {
    const {
      batchId,
      clerkUserId,
      teamId,
      prompts,
      style,
      animation: requestedAnimation,
      trigger: requestedTrigger,
      duration,
    } = event.data as {
      batchId: string;
      clerkUserId: string;
      teamId: string | null;
      prompts: string[];
      style: string;
      animation: string;
      trigger: string;
      duration: number;
    };

    // Mark batch as processing
    await step.run('mark-processing', async () => {
      await db
        .update(batchJobs)
        .set({ status: 'processing' })
        .where(eq(batchJobs.id, batchId));
    });

    const completedIconIds: string[] = [];
    let failedCount = 0;

    for (let i = 0; i < prompts.length; i++) {
      const prompt = prompts[i];

      const result = await step.run(`generate-icon-${i}`, async () => {
        try {
          // Build prompt
          const fullPrompt = buildIconPrompt(prompt, style as IconStyle);

          // Generate SVG
          const rawSvg = await generateSvgWithRecraft({ prompt: fullPrompt, style });

          // Validate
          const validation = validateAndNormalizeSvg(rawSvg);
          if (!validation.valid) {
            console.error(`[batch] SVG validation failed for prompt ${i}:`, validation.errors);
            return { success: false };
          }

          // Resolve animation/trigger
          const resolvedAnimation = requestedAnimation || suggestAnimation(prompt);
          const resolvedTrigger = requestedTrigger || suggestTrigger(prompt);

          const iconName = prompt.slice(0, 80).replace(/[^a-zA-Z0-9\s-]/g, '').trim() || 'Batch Icon';

          // Generate component code
          const componentCode = generateReactComponent({
            name: iconName,
            svgCode: validation.svg,
            animation: resolvedAnimation,
            trigger: resolvedTrigger,
            duration,
          });

          // Save icon
          const [saved] = await db
            .insert(generatedIcons)
            .values({
              clerkUserId,
              teamId: teamId ?? null,
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

          return { success: true, iconId: saved.id } as { success: boolean; iconId: string | null };
        } catch (err) {
          console.error(`[batch] Generation failed for prompt ${i}:`, err);
          return { success: false, iconId: null } as { success: boolean; iconId: string | null };
        }
      });

      // Update progress
      if (result.success && 'iconId' in result && result.iconId) {
        completedIconIds.push(result.iconId as string);
      } else {
        failedCount++;
      }

      await step.run(`update-progress-${i}`, async () => {
        await db
          .update(batchJobs)
          .set({
            completedCount: completedIconIds.length,
            failedCount,
            iconIds: completedIconIds,
          })
          .where(eq(batchJobs.id, batchId));
      });
    }

    // Mark batch as completed
    await step.run('mark-completed', async () => {
      await db
        .update(batchJobs)
        .set({
          status: failedCount === prompts.length ? 'failed' : 'completed',
          completedCount: completedIconIds.length,
          failedCount,
          iconIds: completedIconIds,
          completedAt: new Date(),
        })
        .where(eq(batchJobs.id, batchId));
    });

    return {
      batchId,
      completed: completedIconIds.length,
      failed: failedCount,
      total: prompts.length,
    };
  },
);
