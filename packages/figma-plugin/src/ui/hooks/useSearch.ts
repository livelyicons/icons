import { useMemo } from 'preact/hooks';
import Fuse from 'fuse.js';
import type { IconData } from '../types/icon';

export function useSearch(icons: IconData[], query: string): IconData[] {
  const fuse = useMemo(() => {
    return new Fuse(icons, {
      keys: ['name', 'keywords', 'categories'],
      threshold: 0.3,
      includeScore: true,
      minMatchCharLength: 2
    });
  }, [icons]);

  return useMemo(() => {
    if (!query.trim()) {
      return icons;
    }

    const results = fuse.search(query);
    return results.map(result => result.item);
  }, [fuse, query, icons]);
}
