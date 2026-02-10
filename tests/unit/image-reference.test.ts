import { describe, it, expect } from 'vitest';
import {
  validateReferenceImage,
  getReferenceImageKey,
  getExtensionFromMime,
} from '@/lib/ai/image-reference';

describe('Image Reference Validation', () => {
  describe('validateReferenceImage', () => {
    it('rejects files that are too large', () => {
      const file = new File([new ArrayBuffer(6 * 1024 * 1024)], 'big.png', {
        type: 'image/png',
      });
      const result = validateReferenceImage(file);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('too large');
    });

    it('rejects unsupported MIME types', () => {
      const file = new File(['test'], 'file.bmp', { type: 'image/bmp' });
      const result = validateReferenceImage(file);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('Invalid file type');
    });

    it('accepts valid PNG files', () => {
      const file = new File(['test-png-content'], 'icon.png', {
        type: 'image/png',
      });
      const result = validateReferenceImage(file);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('accepts valid SVG files', () => {
      const file = new File(['<svg></svg>'], 'icon.svg', {
        type: 'image/svg+xml',
      });
      const result = validateReferenceImage(file);
      expect(result.valid).toBe(true);
    });

    it('accepts valid WebP files', () => {
      const file = new File(['webp-data'], 'icon.webp', {
        type: 'image/webp',
      });
      const result = validateReferenceImage(file);
      expect(result.valid).toBe(true);
    });

    it('rejects empty files', () => {
      const file = new File([], 'empty.png', { type: 'image/png' });
      const result = validateReferenceImage(file);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('empty');
    });
  });

  describe('getReferenceImageKey', () => {
    it('generates correct storage path', () => {
      const key = getReferenceImageKey('user123', 'icon456', 'png');
      expect(key).toBe('references/user123/icon456.png');
    });
  });

  describe('getExtensionFromMime', () => {
    it('maps PNG correctly', () => {
      expect(getExtensionFromMime('image/png')).toBe('png');
    });

    it('maps JPEG correctly', () => {
      expect(getExtensionFromMime('image/jpeg')).toBe('jpg');
    });

    it('maps SVG correctly', () => {
      expect(getExtensionFromMime('image/svg+xml')).toBe('svg');
    });

    it('maps WebP correctly', () => {
      expect(getExtensionFromMime('image/webp')).toBe('webp');
    });

    it('falls back to bin for unknown types', () => {
      expect(getExtensionFromMime('application/octet-stream')).toBe('bin');
    });
  });
});
