import { FunctionComponent } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { SearchBar } from './components/SearchBar';
import { CategoryTabs } from './components/CategoryTabs';
import { IconGrid } from './components/IconGrid';
import { LivePreview } from './components/LivePreview';
import { CustomizePanel } from './components/CustomizePanel';
import { ExportPanel } from './components/ExportPanel';
import { ActionButtons } from './components/ActionButtons';
import { allIcons } from './store';

export const App: FunctionComponent = () => {
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      // Verify icons loaded
      console.log('[LivelyIcons] Initializing, icons count:', allIcons.value?.length || 0);
      if (allIcons.value && allIcons.value.length > 0) {
        setReady(true);
      } else {
        setError('No icons loaded');
      }
    } catch (e) {
      console.error('[LivelyIcons] Error:', e);
      setError(String(e));
    }
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'var(--figma-color-text)' }}>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div style={{ padding: '20px', color: 'var(--figma-color-text)' }}>
        <p>Loading icons...</p>
      </div>
    );
  }

  return (
    <div class="app-container">
      <div class="app-header">
        <SearchBar />
      </div>

      <div class="app-category-bar">
        <CategoryTabs />
      </div>

      <div class="app-main">
        <IconGrid />
      </div>

      <div class="app-sidebar">
        <LivePreview />
        <CustomizePanel />
        <ExportPanel />
      </div>

      <div class="app-footer">
        <ActionButtons />
      </div>
    </div>
  );
};
