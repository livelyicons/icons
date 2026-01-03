import { FunctionComponent } from 'preact';
import { selectedIcon, iconConfig } from '../store';
import { renderElement } from '../utils/svgRenderer';

export const LivePreview: FunctionComponent = () => {
  const icon = selectedIcon.value;
  const config = iconConfig.value;

  if (!icon) {
    return (
      <div class="live-preview">
        <div class="live-preview-placeholder">
          <p>Select an icon to preview</p>
        </div>
      </div>
    );
  }

  const elements = icon.elements.map(el => renderElement(el)).join('');
  const svgContent = `<svg viewBox="${icon.viewBox}" width="${config.size}" height="${config.size}" fill="none" stroke="${config.color}" stroke-width="${config.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${elements}</svg>`;

  return (
    <div class="live-preview">
      <div class="live-preview-icon" dangerouslySetInnerHTML={{ __html: svgContent }} />
      <div class="live-preview-name">{icon.name}</div>
    </div>
  );
};
