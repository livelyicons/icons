import { FunctionComponent } from 'preact';
import { filteredIcons } from '../store';
import { IconCell } from './IconCell';

export const IconGrid: FunctionComponent = () => {
  const icons = filteredIcons.value;

  if (icons.length === 0) {
    return (
      <div class="icon-grid-empty">
        <p>No icons found</p>
      </div>
    );
  }

  return (
    <div class="icon-grid-container">
      <div class="icon-grid">
        {icons.map(icon => (
          <IconCell key={icon.slug} icon={icon} />
        ))}
      </div>
      <div class="icon-grid-footer">
        <span class="icon-count">{icons.length} icon{icons.length !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
};
