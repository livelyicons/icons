/**
 * Basic content moderation for icon generation prompts.
 * Filters obviously inappropriate content before sending to AI API.
 */

const BLOCKED_PATTERNS = [
  /\b(nude|naked|nsfw|porn|xxx|hentai|explicit)\b/i,
  /\b(weapon|gun|rifle|pistol|bomb|explosive|grenade)\b/i,
  /\b(hate|nazi|swastika|kkk|slur)\b/i,
  /\b(drug|cocaine|heroin|meth)\b/i,
  /\b(gore|blood|mutilat|dismember)\b/i,
];

export interface ModerationResult {
  allowed: boolean;
  reason?: string;
}

/**
 * Check if a prompt passes content moderation.
 */
export function moderatePrompt(prompt: string): ModerationResult {
  // Check length
  if (prompt.length > 500) {
    return { allowed: false, reason: 'Prompt exceeds maximum length of 500 characters.' };
  }

  if (prompt.trim().length < 3) {
    return { allowed: false, reason: 'Prompt is too short. Please provide a more detailed description.' };
  }

  // Check blocked patterns
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(prompt)) {
      return {
        allowed: false,
        reason: 'Your prompt contains content that violates our usage policy. Please modify your description.',
      };
    }
  }

  return { allowed: true };
}
