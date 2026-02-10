'use client';

import { useState, useMemo } from 'react';
import { useUser } from '@clerk/nextjs';
import DOMPurify from 'dompurify';

// SVG content is sanitized via DOMPurify before rendering — see sanitizedPreview below

const STYLES = [
  { value: 'line', label: 'Line Art' },
  { value: 'solid', label: 'Solid Glyph' },
  { value: 'outline', label: 'Outline' },
  { value: 'duotone', label: 'Duotone' },
  { value: 'pixel', label: 'Pixel Art' },
  { value: 'isometric', label: 'Isometric' },
  { value: 'hand-drawn', label: 'Hand-Drawn' },
] as const;

const ANIMATIONS = [
  'scale', 'rotate', 'translate', 'shake', 'pulse', 'bounce',
  'draw', 'spin', 'ring', 'wiggle', 'heartbeat', 'swing', 'float', 'none',
] as const;

const TRIGGERS = [
  { value: 'hover', label: 'Hover' },
  { value: 'loop', label: 'Loop' },
  { value: 'mount', label: 'On Mount' },
  { value: 'inView', label: 'In View' },
] as const;

interface GeneratedVariant {
  iconId: string;
  svgCode: string;
  componentCode: string;
  suggestedAnimation: string;
  suggestedTrigger: string;
}

interface AIGeneratePanelProps {
  onAuthRequired: () => void;
  onIconGenerated?: () => void;
}

