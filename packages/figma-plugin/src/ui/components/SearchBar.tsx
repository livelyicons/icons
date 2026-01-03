import { FunctionComponent } from 'preact';
import { searchQuery, setSearchQuery, clearSearch } from '../store';

export const SearchBar: FunctionComponent = () => {
  const handleClear = () => {
    clearSearch();
  };

  return (
    <div class="search-bar">
      <svg class="search-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        class="search-input"
        placeholder="Search icons..."
        value={searchQuery.value}
        onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
      />
      {searchQuery.value && (
        <button
          class="search-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};
