'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/nextjs';
import DOMPurify from 'dompurify';
import { IconEditor } from './IconEditor';

// SVG content is sanitized via DOMPurify before rendering — see sanitizedPreview below

interface StyleTemplate {
  id: string;
  name: string;
  promptModifier: string | null;
  style: string | null;
  color: string | null;
  strokeWeight: number | null;
  animation: string | null;
  trigger: string | null;
  duration: number | null;
}

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

/**
 * Renders DOMPurify-sanitized SVG via a ref-based approach
 * instead of dangerouslySetInnerHTML.
 */
function SafeSvgPreview({ html, className }: { html: string; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'image/svg+xml');
    const svgEl = doc.documentElement;
    if (svgEl && svgEl.tagName === 'svg' && !doc.querySelector('parsererror')) {
      containerRef.current.appendChild(document.importNode(svgEl, true));
    }
  }, [html]);

  return <div ref={containerRef} className={className} />;
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

  // Phase 2: Templates
  const [templates, setTemplates] = useState<StyleTemplate[]>([]);
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [savingTemplate, setSavingTemplate] = useState(false);

  // Phase 2: Refinement
  const [showRefine, setShowRefine] = useState(false);
  const [refineInstruction, setRefineInstruction] = useState('');
  const [refining, setRefining] = useState(false);

  // Phase 2: Image-to-Icon reference upload
  const [referenceImage, setReferenceImage] = useState<File | null>(null);
  const [referencePreview, setReferencePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Phase 2: SVG Editor
  const [showEditor, setShowEditor] = useState(false);

  // Phase 2: Animated export
  const [animatedExporting, setAnimatedExporting] = useState(false);

  // Phase 3: Team context
  const [teamContext, setTeamContext] = useState<{ id: string; name: string; slug: string } | null>(null);
  const [userTeams, setUserTeams] = useState<Array<{ id: string; name: string; slug: string }>>([]);
  const [teamTokenBalance, setTeamTokenBalance] = useState<number | null>(null);

  // Load templates on mount
  useEffect(() => {
    if (!isSignedIn) return;
    fetch('/api/user/templates')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.templates) setTemplates(data.templates);
      })
      .catch(() => {});
  }, [isSignedIn]);

  // Phase 3: Load user's teams
  useEffect(() => {
    if (!isSignedIn) return;
    fetch('/api/teams')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.teams) setUserTeams(data.teams);
      })
      .catch(() => {});
  }, [isSignedIn]);

  // Phase 3: Load team token balance when team context changes
  useEffect(() => {
    if (!teamContext) {
      setTeamTokenBalance(null);
      return;
    }
    fetch(`/api/teams/${teamContext.id}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.team) setTeamTokenBalance(data.tokenBalance ?? null);
      })
      .catch(() => {});
  }, [teamContext]);

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
      let res: Response;

      if (referenceImage) {
        // Image-to-icon: multipart upload to /api/ai/upload-reference
        const formData = new FormData();
        formData.append('image', referenceImage);
        formData.append('prompt', prompt.trim());
        formData.append('style', style);
        if (animation) formData.append('animation', animation);
        formData.append('trigger', trigger);
        formData.append('duration', String(duration));
        if (teamContext) formData.append('teamId', teamContext.id);

        res = await fetch('/api/ai/upload-reference', {
          method: 'POST',
          body: formData,
        });
      } else {
        res = await fetch('/api/ai/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: prompt.trim(),
            style,
            animation: animation || undefined,
            trigger,
            teamId: teamContext?.id,
          }),
        });
      }

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

  // Phase 2: Apply a style template to the generation form
  const handleApplyTemplate = useCallback((template: StyleTemplate) => {
    if (template.promptModifier) {
      setPrompt((prev) => (prev ? template.promptModifier + ' ' + prev : template.promptModifier ?? ''));
    }
    if (template.style) setStyle(template.style);
    if (template.animation) setAnimation(template.animation);
    if (template.trigger) setTrigger(template.trigger);
    if (template.duration) setDuration(template.duration);
  }, []);

  // Phase 2: Save current settings as a reusable template
  const handleSaveTemplate = async () => {
    if (!templateName.trim()) return;
    setSavingTemplate(true);
    try {
      const res = await fetch('/api/user/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: templateName.trim(),
          promptModifier: prompt || undefined,
          style,
          animation: animation || undefined,
          trigger,
          duration,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setTemplates((prev) => [...prev, data.template]);
        setShowSaveTemplate(false);
        setTemplateName('');
      }
    } catch {
      // silent
    } finally {
      setSavingTemplate(false);
    }
  };

  // Phase 2: Refine an existing icon with a text instruction
  const handleRefine = async () => {
    if (!selectedVariant || !refineInstruction.trim()) return;
    setRefining(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          iconId: selectedVariant.iconId,
          instruction: refineInstruction.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Refinement failed.');
        return;
      }
      const data = await res.json();
      // Refine inherits animation from parent — keep current UI settings
      setSelectedVariant({
        iconId: data.iconId,
        svgCode: data.svgCode,
        componentCode: data.componentCode,
        suggestedAnimation: selectedVariant.suggestedAnimation,
        suggestedTrigger: selectedVariant.suggestedTrigger,
      });
      setTokensRemaining(data.tokensRemaining);
      setRefineInstruction('');
      setShowRefine(false);
      onIconGenerated?.();
    } catch {
      setError('Refinement failed. Please try again.');
    } finally {
      setRefining(false);
    }
  };

  // Phase 2: Image upload handlers for image-to-icon
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.');
      return;
    }
    const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Unsupported image type. Use PNG, JPG, SVG, or WebP.');
      return;
    }
    setReferenceImage(file);
    setReferencePreview(URL.createObjectURL(file));
    setError(null);
  };

  const handleClearImage = () => {
    setReferenceImage(null);
    if (referencePreview) URL.revokeObjectURL(referencePreview);
    setReferencePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Phase 2: Save manual SVG edits from the IconEditor
  const handleEditorSave = async (svgCode: string) => {
    if (!selectedVariant) return { success: false };
    try {
      const res = await fetch(`/api/user/library/${selectedVariant.iconId}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ svgCode }),
      });
      if (!res.ok) {
        const data = await res.json();
        return { success: false, warnings: [data.error || 'Save failed'] };
      }
      const data = await res.json();
      setSelectedVariant((prev) =>
        prev
          ? { ...prev, svgCode: data.icon.svgCode, componentCode: data.icon.componentCode }
          : null,
      );
      return { success: true, warnings: data.warnings };
    } catch {
      return { success: false, warnings: ['Save failed'] };
    }
  };

  // Phase 2: Download animated SVG or GIF export
  const handleAnimatedExport = async (format: 'animated-svg' | 'gif') => {
    if (!selectedVariant) return;
    setAnimatedExporting(true);
    setError(null);
    try {
      const res = await fetch(`/api/user/library/${selectedVariant.iconId}/export-animated`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ format }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Animated export failed.');
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = format === 'gif' ? 'icon.gif' : 'icon-animated.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError('Animated export failed.');
    } finally {
      setAnimatedExporting(false);
    }
  };

  // Content is sanitized via DOMPurify before rendering
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
        {/* Template Picker */}
        {templates.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-white/60 mb-2">Style Template</h3>
            <div className="flex flex-wrap gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleApplyTemplate(t)}
                  className="px-3 py-1.5 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60 hover:border-[#00ff88]/30 hover:text-[#00ff88] transition-colors"
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        )}

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

        {/* Image-to-Icon Reference Upload */}
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-2">Reference Image (optional)</h3>
          {referencePreview ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <img
                src={referencePreview}
                alt="Reference"
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{referenceImage?.name}</p>
                <p className="text-xs text-white/40">
                  {referenceImage && (referenceImage.size / 1024).toFixed(0)}KB
                </p>
              </div>
              <button
                onClick={handleClearImage}
                className="p-1.5 rounded-md bg-white/10 hover:bg-red-500/20 text-white/60 hover:text-red-400"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-[#00ff88]/30 text-white/40 hover:text-white/60 transition-colors text-sm text-center"
            >
              Drop an image or click to upload (PNG, JPG, SVG, WebP — max 5MB)
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            onChange={handleImageSelect}
            className="hidden"
          />
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

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-white/40 hover:text-white/60 flex items-center gap-1"
          >
            <svg className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Advanced settings
          </button>
          <button
            onClick={() => setShowSaveTemplate(true)}
            className="text-sm text-[#00ff88]/60 hover:text-[#00ff88] flex items-center gap-1 ml-auto"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save as Template
          </button>
        </div>

        {/* Save Template Form */}
        {showSaveTemplate && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Template name..."
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00ff88]/50 text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleSaveTemplate()}
            />
            <div className="flex gap-2">
              <button
                onClick={() => { setShowSaveTemplate(false); setTemplateName(''); }}
                className="flex-1 py-2 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                disabled={savingTemplate || !templateName.trim()}
                className="flex-1 py-2 rounded-lg bg-[#00ff88] text-black font-medium text-sm hover:bg-[#00ff88]/90 disabled:opacity-50"
              >
                {savingTemplate ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}

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

        {/* Phase 3: Team context toggle */}
        {userTeams.length > 0 && (
          <div className="flex items-center gap-2">
            <select
              value={teamContext?.id ?? ''}
              onChange={(e) => {
                const team = userTeams.find((t) => t.id === e.target.value);
                setTeamContext(team ?? null);
              }}
              className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00ff88]/50"
            >
              <option value="">Personal tokens</option>
              {userTeams.map((t) => (
                <option key={t.id} value={t.id}>{t.name} tokens</option>
              ))}
            </select>
            {teamContext && teamTokenBalance !== null && (
              <span className="text-xs text-white/40 whitespace-nowrap">
                {teamTokenBalance.toLocaleString()} left
              </span>
            )}
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
            `Generate${referenceImage ? ' from Image' : ''} — 1 token`
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
              {/* SVG sanitized via DOMPurify above, rendered via DOMParser */}
              <SafeSvgPreview
                html={sanitizedPreview}
                className="w-32 h-32 [&>svg]:w-full [&>svg]:h-full text-white"
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

            {/* Export: format selector + copy + animated exports */}
            <div className="space-y-2">
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

              {/* Animated export buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAnimatedExport('animated-svg')}
                  disabled={animatedExporting}
                  className="flex-1 py-2 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5 disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {animatedExporting ? 'Exporting...' : 'Animated SVG'}
                </button>
                <button
                  onClick={() => handleAnimatedExport('gif')}
                  disabled={animatedExporting}
                  className="flex-1 py-2 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5 disabled:opacity-50 flex items-center justify-center gap-1.5"
                  title="GIF export coming soon"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  GIF
                </button>
              </div>
            </div>

            {/* Refine section */}
            {showRefine ? (
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="text-sm font-medium text-white/70">Refine this icon</h4>
                <input
                  type="text"
                  value={refineInstruction}
                  onChange={(e) => setRefineInstruction(e.target.value)}
                  placeholder="Make it simpler, add more detail, change color..."
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00ff88]/50 text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowRefine(false); setRefineInstruction(''); }}
                    className="flex-1 py-2 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRefine}
                    disabled={refining || !refineInstruction.trim()}
                    className="flex-1 py-2 rounded-lg bg-purple-500 text-white font-medium text-sm hover:bg-purple-500/90 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {refining ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Refining...
                      </>
                    ) : (
                      'Refine — 0.5 tokens'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRefine(true)}
                  className="flex-1 py-2.5 rounded-lg border border-purple-500/30 text-purple-400 text-sm hover:bg-purple-500/10 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Refine
                </button>
                <button
                  onClick={() => setShowEditor(true)}
                  className="flex-1 py-2.5 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Edit SVG
                </button>
              </div>
            )}

            <button
              onClick={handleGenerate}
              className="w-full py-2.5 rounded-lg border border-white/10 text-white/60 text-sm hover:bg-white/5 flex items-center justify-center gap-2"
            >
              Regenerate (1 token)
            </button>
          </>
        )}
      </div>

      {/* SVG Code Editor Modal */}
      {showEditor && selectedVariant && (
        <IconEditor
          iconId={selectedVariant.iconId}
          initialSvg={selectedVariant.svgCode}
          iconName={prompt || 'Untitled'}
          onSave={handleEditorSave}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  );
}
