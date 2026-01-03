import { signal, computed } from '@preact/signals';
import type { IconData } from '../types/icon';
import { allIcons, iconsByCategory } from './icons';

export const searchQuery = signal<string>('');
export const selectedCategory = signal<string>('all');

// Filtered icons based on search and category
export const filteredIcons = computed<IconData[]>(() => {
  let icons = allIcons.value;

  // Filter by category first
  if (selectedCategory.value !== 'all') {
    icons = iconsByCategory.value.get(selectedCategory.value) || [];
  }

  // Then filter by search query
  const query = searchQuery.value.toLowerCase().trim();
  if (query) {
    icons = icons.filter(icon => {
      const nameMatch = icon.name.toLowerCase().includes(query);
      const slugMatch = icon.slug.toLowerCase().includes(query);
      const keywordMatch = icon.keywords.some(kw => kw.toLowerCase().includes(query));
      const categoryMatch = icon.categories.some(cat => cat.toLowerCase().includes(query));

      return nameMatch || slugMatch || keywordMatch || categoryMatch;
    });
  }

  return icons;
});

export function setSearchQuery(query: string) {
  searchQuery.value = query;
}

export function clearSearch() {
  searchQuery.value = '';
}

export function setCategory(category: string) {
  selectedCategory.value = category;
}
