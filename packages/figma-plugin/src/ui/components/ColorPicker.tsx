import { FunctionComponent } from 'preact';
import { iconConfig, setColor } from '../store';

export const ColorPicker: FunctionComponent = () => {
  const config = iconConfig.value;

  const handleColorChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setColor(target.value);
  };

  const handleHexInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    let value = target.value;

    // Ensure it starts with #
    if (!value.startsWith('#')) {
      value = '#' + value;
    }

    // Validate hex color (3 or 6 digits)
    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value)) {
      setColor(value);
    }
  };

  return (
    <div class="color-picker">
      <input
        type="text"
        class="color-input"
        value={config.color}
        onInput={handleHexInput}
        placeholder="#000000"
        maxLength={7}
      />
      <div class="color-swatch-wrapper">
        <input
          type="color"
          class="color-swatch-input"
          value={config.color}
          onInput={handleColorChange}
          style={{ backgroundColor: config.color }}
        />
      </div>
    </div>
  );
};
