'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';

// Security: All SVG content is sanitized via DOMPurify.sanitize() with SVG profile
// before rendering, consistent with the pattern in AIGeneratePanel.tsx and MyIconsPanel.tsx.

interface IconEditorProps {
  iconId: string;
  initialSvg: string;
  iconName: string;
  onSave: (svgCode: string) => Promise<{ success: boolean; warnings?: string[] }>;
  onClose: () => void;
}

/**
 * SVG code editor with live preview, validation, and undo/redo.
 * Uses a plain textarea with syntax-aware features instead of Monaco
 * to keep the bundle size manageable for the initial release.
 */
export function IconEditor({ iconId: _iconId, initialSvg, iconName, onSave, onClose }: IconEditorProps) {
  const [svgCode, setSvgCode] = useState(initialSvg);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [strokeWeight, setStrokeWeight] = useState<number>(getStrokeWeight(initialSvg));

  // Undo/redo stack
  const [history, setHistory] = useState<string[]>([initialSvg]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const pushHistory = useCallback((code: string) => {
    setHistory((prev) => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push(code);
      if (newHistory.length > 50) newHistory.shift();
      return newHistory;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const handleCodeChange = useCallback((value: string) => {
    setSvgCode(value);
    setError(null);
    pushHistory(value);
  }, [pushHistory]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setSvgCode(history[newIndex]);
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setSvgCode(history[newIndex]);
    }
  }, [history, historyIndex]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError(null);
    setWarnings([]);
    try {
      const result = await onSave(svgCode);
      if (result.success && result.warnings && result.warnings.length > 0) {
        setWarnings(result.warnings);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  }, [onSave, svgCode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo, handleSave]);

  // Stroke weight adjustment
  const handleStrokeWeightChange = useCallback((weight: number) => {
    setStrokeWeight(weight);
    const updated = svgCode.replace(
      /stroke-width\s*=\s*"[^"]*"/g,
      `stroke-width="${weight}"`,
    );
    setSvgCode(updated);
    pushHistory(updated);
  }, [svgCode, pushHistory]);

  // Content is sanitized via DOMPurify before rendering
  const sanitizedPreview = useMemo(
    () => DOMPurify.sanitize(svgCode, { USE_PROFILES: { svg: true, svgFilters: true } }),
    [svgCode],
  );

  const isValidSvg = useMemo(() => {
    return svgCode.includes('<svg') && svgCode.includes('</svg>');
  }, [svgCode]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-[#1a1a1a] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div>
            <h2 className="text-lg font-semibold text-white">Edit SVG — {iconName}</h2>
            <p className="text-xs text-white/40 mt-0.5">
              Cmd+Z to undo, Cmd+Shift+Z to redo, Cmd+S to save
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 disabled:opacity-30"
              title="Undo (Cmd+Z)"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 disabled:opacity-30"
              title="Redo (Cmd+Shift+Z)"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
              </svg>
            </button>
            <button onClick={onClose} className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body: Editor + Preview */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Code Editor */}
          <div className="flex-1 flex flex-col border-r border-white/10">
            <textarea
              ref={textareaRef}
              value={svgCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="flex-1 p-4 bg-transparent text-white font-mono text-sm leading-6 resize-none focus:outline-none"
              spellCheck={false}
            />
          </div>

          {/* Right: Preview + Controls */}
          <div className="w-80 flex flex-col">
            {/* Live Preview — SVG sanitized via DOMPurify above */}
            <div className="flex-1 flex items-center justify-center p-6 bg-white/5">
              {isValidSvg ? (
                <SanitizedSvgPreview html={sanitizedPreview} />
              ) : (
                <p className="text-red-400 text-sm text-center">Invalid SVG — preview unavailable</p>
              )}
            </div>

            {/* Controls */}
            <div className="p-4 space-y-4 border-t border-white/10">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-white/60">Stroke Weight</span>
                  <span className="text-xs text-white/40">{strokeWeight}px</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={5}
                  step={0.25}
                  value={strokeWeight}
                  onChange={(e) => handleStrokeWeightChange(parseFloat(e.target.value))}
                  className="w-full accent-[#00ff88]"
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  {error}
                </div>
              )}

              {warnings.length > 0 && (
                <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs">
                  {warnings.map((w, i) => (
                    <p key={i}>{w}</p>
                  ))}
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={saving || !isValidSvg}
                className="w-full py-2.5 rounded-lg bg-[#00ff88] text-black font-medium text-sm hover:bg-[#00ff88]/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders DOMPurify-sanitized SVG using a ref-based approach
 * instead of dangerouslySetInnerHTML.
 */
function SanitizedSvgPreview({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Clear existing children safely
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    // Parse sanitized HTML via DOMParser (safe: already DOMPurify-cleaned)
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'image/svg+xml');
    const svgEl = doc.documentElement;
    if (svgEl && svgEl.tagName === 'svg' && !doc.querySelector('parsererror')) {
      containerRef.current.appendChild(document.importNode(svgEl, true));
    }
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="w-40 h-40 [&>svg]:w-full [&>svg]:h-full text-white"
    />
  );
}

/**
 * Extract the first stroke-width value from an SVG string.
 */
function getStrokeWeight(svg: string): number {
  const match = svg.match(/stroke-width\s*=\s*"([^"]*)"/);
  return match ? parseFloat(match[1]) || 2 : 2;
}
