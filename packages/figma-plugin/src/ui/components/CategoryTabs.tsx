import { FunctionComponent } from 'preact';
import { allCategories, selectedCategory, setCategory, iconsByCategory } from '../store';

export const CategoryTabs: FunctionComponent = () => {
  const categories = ['all', ...allCategories.value];

  const getIconCount = (category: string): number => {
    if (category === 'all') {
      return iconsByCategory.value.size;
    }
    return iconsByCategory.value.get(category)?.length || 0;
  };

  return (
    <div class="category-tabs">
      <div class="category-tabs-scroll">
        {categories.map(category => (
          <button
            key={category}
            class={`category-tab ${selectedCategory.value === category ? 'active' : ''}`}
            onClick={() => setCategory(category)}
          >
            {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};
