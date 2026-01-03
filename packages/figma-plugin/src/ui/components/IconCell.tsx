import { FunctionComponent } from 'preact';
import type { IconData } from '../types/icon';
import { selectedIcon, selectIcon } from '../store';
import { renderElement } from '../utils/svgRenderer';

interface IconCellProps {
  icon: IconData;
}

export const IconCell: FunctionComponent<IconCellProps> = ({ icon }) => {
  const isSelected = selectedIcon.value?.slug === icon.slug;

  const handleClick = () => {
    selectIcon(icon);
  };

  const elements = icon.elements.map(el => renderElement(el)).join('');
  const svgContent = `<svg viewBox="${icon.viewBox}" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${elements}</svg>`;

  return (
    <button
      class={`icon-cell ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      title={icon.name}
      aria-label={icon.name}
    >
      <div class="icon-cell-content" dangerouslySetInnerHTML={{ __html: svgContent }} />
    </button>
  );
};
