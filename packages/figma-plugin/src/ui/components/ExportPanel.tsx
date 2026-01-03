import { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { exportFormat, setExportFormat } from '../store';
import type { ExportFormat } from '../types/icon';

const EXPORT_FORMATS: { value: ExportFormat; label: string }[] = [
  { value: 'svg', label: 'SVG' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' }
];

export const ExportPanel: FunctionComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentFormat = exportFormat.value;

  return (
    <div class="export-panel">
      <button
        class="panel-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span class="panel-title">
          {isExpanded ? '▾' : '▸'} EXPORT AS
        </span>
      </button>

      {isExpanded && (
        <div class="panel-content">
          <div class="export-options">
            {EXPORT_FORMATS.map(format => (
              <label key={format.value} class="export-option">
                <input
                  type="radio"
                  name="export-format"
                  value={format.value}
                  checked={currentFormat === format.value}
                  onChange={() => setExportFormat(format.value)}
                />
                <span class="export-label">{format.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
