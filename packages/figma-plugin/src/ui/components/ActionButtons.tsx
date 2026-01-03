import { FunctionComponent } from 'preact';
import { selectedIcon, iconConfig, exportFormat } from '../store';
import { useFigmaMessage } from '../hooks/useFigmaMessage';
import { generateCode } from '../utils/codeGenerator';
import { renderIconSvg } from '../utils/svgRenderer';

export const ActionButtons: FunctionComponent = () => {
  const { sendMessage } = useFigmaMessage();
  const icon = selectedIcon.value;
  const config = iconConfig.value;
  const format = exportFormat.value;

  const isDisabled = !icon;

  const handleInsert = () => {
    if (!icon) return;

    // Generate SVG string for Figma
    const svgString = renderIconSvg(icon, config);

    sendMessage('insert-icon', {
      name: icon.name,
      svgString,
      size: config.size
    });
  };

  const handleCopyCode = () => {
    if (!icon) return;

    const code = generateCode(icon, config, format);

    // Fallback copy method for Figma iframe (no clipboard API)
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand('copy');
      console.log('Code copied to clipboard');
    } catch (err) {
      console.error('Failed to copy code:', err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  return (
    <div class="action-buttons">
      <button
        class="btn-primary"
        onClick={handleInsert}
        disabled={isDisabled}
      >
        Insert to Figma
      </button>
      <button
        class="btn-secondary"
        onClick={handleCopyCode}
        disabled={isDisabled}
      >
        Copy Code
      </button>
    </div>
  );
};
