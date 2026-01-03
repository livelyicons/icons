import { signal } from '@preact/signals';
import type { IconConfig, ExportFormat } from '../types/icon';

export const iconConfig = signal<IconConfig>({
  size: 24,
  strokeWidth: 2,
  color: '#000000'
});

export const exportFormat = signal<ExportFormat>('svg');

export function updateConfig(updates: Partial<IconConfig>) {
  iconConfig.value = { ...iconConfig.value, ...updates };
}

export function setSize(size: number) {
  updateConfig({ size });
}

export function setStrokeWidth(strokeWidth: number) {
  updateConfig({ strokeWidth });
}

export function setColor(color: string) {
  updateConfig({ color });
}

export function setExportFormat(format: ExportFormat) {
  exportFormat.value = format;
}