export function AIGeneratePanel({ onAuthRequired, onIconGenerated }: AIGeneratePanelProps) {
  const { isSignedIn } = useUser();

  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState<string>('line');
  const [animation, setAnimation] = useState<string>('');
  const [trigger, setTrigger] = useState<string>('hover');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [duration, setDuration] = useState(0.5);

  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<GeneratedVariant | null>(null);
  const [tokensRemaining, setTokensRemaining] = useState<number | null>(null);

  const [exportFormat, setExportFormat] = useState<'react' | 'vue' | 'svg' | 'html'>('react');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!isSignedIn) {
      onAuthRequired();
      return;
    }

    if (!prompt.trim()) {
      setError('Please enter a description for your icon.');
      return;
    }

    setGenerating(true);
    setError(null);
    setSelectedVariant(null);

    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt.trim(),
          style,
          animation: animation || undefined,
          trigger,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        if (res.status === 429) {
          setError(data.message || 'Rate limit exceeded. Please try again later.');
        } else if (res.status === 403) {
          setError(data.reason || 'Unable to generate. Please check your token balance.');
        } else if (res.status === 400) {
          setError(data.reason || data.error || 'Invalid request. Please adjust your prompt.');
        } else {
          setError("We couldn't generate this icon. No token was charged. Please try again.");
        }
        return;
      }

      const data = await res.json();
      const variant: GeneratedVariant = {
        iconId: data.iconId,
        svgCode: data.svgCode,
        componentCode: data.componentCode,
        suggestedAnimation: data.suggestedAnimation,
        suggestedTrigger: data.suggestedTrigger,
      };
      setSelectedVariant(variant);
      setTokensRemaining(data.tokensRemaining);

      if (!animation) {
        setAnimation(data.suggestedAnimation);
      }

      onIconGenerated?.();
    } catch {
      setError("We couldn't generate this icon. No token was charged. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyCode = async () => {
    if (!selectedVariant) return;
    await navigator.clipboard.writeText(selectedVariant.componentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySvg = async () => {
    if (!selectedVariant) return;
    await navigator.clipboard.writeText(selectedVariant.svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Sanitized SVG for safe rendering via DOMPurify
  const sanitizedPreview = useMemo(
    () => selectedVariant
      ? DOMPurify.sanitize(selectedVariant.svgCode, { USE_PROFILES: { svg: true, svgFilters: true } })
      : '',
    [selectedVariant],
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Generator Controls */}
      <div className="space-y-5">
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-2">Describe your icon</h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A rocket ship launching into space..."
            rows={3}
            maxLength={500}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00ff88]/50 resize-none"
          />
          <p className="text-xs text-white/30 mt-1">{prompt.length}/500</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white/60 mb-2">Style</h3>
          <div className="grid grid-cols-4 gap-2">
            {STYLES.map((s) => (
              <button
                key={s.value}
                onClick={() => setStyle(s.value)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  style === s.value
                    ? 'bg-[#00ff88]/20 border border-[#00ff88]/50 text-[#00ff88]'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:border-white/20'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white/60 mb-2">Animation</h3>
          <select
            value={animation}
            onChange={(e) => setAnimation(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#00ff88]/50"
          >
            <option value="">Auto-suggest</option>
            {ANIMATIONS.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white/60 mb-2">Trigger</h3>
          <div className="grid grid-cols-4 gap-2">
            {TRIGGERS.map((t) => (
              <button
                key={t.value}
                onClick={() => setTrigger(t.value)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  trigger === t.value
                    ? 'bg-[#00ff88]/20 border border-[#00ff88]/50 text-[#00ff88]'
                    : 'bg-white/5 border border-white/10 text-white/60 hover:border-white/20'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-sm text-white/40 hover:text-white/60 flex items-center gap-1"
        >
          <svg className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Advanced settings
        </button>

        {showAdvanced && (
          <div className="space-y-4 pl-5 border-l border-white/10">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-white/60">Duration</span>
                <span className="text-sm text-white/40">{duration}s</span>
              </div>
              <input
                type="range"
                min={0.1}
                max={3}
                step={0.1}
                value={duration}
                onChange={(e) => setDuration(parseFloat(e.target.value))}
                className="w-full accent-[#00ff88]"
              />
            </div>
          </div>
        )}

        <button
          onClick={handleGenerate}
          disabled={generating || !prompt.trim()}
          className="w-full py-3 rounded-xl bg-[#00ff88] text-black font-semibold text-base hover:bg-[#00ff88]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {generating ? (
            <>
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            'Generate — 1 token'
          )}
        </button>

        {tokensRemaining !== null && (
          <p className="text-center text-sm text-white/40">Balance: {tokensRemaining} tokens</p>
        )}

        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
            <button
              onClick={() => { setError(null); handleGenerate(); }}
              className="block mt-2 text-red-300 hover:text-red-200 underline"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      {/* Right: Preview */}
      <div className="space-y-5">
        {!selectedVariant && !generating && (
          <div className="flex flex-col items-center justify-center h-80 bg-white/5 border border-white/10 rounded-2xl">
            <svg className="w-16 h-16 text-white/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-white/40 text-center">
              Describe an icon and click Generate<br />to see your creation here
            </p>
          </div>
        )}

        {generating && (
          <div className="flex flex-col items-center justify-center h-80 bg-white/5 border border-white/10 rounded-2xl">
            <div className="w-12 h-12 border-3 border-[#00ff88]/20 border-t-[#00ff88] rounded-full animate-spin mb-4" />
            <p className="text-white/60">Generating your icon...</p>
            <p className="text-white/30 text-sm mt-1">This may take 3-8 seconds</p>
          </div>
        )}

        {selectedVariant && !generating && (
          <>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center min-h-[240px]">
              {/* SVG sanitized via DOMPurify above */}
              <div
                className="w-32 h-32 [&>svg]:w-full [&>svg]:h-full text-white"
                dangerouslySetInnerHTML={{ __html: sanitizedPreview }}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-white/60 mb-2">Animation</h3>
              <div className="flex flex-wrap gap-1.5">
                {ANIMATIONS.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAnimation(a)}
                    className={`px-2.5 py-1 rounded-md text-xs transition-colors ${
                      animation === a
                        ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40'
                        : 'bg-white/5 text-white/50 hover:text-white/70 border border-transparent'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as typeof exportFormat)}
                className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none"
              >
                <option value="react">React TSX</option>
                <option value="vue">Vue SFC</option>
                <option value="svg">Static SVG</option>
                <option value="html">Vanilla HTML</option>
              </select>
              <button
                onClick={exportFormat === 'svg' ? handleCopySvg : handleCopyCode}
                className="flex-1 py-2 rounded-lg bg-[#00ff88] text-black font-medium text-sm hover:bg-[#00ff88]/90 flex items-center justify-center gap-2"
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-2.5 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5 flex items-center justify-center gap-2"
            >
              Regenerate (1 token)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
