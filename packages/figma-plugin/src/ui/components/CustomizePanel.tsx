import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { iconConfig, setSize, setStrokeWidth } from '../store';
import { ColorPicker } from './ColorPicker';

const SIZE_OPTIONS = [16, 24, 32, 48, 64];

export const CustomizePanel: FunctionComponent = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const config = iconConfig.value;

  const handleStrokeChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setStrokeWidth(parseFloat(target.value));
  };

  return (
    <div class="customize-panel">
      <button
        class="panel-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span class="panel-title">
          {isExpanded ? '▾' : '▸'} CUSTOMIZE
        </span>
      </button>

      {isExpanded && (
        <div class="panel-content">
          <div class="control-group">
            <label class="control-label">Size</label>
            <div class="size-options">
              {SIZE_OPTIONS.map(size => (
                <button
                  key={size}
                  class={`size-option ${config.size === size ? 'active' : ''}`}
                  onClick={() => setSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">
              Stroke Width: {config.strokeWidth.toFixed(1)}
            </label>
            <input
              type="range"
              class="stroke-slider"
              min="0.5"
              max="4"
              step="0.1"
              value={config.strokeWidth}
              onInput={handleStrokeChange}
            />
          </div>

          <div class="control-group">
            <label class="control-label">Color</label>
            <ColorPicker />
          </div>
        </div>
      )}
    </div>
  );
};
