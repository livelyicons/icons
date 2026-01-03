import { signal } from '@preact/signals';
import type { IconData } from '../types/icon';

export const selectedIcon = signal<IconData | null>(null);

export function selectIcon(icon: IconData | null) {
  selectedIcon.value = icon;
}

export function clearSelection() {
  selectedIcon.value = null;
}
