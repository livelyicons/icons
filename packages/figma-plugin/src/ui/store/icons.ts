import { signal, computed } from '@preact/signals';
import type { IconData, IconManifest } from '../types/icon';
import iconManifest from '../../data/icons.json';

// Load icons from manifest
const manifest = iconManifest as IconManifest;

export const allIcons = signal<IconData[]>(manifest.icons);
export const totalIconCount = signal<number>(manifest.totalCount);

// Get all unique categories
export const allCategories = computed(() => {
  const categorySet = new Set<string>();
  allIcons.value.forEach(icon => {
    icon.categories.forEach(cat => categorySet.add(cat));
  });
  return Array.from(categorySet).sort();
});

// Index icons by category for fast filtering
export const iconsByCategory = computed(() => {
  const map = new Map<string, IconData[]>();

  allIcons.value.forEach(icon => {
    icon.categories.forEach(category => {
      if (!map.has(category)) {
        map.set(category, []);
      }
      map.get(category)!.push(icon);
    });
  });

  return map;
});
