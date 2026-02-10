/**
 * Image reference validation utilities for image-to-icon upload.
 * Validates uploaded images before sending to the AI pipeline.
 */

const ALLOWED_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/webp',
] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MIN_DIMENSION = 64;
const MAX_DIMENSION = 4096;

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export interface ImageValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate an uploaded image file for use as a reference.
 */
export function validateReferenceImage(
  file: File,
): ImageValidationResult {
  const errors: string[] = [];

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.includes(file.type as AllowedMimeType)) {
    errors.push(
      `Invalid file type: ${file.type}. Allowed types: PNG, JPG, SVG, WebP.`,
    );
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    errors.push(
      `File too large: ${(file.size / 1024 / 1024).toFixed(1)}MB. Maximum size is 5MB.`,
    );
  }

  if (file.size === 0) {
    errors.push('File is empty.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate image dimensions from an ArrayBuffer.
 * For non-SVG images, checks minimum dimensions.
 */
export async function validateImageDimensions(
  buffer: ArrayBuffer,
  mimeType: string,
): Promise<ImageValidationResult> {
  const errors: string[] = [];

  // SVGs don't need dimension validation
  if (mimeType === 'image/svg+xml') {
    return { valid: true, errors: [] };
  }

  // For raster images, we can check the header bytes for dimensions
  const bytes = new Uint8Array(buffer);

  if (mimeType === 'image/png') {
    const dimensions = getPngDimensions(bytes);
    if (dimensions) {
      if (dimensions.width < MIN_DIMENSION || dimensions.height < MIN_DIMENSION) {
        errors.push(`Image too small: ${dimensions.width}x${dimensions.height}. Minimum is ${MIN_DIMENSION}x${MIN_DIMENSION}.`);
      }
      if (dimensions.width > MAX_DIMENSION || dimensions.height > MAX_DIMENSION) {
        errors.push(`Image too large: ${dimensions.width}x${dimensions.height}. Maximum is ${MAX_DIMENSION}x${MAX_DIMENSION}.`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Extract dimensions from a PNG file header.
 */
function getPngDimensions(bytes: Uint8Array): { width: number; height: number } | null {
  // PNG header: 8 bytes signature, then IHDR chunk
  // Width at offset 16-19, Height at offset 20-23 (big-endian)
  if (bytes.length < 24) return null;

  // Check PNG signature
  if (bytes[0] !== 0x89 || bytes[1] !== 0x50 || bytes[2] !== 0x4e || bytes[3] !== 0x47) {
    return null;
  }

  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const width = view.getUint32(16);
  const height = view.getUint32(20);

  return { width, height };
}

/**
 * Generate a storage key for a reference image.
 */
export function getReferenceImageKey(userId: string, iconId: string, ext: string): string {
  return `references/${userId}/${iconId}.${ext}`;
}

/**
 * Get the file extension from a MIME type.
 */
export function getExtensionFromMime(mimeType: string): string {
  const mapping: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/svg+xml': 'svg',
    'image/webp': 'webp',
  };
  return mapping[mimeType] ?? 'bin';
}
