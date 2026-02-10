# Product Requirements Document: AI Icon Generator for Lively Icons

**Version:** 1.1
**Last Updated:** 2026-02-10
**Status:** Draft
**Owner:** Product Team
**Stakeholders:** Engineering, Design, Marketing, Community

---

## Executive Summary

This PRD outlines the development of a premium AI Icon Generator feature for Lively Icons — a paid add-on that allows users to generate custom animated icons using natural language prompts. This feature maintains our commitment to keeping the core library free and open-source while introducing a sustainable revenue stream.

**The Killer Differentiator:** Unlike competitors such as iconly.ai, our AI-generated icons come with built-in animations from day one. Users describe what they want, and receive production-ready animated React components — not static SVGs that need manual animation work.

---

## 1. Product Vision & Strategy

### 1.1 Vision Statement

Transform Lively Icons from a free icon library into a comprehensive icon platform where developers and designers can both discover pre-made animated icons AND generate custom animated icons tailored to their specific needs — all within a unified ecosystem.

### 1.2 Strategic Positioning

| Aspect | Strategy |
|--------|----------|
| **Core Library** | Remains 100% free, MIT licensed, open-source |
| **AI Generator** | Premium paid feature, freemium model with generous trial |
| **Unique Value** | Only icon generator that produces animated React components |
| **Target Market** | React/Next.js developers, design system teams, product designers |
| **Competition** | Differentiates from iconly.ai, Iconify, and static icon generators |

### 1.3 Key Differentiators

1. **Animation-First Generation**: Icons are created WITH animations, not as an afterthought
2. **React-Native Output**: Direct integration into React/Next.js projects (not just downloads)
3. **Ecosystem Integration**: Works seamlessly with existing livelyicons package, playground, and tooling
4. **Private by Default**: Generated icons are exclusive to the user (not added to public library)
5. **Developer Experience**: Copy-paste code, shadcn registry install, or direct NPM integration

### 1.4 Business Objectives

- **Revenue Goal**: Generate $50K MRR within 12 months of launch
- **User Acquisition**: Convert 5-10% of free users to paid within 6 months
- **Market Position**: Become the #1 choice for animated icon generation
- **Community Preservation**: Maintain goodwill by keeping core offering free

---

## 2. Feature Specification

### 2.1 AI Generation Engine

#### 2.1.1 Text-to-Icon Generation

**WHEN** a user submits a natural language prompt **THE SYSTEM SHALL** generate an SVG icon that matches the description **WHERE** the generation completes within 10 seconds.

**WHEN** generating an icon **THE SYSTEM SHALL** offer style presets including:
- Line Art (default)
- Solid Glyph
- Outline
- Duotone
- Pixel Art
- Isometric
- Hand-Drawn

**WHEN** a user selects a style **THE SYSTEM SHALL** apply consistent visual characteristics across all generated icons in that style **WHERE** style parameters are persisted for the session.

#### Multi-Variant Generation

**WHEN** a user generates an icon **THE SYSTEM SHALL** produce 3-4 style variants simultaneously **WHERE** all variants share the same prompt but differ in interpretation. The user picks the best one.

**WHEN** displaying variants **THE SYSTEM SHALL** show a selection grid **WHERE** the user can:
- Select a variant to keep (saved to library)
- Regenerate individual variants (costs 0 tokens, same prompt)
- Regenerate all variants (costs 1 token, new seed)

**Token cost:** 1 token = 1 generation = 3-4 variants. This is critical for perceived quality — a single output with no fallback feels punitive.

**WHEN** generation fails **THE SYSTEM SHALL** provide actionable error messages and suggest prompt improvements **WHERE** failures are logged for model refinement.

#### 2.1.2 Animation Assignment

**WHEN** generating an icon **THE SYSTEM SHALL** automatically suggest an appropriate animation type from the 14 available options **WHERE** the suggestion is based on icon semantics (e.g., loading → spin, notification → ring).

**WHEN** a user previews a generated icon **THE SYSTEM SHALL** display all 14 animation options as selectable variants **WHERE** selection updates the live preview immediately.

**WHEN** a user exports an icon **THE SYSTEM SHALL** include the selected animation configuration in the React component **WHERE** animation parameters match the existing livelyicons API.

**Available Animation Types:**
- Scale
- Rotate
- Translate
- Shake
- Pulse
- Bounce
- Draw
- Spin
- Ring
- Wiggle
- Heartbeat
- Swing
- Float
- None (static)

**Available Trigger Modes:**
- hover
- loop
- mount
- inView

#### 2.1.3 Prompt Engineering Assistance

**WHEN** a user begins typing a prompt **THE SYSTEM SHALL** offer autocomplete suggestions based on successful past prompts **WHERE** suggestions prioritize high-quality generation patterns.

**WHEN** a prompt is ambiguous **THE SYSTEM SHALL** display clarifying questions before generation **WHERE** questions focus on style, complexity, and use case.

**WHEN** a user requests iterations **THE SYSTEM SHALL** maintain context from previous generations **WHERE** users can refine with phrases like "make it simpler" or "add more detail."

#### 2.1.4 Image-to-Icon / Reference Upload

**WHEN** a user uploads an image (sketch, photo, or existing icon) **THE SYSTEM SHALL** use it as a generation seed **WHERE** the AI produces an icon inspired by the reference image.

**Supported inputs:**
- Hand-drawn sketches (photo/scan)
- Existing icons or logos (for restyling into Lively Icons aesthetic)
- Screenshots of UI elements (extract icon from context)

**WHEN** an image is uploaded **THE SYSTEM SHALL** apply the selected style preset (line, solid, etc.) to the reference **WHERE** the output is a clean SVG that matches the Lively Icons visual language.

**WHEN** an image contains copyrighted material **THE SYSTEM SHALL** apply the same content moderation filters as text prompts **WHERE** trademarked logos and characters are rejected.

**File constraints:**
- Formats: PNG, JPG, SVG, WebP
- Max file size: 5MB
- Min resolution: 64x64px

#### 2.1.5 Custom Style Templates

**WHEN** a user creates a style template **THE SYSTEM SHALL** save a reusable configuration **WHERE** the template includes:
- Custom prompt modifier (e.g., "rounded corners, 2px stroke, minimalist")
- Default color palette
- Default stroke weight
- Default animation + trigger
- Post-processing settings (smoothing level, padding)

**WHEN** a user applies a style template **THE SYSTEM SHALL** prepend the template's prompt modifier to the user's prompt **WHERE** the template's visual settings override session defaults.

**WHEN** a Team user creates a style template **THE SYSTEM SHALL** allow sharing with team members **WHERE** shared templates appear in a "Team Templates" section of the style picker.

**Template limits:**
- Free: 0 custom templates (presets only)
- Pro: 10 custom templates
- Team: 50 shared templates
- Enterprise: Unlimited

#### 2.1.6 Regeneration Policy

**WHEN** a user is unsatisfied with a generation **THE SYSTEM SHALL** provide clear regeneration options **WHERE** the cost structure is:

| Action | Token Cost | Notes |
|--------|-----------|-------|
| Initial generation (3-4 variants) | 1 token | Standard cost |
| Regenerate all variants (same prompt) | 1 token | New seed, fresh output |
| Regenerate single variant | 0 tokens | Free, up to 3 per generation |
| Thumbs-down → free retry | 0 tokens | User rates < 3 stars, gets 1 free full regeneration |

**WHEN** a user gives a thumbs-down rating **THE SYSTEM SHALL** log the prompt, style, and output for quality analysis **WHERE** the data is used to improve prompt templates (not model training).

**WHEN** a user has used all free retries **THE SYSTEM SHALL** show a message: "Need more variations? Generate again (1 token)" **WHERE** the CTA is non-intrusive.

### 2.2 Live Preview & Playground Integration

#### 2.2.1 Real-Time Preview

**WHEN** an icon is generated **THE SYSTEM SHALL** display an animated preview in the playground **WHERE** the preview uses the production animation engine (Motion).

**WHEN** a user adjusts animation settings **THE SYSTEM SHALL** update the preview in real-time **WHERE** updates occur within 100ms of interaction.

**WHEN** a user tests different trigger modes **THE SYSTEM SHALL** simulate each trigger in the preview pane **WHERE** "inView" scrolling is demonstrated with a scrollable container.

#### 2.2.2 Playground Panel Integration

**WHEN** a user accesses the AI generator **THE SYSTEM SHALL** add a dedicated "AI Generate" panel to the existing playground **WHERE** the panel includes:
- Prompt input field
- Style selector
- Animation preset picker
- Generate button with token cost display
- Generation history sidebar

**WHEN** switching between library icons and generated icons **THE SYSTEM SHALL** preserve panel state **WHERE** users can compare AI-generated icons with library icons side-by-side.

### 2.3 Export Formats

#### 2.3.1 React Component (Primary)

**WHEN** a user exports a generated icon **THE SYSTEM SHALL** provide copy-to-clipboard React/TSX code **WHERE** the code includes:
- TypeScript types
- Animation props (animation, trigger, duration, delay, etc.)
- Size and color props
- Accessibility attributes (aria-label, role)
- Usage example in comments

**Example Output:**
```tsx
import { motion, useReducedMotion } from 'motion/react';
import { useIconConfig } from 'livelyicons/context'; // IconProvider integration

export function CustomIconName({
  animation = 'bounce',
  trigger = 'hover',
  size = 24,
  color = 'currentColor',
  duration = 0.5,
  className,
  ...props
}: LivelyIconProps) {
  const prefersReducedMotion = useReducedMotion();
  const iconConfig = useIconConfig(); // Inherits IconProvider defaults

  const resolvedAnimation = prefersReducedMotion ? 'none' : (animation ?? iconConfig.animation);
  const resolvedTrigger = trigger ?? iconConfig.trigger;

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-label="Custom icon name"
      className={className}
      {...animationConfig(resolvedAnimation, resolvedTrigger, duration)}
      {...props}
    >
      {/* SVG paths */}
    </motion.svg>
  );
}
```

> **Accessibility requirement:** Every generated component MUST respect `prefers-reduced-motion` and integrate with `<IconProvider>` context, matching the behavior of the core library icons. This is non-negotiable for ecosystem compatibility.

#### 2.3.1b Vue Component Export

**WHEN** a user selects "Vue" as the export format **THE SYSTEM SHALL** generate a Vue SFC (Single File Component) **WHERE** the component includes:
- `<template>` with SVG markup
- `<script setup lang="ts">` with animation logic
- Props matching the React API (animation, trigger, size, color)
- `prefers-reduced-motion` support via `@media` query

> **Rationale:** The existing Lively Icons playground already generates Vue code. Restricting AI-generated icons to React-only would be a regression. Vue is the second-largest export format.

**WHEN** a user selects "Vanilla JS/HTML" **THE SYSTEM SHALL** provide a standalone SVG with CSS animation classes **WHERE** the output uses the `livelyicons/css` animation system (no JS required, RSC-safe).

#### 2.3.2 shadcn Registry JSON

**WHEN** a user selects "Install via shadcn" **THE SYSTEM SHALL** generate a registry-compatible JSON file **WHERE** the file includes:
- Component code
- Dependencies (motion, livelyicons)
- Installation instructions
- Type definitions

**WHEN** a user clicks "Copy shadcn Command" **THE SYSTEM SHALL** copy the CLI install command **WHERE** the command references a private registry endpoint.

#### 2.3.3 SVG Download (Static)

**WHEN** a user exports as SVG **THE SYSTEM SHALL** provide optimized SVG code **WHERE** the SVG is:
- Minified (whitespace removed)
- SVGO-optimized
- Includes viewBox for scaling
- Excludes animation attributes

#### 2.3.4 Animated Export

**WHEN** a user exports as animated file **THE SYSTEM SHALL** offer formats including:
- Animated SVG (SMIL animations)
- GIF (configurable frame rate, 1-3 seconds loop)
- Lottie JSON (if feasible)

**WHEN** exporting animated formats **THE SYSTEM SHALL** render the animation using the selected trigger and settings **WHERE** loop animations play continuously.

#### 2.3.5 CDN Embed Delivery (Phase 2+)

**WHEN** a user selects "CDN Embed" **THE SYSTEM SHALL** provide a script tag and HTML class-based usage **WHERE** icons load from a user-specific CDN endpoint:

```html
<!-- One script tag to load all your generated icons -->
<script src="https://cdn.livelyicons.com/u/{userId}/icons.js"></script>

<!-- Use icons via HTML classes -->
<i class="li-custom-rocket" data-animation="bounce" data-trigger="hover"></i>
```

**WHEN** a user deploys icons via CDN **THE SYSTEM SHALL** serve optimized SVG sprites **WHERE** the sprite sheet includes only icons the user has explicitly published to their CDN.

**CDN Features:**
- Global edge delivery via Vercel Edge Network
- Automatic SVG sprite optimization (single HTTP request for all icons)
- CSS animations included (no JS dependency required)
- `data-animation` and `data-trigger` HTML attributes for declarative animation control
- Cache-busted on icon library changes

**Use Cases:**
- WordPress sites, marketing landing pages, email templates
- Non-React frameworks (Vue, Svelte, Angular, vanilla HTML)
- Design teams who don't write React code
- Rapid prototyping without npm install

**Limits:**
- Free: Not available
- Pro: Up to 50 icons published to CDN
- Team: Up to 500 icons, custom subdomain
- Enterprise: Unlimited, white-label domain

### 2.4 Personal Icon Library

#### 2.4.1 Library Management

**WHEN** a user generates an icon **THE SYSTEM SHALL** automatically save it to their personal library **WHERE** the icon is stored with:
- Original prompt
- Style settings
- Animation configuration
- Timestamp
- Custom name (editable)
- Tags (user-defined)

**WHEN** a user views their library **THE SYSTEM SHALL** display icons in a grid layout **WHERE** each icon shows:
- Animated thumbnail
- Name
- Creation date
- Quick actions (export, edit, delete, duplicate)

**WHEN** a user searches their library **THE SYSTEM SHALL** filter by name, prompt, tags, and style **WHERE** search is instant (client-side) for libraries under 500 icons.

#### 2.4.2 Library Organization

**WHEN** a user creates collections **THE SYSTEM SHALL** allow grouping icons into folders **WHERE** collections support:
- Nested folders
- Bulk operations (move, export, delete)
- Collection sharing (Team plan only)

**WHEN** a user exports a collection **THE SYSTEM SHALL** bundle all icons into a downloadable package **WHERE** the package includes:
- Individual component files
- Index file with named exports
- README with usage instructions
- package.json for NPM publishing (optional)

### 2.5 Editing Tools

#### 2.5.1 Visual Customization

**WHEN** a user edits a generated icon **THE SYSTEM SHALL** provide controls for:
- **Color**: Single color picker (applied to all paths), multi-color mode (edit individual paths)
- **Stroke Weight**: 0.5px to 4px in 0.25px increments
- **Size**: Canvas size (16x16 to 128x128)
- **Padding**: Internal padding adjustment

**WHEN** color changes are applied **THE SYSTEM SHALL** update the live preview immediately **WHERE** color is saved as a default for future exports.

#### 2.5.2 Animation Tuning

**WHEN** a user adjusts animation settings **THE SYSTEM SHALL** provide sliders for:
- Duration (0.1s to 3s)
- Delay (0s to 2s)
- Easing function (linear, easeIn, easeOut, easeInOut, bounce, elastic)
- Iteration count (1, 2, 3, infinite)
- Direction (normal, reverse, alternate)

**WHEN** settings are changed **THE SYSTEM SHALL** update the preview with the new animation **WHERE** a "Reset to Default" button restores recommended settings.

#### 2.5.3 SVG Refinement

**WHEN** a user requests AI refinement **THE SYSTEM SHALL** accept natural language edits **WHERE** users can type:
- "Make the lines thicker"
- "Simplify the design"
- "Add more detail to the top section"

**WHEN** refinement is applied **THE SYSTEM SHALL** generate a new variation **WHERE** both original and refined versions are saved to library.

**WHEN** manual SVG editing is needed **THE SYSTEM SHALL** provide a code editor with:
- Syntax highlighting
- Path visualization
- Undo/redo
- Validation (detect broken SVG)

### 2.6 Batch Generation

#### 2.6.1 Icon Set Generation

**WHEN** a user enables batch mode **THE SYSTEM SHALL** accept multiple prompts (up to 20) **WHERE** prompts can be:
- Pasted from a text list
- Uploaded as CSV
- Entered in a multi-line input

**WHEN** generating a batch **THE SYSTEM SHALL** apply consistent style settings across all icons **WHERE** style, animation, and color are locked during the batch.

**WHEN** batch generation is in progress **THE SYSTEM SHALL** display a progress indicator **WHERE** users can:
- Pause/resume generation
- View completed icons
- Cancel remaining generations (with partial refund)

#### 2.6.2 Icon Family Consistency

**WHEN** generating related icons (e.g., "social media icons") **THE SYSTEM SHALL** maintain visual consistency **WHERE** stroke weight, style, and proportions are uniform.

**WHEN** a user generates variations of a single icon **THE SYSTEM SHALL** use the original as a seed **WHERE** variations maintain core structure while adjusting details.

---

## 3. User Experience Flow

### 3.1 Primary User Journey: First-Time Generation

```
1. User lands on livelyicons.com
   └─ Sees prominent "Try AI Generator" CTA with "5 free generations" badge

2. User clicks CTA → Redirected to /playground?tab=ai-generate
   └─ If not logged in: Modal prompts "Sign in to try AI generation (no credit card required)"
   └─ If logged in: AI panel opens with token balance displayed

3. User enters prompt: "A rocket ship launching"
   └─ System suggests: "Try adding a style: 'line art rocket ship' or 'solid rocket icon'"
   └─ User selects "Line Art" style, "Scale" animation preset

4. User clicks "Generate" (cost: 1 token)
   └─ Loading animation: 3-8 seconds
   └─ Generated icon appears in preview pane (animated)

5. User tests animations
   └─ Clicks through 14 animation types
   └─ Adjusts trigger mode to "hover"
   └─ Tweaks duration slider to 0.8s

6. User exports
   └─ Clicks "Copy React Code"
   └─ Toast confirmation: "Code copied! Icon saved to your library."

7. User views library
   └─ Clicks "My Icons" tab
   └─ Sees "rocket-launch" icon with timestamp
   └─ Adds tag: "space, launch, startup"

8. User hits free limit (5 generations)
   └─ System shows: "You've used all 5 free generations. Upgrade to Pro for 500 monthly tokens."
   └─ CTA: "View Plans" → Stripe Checkout
```

### 3.2 Power User Journey: Batch Generation

```
1. Pro user opens playground → "AI Generate" tab
   └─ Selects "Batch Mode" toggle

2. User pastes list of prompts:
   - Email icon
   - Phone icon
   - Chat bubble icon
   - Video call icon

3. User sets global settings:
   └─ Style: Outline
   └─ Animation: None (static icons for this set)
   └─ Color: #6366F1 (brand color)

4. User clicks "Generate Batch (4 tokens)"
   └─ Progress bar: 1/4, 2/4, 3/4, 4/4
   └─ Each icon appears in preview grid as it completes

5. User reviews batch
   └─ Edits "chat bubble" (makes stroke thicker)
   └─ Regenerates "video call" (didn't meet expectations)

6. User creates collection: "Communication Icons"
   └─ Adds all 4 icons to collection
   └─ Exports collection as ZIP (includes all React components + index.ts)

7. User downloads ZIP, extracts to project
   └─ Imports: import { EmailIcon, PhoneIcon } from '@/components/icons/communication'
```

### 3.3 Playground Integration UX

The AI Generator is embedded as a new panel in the existing playground, maintaining visual consistency:

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│ Lively Icons Playground                    [Avatar] │
├─────────────────────────────────────────────────────┤
│ [Library] [AI Generate] [My Icons] [Collections]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌────────────────┐  ┌───────────────────────────┐ │
│  │ AI GENERATOR   │  │ LIVE PREVIEW              │ │
│  │                │  │                           │ │
│  │ Prompt:        │  │    [Animated Icon]        │ │
│  │ ______________ │  │                           │ │
│  │                │  │                           │ │
│  │ Style:         │  │ Animation: Scale ▼        │ │
│  │ [Line Art ▼]   │  │ Trigger: Hover ▼          │ │
│  │                │  │ Duration: 0.5s [───▓────] │ │
│  │ Animation:     │  │                           │ │
│  │ [Scale ▼]      │  │ [Copy Code] [Export ▼]    │ │
│  │                │  │                           │ │
│  │ Trigger:       │  │                           │ │
│  │ [Hover ▼]      │  │                           │ │
│  │                │  │                           │ │
│  │ [Generate]     │  │                           │ │
│  │ Cost: 1 token  │  │                           │ │
│  │ Balance: 487   │  │                           │ │
│  └────────────────┘  └───────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Key UX Principles:**
- **Progressive Disclosure**: Advanced settings (stroke weight, easing functions) are collapsed by default
- **Instant Feedback**: All interactions update preview within 100ms
- **Error Prevention**: Token cost displayed prominently before generation
- **Contextual Help**: Hover tooltips on all settings
- **Mobile Responsive**: Stacked layout for tablet/mobile

### 3.4 Subscription Lifecycle UX

#### 3.4.1 Plan Downgrade Flow

**WHEN** a Pro user downgrades to Free **THE SYSTEM SHALL** enforce the following transition:
- Icons beyond the 20-icon Free limit become **read-only** (viewable, exportable, but no new edits)
- User is prompted to select which 20 icons remain "active"
- If no selection is made within 30 days, the most recently created 20 icons are kept active
- Custom style templates become read-only (cannot create new)
- CDN delivery is disabled (published icons show a "Upgrade to restore" placeholder)
- No icons are deleted — all data is preserved for re-upgrade

**WHEN** a downgraded user re-upgrades to Pro **THE SYSTEM SHALL** immediately restore full access to all icons, templates, and CDN delivery.

#### 3.4.2 Cancellation Flow

**WHEN** a user initiates cancellation **THE SYSTEM SHALL** display a retention flow:

```
1. "We're sorry to see you go" → Show usage stats ("You've generated 47 icons this month")
2. Optional exit survey (checkboxes: too expensive, don't use enough, found alternative, other)
3. Retention offer: "Stay for 50% off for 3 months" (one-time offer, tracked in metadata)
4. If declined → Confirm cancellation, access continues until end of billing period
5. Post-cancellation → Downgrade to Free tier behavior (see 3.4.1)
```

#### 3.4.3 Billing Portal

**WHEN** a user clicks "Manage Subscription" **THE SYSTEM SHALL** open the Stripe Customer Portal **WHERE** users can:
- Update payment method
- View invoice history
- Switch between monthly and annual billing
- Cancel subscription
- Download invoices (PDF)

#### 3.4.4 Failed Payment Recovery (Dunning)

**WHEN** a payment fails **THE SYSTEM SHALL** follow this sequence:
1. **Day 0:** Stripe retries automatically. In-app banner: "Payment failed — please update your card."
2. **Day 3:** Email notification with "Update payment method" link.
3. **Day 7:** Second retry. If failed again, email warning: "Your Pro access will be paused in 7 days."
4. **Day 14:** Access paused (downgraded to Free behavior). Email: "Your account has been paused."
5. **Day 30:** Subscription canceled. Data preserved for 90 days.

### 3.5 Error & Empty States

#### 3.5.1 Empty States

| State | Message | CTA |
|-------|---------|-----|
| **No icons yet** (library) | "Your icon library is empty. Generate your first icon!" | "Generate Icon" button → AI panel |
| **No collections** | "Organize your icons into collections for easy export." | "Create Collection" button |
| **No search results** | "No icons match '{query}'. Try a different search term." | "Clear Search" link |
| **Token balance: 0** | "You've used all your tokens this month. Tokens refresh on {date}." | "Upgrade Plan" or "View Token Balance" |

#### 3.5.2 Error States

| Error | User Message | Recovery Action |
|-------|-------------|-----------------|
| **Generation failed** (AI API error) | "We couldn't generate this icon. No token was charged. Please try again." | "Retry" button (no token cost) |
| **Generation timeout** (>15s) | "Generation is taking longer than usual. Your icon will appear in your library when ready." | Background job notification |
| **Service unavailable** (AI API down) | "The AI generator is temporarily unavailable. Your existing library is still accessible." | Link to status page |
| **Rate limited** | "You've reached your hourly limit ({limit} generations). Try again in {minutes} minutes." | Show timer countdown |
| **File upload too large** | "Image must be under 5MB. Please resize and try again." | None |
| **Invalid SVG output** | "The generated icon didn't meet quality standards. Here's a free retry." | Auto-retry with adjusted prompt |

---

## 4. Technical Architecture

### 4.1 AI Model Integration

#### 4.1.1 Model Selection

**Primary Option: Recraft V3 (Specialized Icon Model)**

| Factor | Evaluation |
|--------|------------|
| **Strengths** | Purpose-built for icons/logos, SVG-first output, style consistency |
| **Weaknesses** | Newer model, smaller community |
| **Cost** | ~$0.02 per generation |
| **API** | REST API, 3-8s generation time |

**Alternative Options:**

| Model | Pros | Cons | Cost |
|-------|------|------|------|
| **DALL-E 3** | High quality, reliable | Raster output (needs SVG conversion) | $0.04 per image |
| **Stable Diffusion XL** | Open-source, fine-tunable | Requires self-hosting or Replicate | $0.01-0.02 per generation |
| **Midjourney** | Best aesthetics | No official API, raster only | $30/mo subscription |
| **Custom Fine-Tuned Model** | Full control, optimized for icons | High upfront cost, maintenance | Variable |

**Recommendation:** Start with **Recraft V3** for MVP. If SVG quality is insufficient, fall back to **DALL-E 3** + **vectorizer.ai** pipeline.

#### 4.1.2 SVG Conversion Pipeline

**WHEN** using a raster-first model (DALL-E, SD) **THE SYSTEM SHALL** convert PNG output to SVG via:

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐     ┌─────────────┐
│ AI Model    │ →   │ PNG Output   │ →   │ Vectorizer   │ →   │ Clean SVG   │
│ (DALL-E 3)  │     │ (1024x1024)  │     │ (vectorizer) │     │ (optimized) │
└─────────────┘     └──────────────┘     └──────────────┘     └─────────────┘
                                                 │
                                                 ↓
                                         ┌──────────────┐
                                         │ SVGO         │
                                         │ Optimization │
                                         └──────────────┘
                                                 │
                                                 ↓
                                         ┌──────────────┐
                                         │ Path         │
                                         │ Simplification│
                                         └──────────────┘
```

**Vectorization Tools:**
- **vectorizer.ai**: High-quality AI vectorization, $0.01 per image
- **Potrace**: Open-source, fast, lower quality
- **Custom Model**: Train a raster-to-SVG model (future)

**WHEN** SVG is generated **THE SYSTEM SHALL** validate:
- Valid XML structure
- No embedded raster images
- ViewBox attribute present
- Path count under 100 (for performance)
- File size under 50KB

#### 4.1.3 Animation System Integration

**WHEN** wrapping SVG in React component **THE SYSTEM SHALL** inject animation props using the existing livelyicons animation engine **WHERE** the code follows this pattern:

```tsx
// Generated component structure
import { motion } from 'motion/react';
import { getAnimationConfig } from '@livelyicons/animations';

export function GeneratedIcon(props: LivelyIconProps) {
  const animationConfig = getAnimationConfig(
    props.animation,
    props.trigger,
    props.duration,
    props.delay
  );

  return (
    <motion.svg
      viewBox="0 0 24 24"
      {...animationConfig}
      {...props}
    >
      {/* Generated SVG paths */}
    </motion.svg>
  );
}
```

**WHEN** animation is "none" **THE SYSTEM SHALL** export a standard React component **WHERE** the motion library is not imported.

#### 4.1.4 IconProvider Context Integration

**WHEN** a generated icon is used inside an `<IconProvider>` wrapper **THE SYSTEM SHALL** inherit the provider's default animation, trigger, size, and color settings **WHERE** local props override provider defaults (same as core library behavior).

```tsx
// User's app — generated icons respect IconProvider like core icons
import { IconProvider } from 'livelyicons';
import { RocketIcon } from '@/generated-icons/rocket';
import { Heart } from 'livelyicons'; // Core library icon

<IconProvider animation="bounce" trigger="hover" size={20}>
  <Heart />       {/* Core icon — uses bounce/hover/20 */}
  <RocketIcon />  {/* Generated icon — also uses bounce/hover/20 */}
</IconProvider>
```

**WHEN** a generated component is exported **THE SYSTEM SHALL** include the `useIconConfig()` hook import **WHERE** the hook reads from `IconContext` and falls back to prop defaults if no provider is present.

**This is critical:** If generated icons don't integrate with `IconProvider`, they break the "works seamlessly with existing livelyicons" promise. Users who already use `IconProvider` would get inconsistent behavior between core and generated icons.

### 4.2 Backend Architecture

#### 4.2.1 Tech Stack

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Framework** | Next.js 15 (App Router) | Existing stack, API routes, server actions |
| **Database** | Vercel Postgres (Neon) | Managed, serverless, integrates with Vercel |
| **ORM** | Drizzle ORM | Type-safe, lightweight, excellent DX |
| **Authentication** | Clerk | Best Next.js integration, social auth, user management UI |
| **Payments** | Stripe | Industry standard, subscription + metered billing support |
| **File Storage** | Vercel Blob | Managed, CDN integration, simple API |
| **Caching** | Redis (Upstash) | Rate limiting, session storage, API response cache |
| **Queue** | Inngest | Batch generation, webhook processing, retries |

#### 4.2.2 API Routes

**POST /api/ai/generate**
```typescript
// Request
{
  prompt: string;
  style: 'line' | 'solid' | 'outline' | 'duotone' | 'pixel' | 'isometric';
  animation?: string; // Optional preset
  userId: string; // From Clerk session
}

// Response
{
  iconId: string;
  svgCode: string;
  componentCode: string;
  previewUrl: string; // Vercel Blob URL
  suggestedAnimation: string;
  tokensUsed: number;
  tokensRemaining: number;
}
```

**POST /api/ai/batch**
```typescript
// Request
{
  prompts: string[]; // Max 20
  style: string;
  animation: string;
  userId: string;
}

// Response
{
  batchId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  totalIcons: number;
  tokensRequired: number;
  estimatedCompletionTime: number; // seconds
}
```

**GET /api/ai/batch/:batchId**
```typescript
// Response (SSE stream)
{
  status: 'processing';
  completed: 5;
  total: 10;
  icons: [
    { iconId, svgCode, previewUrl },
    // ... completed icons
  ]
}
```

**GET /api/user/library**
```typescript
// Response
{
  icons: [
    {
      id: string;
      name: string;
      prompt: string;
      style: string;
      animation: string;
      svgCode: string;
      componentCode: string;
      previewUrl: string;
      createdAt: string;
      tags: string[];
    }
  ],
  collections: [
    {
      id: string;
      name: string;
      iconIds: string[];
    }
  ]
}
```

**PUT /api/user/library/:iconId**
```typescript
// Request (update icon)
{
  name?: string;
  tags?: string[];
  animation?: string;
  color?: string;
}
```

**DELETE /api/user/library/:iconId**

**POST /api/user/library/:iconId/refine**
```typescript
// Request
{
  instruction: string; // "Make it simpler"
}

// Response
{
  iconId: string; // New variation ID
  svgCode: string;
  // ... same as /generate
}
```

#### 4.2.2b Webhook Endpoints & Security

**POST /api/webhooks/stripe**
- Verifies Stripe signature using `STRIPE_WEBHOOK_SECRET` via `stripe.webhooks.constructEvent()`
- Handles: `checkout.session.completed`, `invoice.payment_succeeded`, `invoice.payment_failed`, `customer.subscription.updated`, `customer.subscription.deleted`
- Returns 200 immediately, processes asynchronously via Inngest

**POST /api/webhooks/clerk**
- Verifies Clerk signature using `svix` library and `CLERK_WEBHOOK_SECRET`
- Handles: `user.created`, `user.deleted`, `session.created`
- Creates subscription record on `user.created`

**Security requirements (non-negotiable):**
- ALL webhook endpoints MUST verify request signatures before processing
- Raw request body MUST be preserved (not parsed) for signature verification
- Failed signature verification returns 401 and logs the attempt
- Webhook processing is idempotent (duplicate deliveries produce same result)
- All webhook handlers have Inngest retry logic (3 attempts with exponential backoff)

#### 4.2.3 Database Schema

```sql
-- Users (managed by Clerk, referenced only)
-- clerk_user_id is the primary reference

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id VARCHAR(255) NOT NULL,
  stripe_customer_id VARCHAR(255) NOT NULL,
  stripe_subscription_id VARCHAR(255),
  plan_type VARCHAR(50) NOT NULL, -- 'free', 'pro', 'team', 'enterprise'
  status VARCHAR(50) NOT NULL, -- 'active', 'canceled', 'past_due'
  tokens_balance INTEGER NOT NULL DEFAULT 0,
  tokens_refresh_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(clerk_user_id)
);

-- Generated Icons
CREATE TABLE generated_icons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  style VARCHAR(50) NOT NULL,
  animation VARCHAR(50) NOT NULL,
  trigger VARCHAR(50) NOT NULL,
  svg_code TEXT NOT NULL,
  component_code TEXT NOT NULL,
  preview_url TEXT NOT NULL,
  blob_storage_key TEXT NOT NULL,
  tags TEXT[], -- PostgreSQL array
  color VARCHAR(50),
  stroke_weight FLOAT,
  duration FLOAT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE, -- FALSE when user is on Free tier and icon exceeds 20-icon limit
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  deleted_at TIMESTAMP, -- NULL = active, SET = soft-deleted (hard delete after 30 days)
  INDEX idx_user_created (clerk_user_id, created_at DESC),
  INDEX idx_soft_delete (deleted_at) WHERE deleted_at IS NOT NULL -- partial index for cleanup job
);

-- Collections
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  parent_collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Collection Icons (join table)
CREATE TABLE collection_icons (
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  icon_id UUID NOT NULL REFERENCES generated_icons(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (collection_id, icon_id)
);

-- Generation Events (for analytics)
CREATE TABLE generation_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id VARCHAR(255) NOT NULL,
  event_type VARCHAR(50) NOT NULL, -- 'generate', 'refine', 'export', 'delete'
  icon_id UUID REFERENCES generated_icons(id) ON DELETE SET NULL,
  tokens_used INTEGER NOT NULL,
  metadata JSONB, -- Flexible storage for prompt, style, etc.
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX idx_user_events (clerk_user_id, created_at DESC)
);

-- Batch Jobs
CREATE TABLE batch_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL, -- 'queued', 'processing', 'completed', 'failed'
  total_prompts INTEGER NOT NULL,
  completed_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  prompts JSONB NOT NULL, -- Array of prompts
  style VARCHAR(50) NOT NULL,
  animation VARCHAR(50),
  icon_ids JSONB, -- Array of generated icon IDs
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  INDEX idx_user_batches (clerk_user_id, created_at DESC)
);
```

#### 4.2.4 Authentication Flow (Clerk)

**WHEN** a user accesses the AI generator **THE SYSTEM SHALL** check authentication status via Clerk **WHERE** unauthenticated users see a sign-in modal.

**WHEN** a user signs up **THE SYSTEM SHALL** create a subscription record with free tier defaults **WHERE** the webhook handler (`POST /api/webhooks/clerk`) creates:
- `subscriptions` row (plan_type: 'free', tokens_balance: 5)
- Stripe customer (for future upgrade)

**WHEN** a user upgrades **THE SYSTEM SHALL** redirect to Stripe Checkout **WHERE** successful payment triggers:
- Webhook: `POST /api/webhooks/stripe`
- Update subscription status
- Refresh token balance

### 4.3 File Storage Strategy

**WHEN** an icon is generated **THE SYSTEM SHALL** store files in Vercel Blob **WHERE** the storage key follows this pattern:

```
/icons/:userId/:iconId/preview.svg
/icons/:userId/:iconId/component.tsx
/icons/:userId/:iconId/static.svg
/icons/:userId/:iconId/animated.gif (if exported)
```

**WHEN** an icon is deleted **THE SYSTEM SHALL** remove all associated blobs **WHERE** deletion is queued via Inngest to handle failures.

**WHEN** a user exports a collection **THE SYSTEM SHALL** generate a ZIP file on-demand **WHERE** ZIP generation:
- Uses JSZip library
- Includes all component files + README + package.json
- Cached for 1 hour (same collection export)

### 4.4 Rate Limiting & Abuse Prevention

**WHEN** a request is made to `/api/ai/*` **THE SYSTEM SHALL** enforce rate limits via Upstash Redis **WHERE** limits are:

| User Tier | Rate Limit | Monthly Cap |
|-----------|------------|-------------|
| **Free** | 3 generations per hour | 5 total (one-time trial, not monthly) |
| **Pro** | 50 generations per hour | 500/month (+ purchased top-ups) |
| **Team** | 100 generations per hour (shared across seats) | 2,000/month (+ purchased top-ups) |
| **Enterprise** | Custom (no hard limit) | Custom |

> **Note:** Free tier has a lifetime cap of 5 generations total, not a monthly refresh. The hourly limit prevents burning all 5 in rapid succession (which provides a poor trial experience — spacing encourages exploration).

**WHEN** a limit is exceeded **THE SYSTEM SHALL** return HTTP 429 with retry-after header **WHERE** the response includes:
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 3600, // seconds
  "message": "You've reached your hourly limit. Upgrade to Pro for higher limits."
}
```

**WHEN** detecting suspicious activity (e.g., identical prompts repeated) **THE SYSTEM SHALL** flag the user for review **WHERE** flags trigger admin notifications.

### 4.5 CDN Delivery for Generated Assets

**WHEN** a user exports an icon **THE SYSTEM SHALL** serve files via Vercel's CDN **WHERE** preview URLs have:
- Cache-Control: max-age=31536000 (1 year, immutable)
- Public read access (authenticated write)
- Signed URLs for private icons (optional Team feature)

---

## 5. Monetization Model

### 5.1 Pricing Tiers

| Plan | Monthly | Annual (per month) | Monthly Tokens | Features | Target Audience |
|------|---------|-------------------|----------------|----------|-----------------|
| **Free** | $0 | — | 5 (trial, one-time) | Basic generation (3-4 variants), all animations, personal library (up to 20 icons) | Hobbyists, trial users |
| **Pro** | $19/mo | $15/mo ($180/yr) | 500 | Batch generation, editing tools, image upload, unlimited library, custom templates (10), CDN delivery (50 icons), priority support | Individual developers, freelancers |
| **Team** | $49/mo | $39/mo ($468/yr) | 2,000 | Shared libraries, collection sharing, 5 seats, team dashboard, shared templates (50), CDN delivery (500 icons) | Design teams, agencies |
| **Enterprise** | Custom | Custom | Custom | API access, white-label, custom models, SLA, dedicated support, SSO, unlimited CDN | Large companies, design systems |

**Annual billing benefits:**
- ~20% savings vs. monthly (displayed prominently on pricing page)
- Reduced churn (annual commitment = 12-month lock-in)
- Improved cash flow (upfront payment)
- Default toggle on pricing page should show annual pricing (industry standard)

#### Token Top-Up (Pay-As-You-Go)

**WHEN** a user exhausts their monthly tokens **THE SYSTEM SHALL** offer one-time token packs **WHERE** packs are available to Pro+ users only:

| Pack | Price | Tokens | Cost per Token |
|------|-------|--------|---------------|
| **Small** | $5 | 50 | $0.10 |
| **Medium** | $15 | 200 | $0.075 |
| **Large** | $35 | 500 | $0.07 |

Top-up tokens never expire and are consumed after monthly allocation is depleted.

### 5.2 Token Economics

| Action | Token Cost | Rationale |
|--------|-----------|-----------|
| **Single Generation** | 1 token | Base cost (~$0.02 AI + $0.01 processing) |
| **Refinement** | 0.5 tokens | Cheaper than full generation (uses seed) |
| **Batch Generation** | 1 token each | No discount for MVP (future: volume pricing) |
| **Animated Export (GIF)** | 0 tokens | Included (rendering cost low) |
| **SVG Download** | 0 tokens | Included (encourages usage) |

**Token Rollover:**
- **Pro**: Unused tokens roll over for 1 month (max 1000 banked)
- **Team**: Unused tokens roll over for 3 months (max 5000 banked)
- **Free**: No rollover (use it or lose it)

### 5.3 Competitive Pricing Analysis

| Competitor | Free Tier | Paid Plans | Notes |
|------------|-----------|------------|-------|
| **iconly.ai** | 300 tokens + 3-day trial | $15-$180/mo | High variance, unclear value |
| **Iconify Figma Plugin** | Free (static) | N/A | No AI generation |
| **Flaticon** | 10 downloads/day | $9.99/mo | Static icons only |
| **Noun Project** | Limited | $39.99/year | Static, no animations |

**Positioning:** Lively Icons is priced competitively for individual developers ($19 vs. iconly's $15-30) while offering superior value through animation integration. Team pricing ($49) undercuts typical design tool subscriptions ($50-100) while addressing a clear pain point (custom animated icons).

### 5.4 Revenue Projections

**Assumptions:**
- Free users: 10,000 within 6 months (based on current traffic)
- Conversion rate: 5% free → Pro
- Churn rate: 10% monthly (industry average for dev tools)
- Average customer lifetime: 10 months

**12-Month Projection (churn-adjusted):**

| Month | Free Users | Gross New Pro | Churned Pro | Net Pro | Team Users | MRR | ARR (Projected) |
|-------|-----------|--------------|-------------|---------|-----------|-----|-----------------|
| 1 | 2,000 | 50 | 0 | 50 | 2 | $1,048 | $12,576 |
| 3 | 5,000 | 100 | 25 | 225 | 8 | $4,667 | $56,004 |
| 6 | 10,000 | 150 | 55 | 475 | 20 | $10,005 | $120,060 |
| 9 | 15,000 | 175 | 80 | 700 | 35 | $15,015 | $180,180 |
| 12 | 20,000 | 200 | 100 | 950 | 55 | $20,755 | $249,060 |

**Assumptions (revised):**
- 10% monthly churn (Pro), 7% monthly churn (Team — higher stickiness)
- Gross new Pro additions increase as free user base grows
- 40% of paid users choose annual billing by month 6 (reduces effective churn)
- Revenue includes token top-up purchases (~5% of Pro users buy $15 pack/month)

**Path to $50K MRR:**
- Achievable at ~2,200 net Pro users + 100 Team users + enterprise contracts
- Requires: 5% free-to-paid conversion, <8% blended churn, and 2-3 enterprise deals
- Aggressive marketing + annual billing adoption are the primary levers
- Influencer partnerships (Theo, Lee Robinson) and Product Hunt launch are catalysts

### 5.5 Cost Structure

| Cost Category | Monthly Expense (at scale) | Notes |
|--------------|---------------------------|-------|
| **AI API** (Recraft/DALL-E) | ~$1,000 | 50,000 generations @ $0.02 each |
| **Vercel Hosting** | $300 | Pro plan + bandwidth |
| **Vercel Blob** | $200 | 500GB storage + egress |
| **Clerk Authentication** | $300 | Pro plan (10,000+ MAUs) |
| **Stripe Fees** | 2.9% + $0.30 | ~$580 on $20K revenue |
| **Upstash Redis** | $50 | Rate limiting cache |
| **Resend Email** | $20 | 50,000 emails/month |
| **Total** | ~$2,450 | |

**Gross Margin:** ~88% at $20K MRR (excluding development costs)

---

## 6. Infrastructure Requirements

### 6.1 What Needs to Be Built From Scratch

| Component | Status | Effort (Story Points) | Dependencies |
|-----------|--------|----------------------|--------------|
| **Authentication System** | New (Clerk integration) | 13 | Clerk account, webhook setup |
| **Payment System** | New (Stripe integration) | 21 | Stripe account, webhook endpoints |
| **Database Schema** | New (Postgres + Drizzle) | 13 | Vercel Postgres instance |
| **AI Generation API** | New | 34 | Recraft/DALL-E API key |
| **SVG Conversion Pipeline** | New | 21 | Vectorizer.ai or Potrace |
| **Personal Library UI** | New | 34 | Database, Blob storage |
| **Playground AI Panel** | Extends existing | 21 | Existing playground code |
| **Export System** | New | 13 | Code generation templates |
| **Batch Generation Queue** | New | 21 | Inngest setup |
| **Transactional Email** | New (Resend + React Email) | 8 | Resend account, domain verification |
| **CDN Delivery System** | New (Phase 2) | 21 | Vercel Edge, sprite generation |
| **Subscription Lifecycle** | New (downgrade, dunning, portal) | 13 | Stripe Customer Portal, Inngest cron |
| **Testing Suite** | New (Vitest + Playwright + k6) | 21 | All above systems running |
| **Admin Dashboard** | New (future) | 34 | Auth, analytics |
| **Total** | | **288 story points** | ~14-18 weeks (2-person team) |

### 6.2 Infrastructure Services Setup

#### 6.2.1 Vercel Configuration

**Environment Variables Required:**
```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=
NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID=

# Database
DATABASE_URL= # Vercel Postgres

# Blob Storage
BLOB_READ_WRITE_TOKEN=

# AI APIs
RECRAFT_API_KEY=
DALLE_API_KEY= # Fallback
VECTORIZER_API_KEY=

# Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Inngest
INNGEST_SIGNING_KEY=
INNGEST_EVENT_KEY=

# Email
RESEND_API_KEY=
RESEND_FROM_EMAIL=notifications@livelyicons.com
```

#### 6.2.2 Third-Party Service Setup Checklist

- [ ] **Clerk**: Create application, configure social providers (Google, GitHub), set up webhooks
- [ ] **Stripe**: Create account, set up products (Pro, Team, Enterprise), configure webhooks for `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`
- [ ] **Vercel Postgres**: Provision database, run migrations, set up connection pooling
- [ ] **Vercel Blob**: Enable in project settings, configure CORS for uploads
- [ ] **Recraft/DALL-E**: Sign up for API access, set up billing alerts
- [ ] **Upstash Redis**: Create database, configure eviction policy (LRU)
- [ ] **Inngest**: Create account, set up webhook endpoint, deploy functions
- [ ] **Resend**: Create account, verify domain (livelyicons.com), set up API key
- [ ] **React Email**: Set up email template components, test with Resend preview

### 6.3 Storage Estimates

**Per User (Pro, 1 year):**
- 500 generated icons
- Avg icon size: 10KB SVG + 5KB component code = 15KB
- Total per user: 500 × 15KB = 7.5MB
- 1,000 Pro users = 7.5GB

**With Preview Images (optional):**
- If storing PNG previews: +50KB per icon
- 500 icons × 50KB = 25MB per user
- 1,000 Pro users = 25GB

**Recommendation:** Store only SVG + component code. Generate preview images on-the-fly (or cache in browser).

**Blob Storage Costs (Vercel):**
- First 100GB: $0.15/GB
- $0.15 × 10GB = $15/month (for 1,000 Pro users)

### 6.4 Transactional Email System

#### 6.4.1 Email Provider

**Recommendation:** **Resend** (built for developers, React Email templates, Vercel integration)

**Alternative:** Postmark (excellent deliverability) or Clerk's built-in email (limited templates)

**Environment Variables:**
```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL=notifications@livelyicons.com
```

#### 6.4.2 Required Email Templates

| Email | Trigger | Priority |
|-------|---------|----------|
| **Welcome** | User signs up (Clerk webhook: `user.created`) | Phase 1 |
| **First Generation** | User generates their first icon | Phase 1 |
| **Upgrade Confirmation** | Stripe webhook: `checkout.session.completed` | Phase 1 |
| **Payment Failed** | Stripe webhook: `invoice.payment_failed` | Phase 1 |
| **Token Balance Low** | < 10% of monthly tokens remaining | Phase 1 |
| **Monthly Usage Summary** | 1st of each month (Inngest cron) | Phase 2 |
| **Cancellation Confirmation** | Stripe: `customer.subscription.deleted` | Phase 1 |
| **Account Paused** | 14 days after payment failure | Phase 1 |
| **Token Refresh** | Monthly token balance replenished | Phase 2 |
| **Batch Complete** | Background batch job finishes | Phase 2 |

#### 6.4.3 Email Design

- Use **React Email** for template components (matches existing stack)
- Templates follow Lively Icons brand (same colors, typography as website)
- All emails include unsubscribe link (CAN-SPAM compliance)
- Plain text fallback for every HTML email

### 6.5 Testing Strategy

#### 6.5.1 Unit Tests

| Area | Framework | Coverage Target |
|------|-----------|----------------|
| **API Routes** | Vitest + MSW (mock AI/Stripe/Clerk APIs) | 90% |
| **Token deduction logic** | Vitest | 100% |
| **SVG validation pipeline** | Vitest | 95% |
| **Component code generation** | Vitest (snapshot tests) | 90% |

#### 6.5.2 Integration Tests

| Area | Framework | Scope |
|------|-----------|-------|
| **Stripe payment flow** | Stripe Test Mode + Vitest | Checkout → webhook → token credit |
| **Clerk auth flow** | Clerk Test Mode | Signup → webhook → subscription created |
| **AI generation pipeline** | MSW mock + real Recraft (staging) | Prompt → API → SVG → validation → storage |
| **Database operations** | Drizzle + test database | CRUD for all entities, soft-delete, cascades |

#### 6.5.3 End-to-End Tests

| Flow | Framework | Priority |
|------|-----------|----------|
| **Free trial → upgrade** | Playwright | P0 (Critical) |
| **Generate → preview → export** | Playwright | P0 (Critical) |
| **Batch generation** | Playwright | P1 |
| **Library management** | Playwright | P1 |
| **Plan downgrade** | Playwright + Stripe Test Clock | P1 |
| **Failed payment → dunning** | Stripe Test Clock | P2 |

#### 6.5.4 AI Generation Quality Testing

- **Golden set:** Maintain 50 standard prompts with expected quality baselines
- **Regression testing:** Run golden set against each model version change, compare output quality
- **Automated validation:** Every generated SVG must pass:
  - Valid XML
  - ViewBox present
  - Path count < 100
  - File size < 50KB
  - No embedded raster images
  - No external references

#### 6.5.5 Load Testing

**WHEN** preparing for launch **THE SYSTEM SHALL** pass load tests **WHERE** targets are:
- 100 concurrent generation requests (Vercel serverless cold start handling)
- 500 concurrent library reads
- Stripe webhook processing: 50 events/second
- AI API failover: Switch to DALL-E fallback within 5 seconds of Recraft failure

**Tool:** k6 (open-source load testing, scriptable in JS)

#### 6.5.6 Accessibility Testing

- All generator UI components meet **WCAG 2.1 AA**
- Keyboard navigation: Full generation flow completable via keyboard only
- Screen reader: All controls have ARIA labels, live regions for generation status
- `prefers-reduced-motion`: Playground preview respects system setting
- Color contrast: All text meets 4.5:1 ratio (including on dark mode)

**Tool:** axe-core (automated), manual testing with VoiceOver/NVDA

### 6.6 Performance Targets

| Metric | Target | Monitoring |
|--------|--------|-----------|
| **Generation Time** | < 10 seconds (p95) | Vercel Analytics, custom logs |
| **API Response Time** | < 500ms (excluding AI call) | Vercel Speed Insights |
| **Playground Load Time** | < 2 seconds (LCP) | Web Vitals |
| **Preview Animation FPS** | 60 FPS | Browser DevTools |
| **Batch Generation** | 1 icon per 10s (parallel limit: 3) | Inngest logs |

---

## 7. Data Model

### 7.1 Core Entities

```typescript
// TypeScript types (Drizzle schema)

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull().unique(),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }).notNull(),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  planType: varchar('plan_type', { length: 50 }).notNull(), // 'free' | 'pro' | 'team' | 'enterprise'
  status: varchar('status', { length: 50 }).notNull(), // 'active' | 'canceled' | 'past_due'
  tokensBalance: integer('tokens_balance').notNull().default(0),
  tokensRefreshDate: timestamp('tokens_refresh_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const generatedIcons = pgTable('generated_icons', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  prompt: text('prompt').notNull(),
  style: varchar('style', { length: 50 }).notNull(),
  animation: varchar('animation', { length: 50 }).notNull(),
  trigger: varchar('trigger', { length: 50 }).notNull(),
  svgCode: text('svg_code').notNull(),
  componentCode: text('component_code').notNull(),
  previewUrl: text('preview_url').notNull(),
  blobStorageKey: text('blob_storage_key').notNull(),
  tags: text('tags').array(),
  color: varchar('color', { length: 50 }),
  strokeWeight: real('stroke_weight'),
  duration: real('duration'),
  isActive: boolean('is_active').notNull().default(true), // FALSE when Free tier limit exceeded
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at'), // NULL = active, SET = soft-deleted (hard delete after 30 days)
}, (table) => ({
  userCreatedIdx: index('idx_user_created').on(table.clerkUserId, table.createdAt),
}));

export const collections = pgTable('collections', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  parentCollectionId: uuid('parent_collection_id').references(() => collections.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const collectionIcons = pgTable('collection_icons', {
  collectionId: uuid('collection_id').notNull().references(() => collections.id, { onDelete: 'cascade' }),
  iconId: uuid('icon_id').notNull().references(() => generatedIcons.id, { onDelete: 'cascade' }),
  addedAt: timestamp('added_at').defaultNow(),
}, (table) => ({
  pk: primaryKey({ columns: [table.collectionId, table.iconId] }),
}));

export const generationEvents = pgTable('generation_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
  eventType: varchar('event_type', { length: 50 }).notNull(), // 'generate' | 'refine' | 'export' | 'delete'
  iconId: uuid('icon_id').references(() => generatedIcons.id, { onDelete: 'set null' }),
  tokensUsed: integer('tokens_used').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  userEventsIdx: index('idx_user_events').on(table.clerkUserId, table.createdAt),
}));

export const batchJobs = pgTable('batch_jobs', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: varchar('clerk_user_id', { length: 255 }).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // 'queued' | 'processing' | 'completed' | 'failed'
  totalPrompts: integer('total_prompts').notNull(),
  completedCount: integer('completed_count').default(0),
  failedCount: integer('failed_count').default(0),
  prompts: jsonb('prompts').notNull(), // string[]
  style: varchar('style', { length: 50 }).notNull(),
  animation: varchar('animation', { length: 50 }),
  iconIds: jsonb('icon_ids'), // uuid[]
  createdAt: timestamp('created_at').defaultNow(),
  completedAt: timestamp('completed_at'),
}, (table) => ({
  userBatchesIdx: index('idx_user_batches').on(table.clerkUserId, table.createdAt),
}));
```

### 7.2 Relationships

```
subscriptions (1) ─────── (many) generatedIcons [clerkUserId]
subscriptions (1) ─────── (many) collections [clerkUserId]
subscriptions (1) ─────── (many) generationEvents [clerkUserId]
subscriptions (1) ─────── (many) batchJobs [clerkUserId]

collections (many) ──┬── (many) generatedIcons [via collectionIcons]
                     └── (1) parentCollection [self-reference]

generationEvents (many) ─── (1) generatedIcons [iconId, nullable]
```

### 7.3 Data Retention Policy

**WHEN** a user deletes their account **THE SYSTEM SHALL** remove all associated data **WHERE** deletion includes:
- All `generatedIcons` rows
- All `collections` and `collectionIcons` rows
- All `generationEvents` rows
- All blob storage files
- Subscription data (after 90-day grace period for billing disputes)

**WHEN** a user is inactive for 2 years **THE SYSTEM SHALL** send email notification **WHERE** the email warns of data deletion after 30 days of non-response.

**WHEN** an icon is deleted by the user **THE SYSTEM SHALL** soft-delete (mark as deleted) **WHERE** hard deletion occurs after 30 days (allows recovery).

---

## 8. Privacy & Ownership

### 8.1 User Rights

**WHEN** a user generates an icon **THE SYSTEM SHALL** grant full ownership to the user **WHERE** ownership includes:
- Right to use commercially without attribution
- Right to modify, redistribute, and sublicense
- Right to delete at any time
- Right to export all data (GDPR compliance)

**WHEN** a user requests data export **THE SYSTEM SHALL** provide a ZIP file containing:
- All generated SVG files
- All component code files
- Metadata CSV (prompts, styles, timestamps)
- Collections manifest JSON

### 8.2 Privacy Policy Requirements

**WHEN** generating icons **THE SYSTEM SHALL NOT** use user prompts or generated icons for model training **WHERE** a clear statement is added to Terms of Service:

> "Your generated icons and prompts are private. We do not use your data to train AI models or share it with third parties. Generated icons are exclusively yours."

**WHEN** a user opts into a "Community Gallery" (future feature) **THE SYSTEM SHALL** require explicit consent **WHERE** consent is opt-in, not opt-out.

### 8.3 License Grants

**Generated Icon License (User owns the output):**

```markdown
## License for AI-Generated Icons

Icons generated through Lively Icons AI Generator are licensed to you under the following terms:

- **Ownership**: You own all rights to icons you generate.
- **Usage**: Commercial and personal use, with no attribution required.
- **Modification**: You may modify, adapt, and create derivative works.
- **Redistribution**: You may redistribute as part of your projects (not as standalone icon packs).
- **No Warranty**: Icons are provided "as-is" without warranty of non-infringement.

Note: This license applies only to AI-generated icons, not to the original Lively Icons library (which remains MIT licensed).
```

### 8.4 Content Moderation

**WHEN** a prompt is submitted **THE SYSTEM SHALL** filter for prohibited content **WHERE** prohibited categories include:
- Hate speech, violence, or illegal content
- Copyrighted characters or logos (e.g., "Disney Mickey Mouse")
- Explicit or adult content
- Political figures or sensitive topics

**WHEN** a prohibited prompt is detected **THE SYSTEM SHALL** reject the generation with a clear message **WHERE** the user is informed of the reason without storing the prompt.

**WHEN** a user repeatedly submits prohibited prompts **THE SYSTEM SHALL** flag the account for review **WHERE** repeated violations result in suspension.

---

## 9. Success Metrics / KPIs

### 9.1 Product Metrics

| Metric | Target (6 months) | Measurement Method |
|--------|-------------------|-------------------|
| **Free-to-Paid Conversion Rate** | 5-7% | Stripe dashboard + custom analytics |
| **Monthly Active Generators** | 2,000 | Users who generate at least 1 icon/month |
| **Avg Generations per Pro User** | 50/month | Database query (generationEvents) |
| **Churn Rate (Pro)** | < 10%/month | Stripe subscription cancellations |
| **NPS (Net Promoter Score)** | > 50 | In-app survey (post-generation) |
| **Time-to-First-Generation** | < 2 minutes | User onboarding analytics |

### 9.2 Financial Metrics

| Metric | Target (12 months) | Source |
|--------|-------------------|--------|
| **MRR (Monthly Recurring Revenue)** | $50,000 | Stripe reporting |
| **ARR (Annual Recurring Revenue)** | $600,000 | Projected from MRR |
| **Customer Acquisition Cost (CAC)** | < $30 | Marketing spend / new paid users |
| **Lifetime Value (LTV)** | > $200 | Avg subscription value × avg lifetime (10 months) |
| **LTV:CAC Ratio** | > 6:1 | Standard SaaS benchmark |
| **Gross Margin** | > 85% | (Revenue - COGS) / Revenue |

### 9.3 Technical Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| **Generation Success Rate** | > 98% | Alert if < 95% (1-hour window) |
| **API Uptime** | 99.9% | Vercel status page + PagerDuty |
| **P95 Generation Time** | < 10s | Alert if > 15s |
| **Database Query Time (P95)** | < 100ms | Slow query log |
| **Blob Storage Egress** | < 500GB/month | Cost alert at $100/month |

### 9.4 User Engagement Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| **DAU/MAU Ratio** | Daily active users / Monthly active users | > 25% (engaged user base) |
| **Icons per Session** | Avg generations per playground visit | > 2 |
| **Export Rate** | % of generated icons that are exported | > 70% |
| **Library Return Rate** | % of users who return to library after 7 days | > 40% |
| **Batch Generation Adoption** | % of Pro users who use batch mode | > 30% (after 3 months) |

### 9.5 Analytics Implementation

**Tools:**
- **Vercel Analytics**: Page views, Web Vitals, function execution time
- **PostHog** (recommended): Event tracking, funnels, session replay
- **Stripe Dashboard**: Revenue, churn, MRR trends
- **Custom Dashboard** (Next.js admin route): User-level usage, token balances, generation history

**Key Events to Track:**
```typescript
// PostHog events
analytics.track('icon_generated', {
  userId: clerk.user.id,
  prompt: prompt,
  style: style,
  tokensUsed: 1,
  generationTime: elapsed,
});

analytics.track('icon_exported', {
  userId: clerk.user.id,
  iconId: iconId,
  exportFormat: 'react' | 'svg' | 'gif',
});

analytics.track('subscription_upgraded', {
  userId: clerk.user.id,
  fromPlan: 'free',
  toPlan: 'pro',
  stripeCustomerId: customerId,
});

analytics.track('batch_generation_started', {
  userId: clerk.user.id,
  batchSize: prompts.length,
  estimatedCost: prompts.length,
});
```

---

## 10. Phased Rollout

### Phase 1: MVP (10-12 weeks)

**Goal:** Launch a functional AI generator with basic features to validate product-market fit.

**Features:**
- ✅ Clerk authentication + Stripe checkout (monthly + annual billing)
- ✅ Multi-variant generation (3-4 variants per prompt)
- ✅ 7 style presets (line, solid, outline, duotone, pixel, isometric, hand-drawn)
- ✅ 14 animation types + 4 trigger modes
- ✅ Personal library (CRUD with soft-delete)
- ✅ Export formats: React component, Vue component, static SVG, vanilla HTML/CSS
- ✅ Free tier (5 tokens), Pro tier ($19/mo or $180/yr), token top-ups
- ✅ Playground integration (new "AI Generate" panel)
- ✅ Basic editing: color picker, animation tuning
- ✅ Regeneration flow (thumbs-down → free retry)
- ✅ `prefers-reduced-motion` + `IconProvider` integration in all generated components
- ✅ Transactional emails (welcome, upgrade, payment failed, token low)
- ✅ Subscription management (Stripe Customer Portal, downgrade flow)
- ✅ Webhook signature verification (Stripe + Clerk)
- ✅ Error states + empty states (all screens)
- ✅ WCAG 2.1 AA accessibility

**Out of Scope:**
- ❌ Batch generation
- ❌ Collections/folders
- ❌ Animated exports (GIF/Lottie)
- ❌ Team plan
- ❌ AI refinement ("make it simpler")
- ❌ Image-to-icon upload
- ❌ Custom style templates
- ❌ CDN embed delivery

**Success Criteria:**
- 100+ paid users within first 2 months
- < 5% churn rate
- > 95% generation success rate
- NPS > 40

**Launch Plan:**
1. Private beta (2 weeks): Invite 50 power users from Lively Icons community
2. Product Hunt launch (Week 3)
3. Social media campaign (Twitter/X, Reddit: r/reactjs, r/webdev)
4. Outreach to React/Next.js influencers (Theo, Lee Robinson, Kent C. Dodds)

---

### Phase 2: Power User Features (6-8 weeks)

**Goal:** Increase engagement and retention with advanced features.

**Features:**
- ✅ Batch generation (up to 20 prompts)
- ✅ Collections/folders for organization
- ✅ Animated exports (GIF, animated SVG)
- ✅ AI refinement ("make it simpler", "add detail")
- ✅ Image-to-icon upload (reference generation)
- ✅ Custom style templates (save reusable prompt + settings)
- ✅ CDN embed delivery (script tag, HTML class usage)
- ✅ Advanced editing tools:
  - Stroke weight adjustment
  - Manual SVG path editing
  - Background removal
  - Eraser tool
- ✅ Search and filtering (by tag, style, date)
- ✅ Bulk export (collection → ZIP)
- ✅ Monthly usage summary emails

**Success Criteria:**
- 50% of Pro users adopt batch generation
- Average generations per user increases by 30%
- Export rate (icons exported / icons generated) > 70%

---

### Phase 3: Team & Collaboration (6-8 weeks)

**Goal:** Target design system teams and agencies with collaborative features.

**Features:**
- ✅ Team plan ($49/mo, 2000 tokens, 5 seats)
- ✅ Shared icon libraries (team members can view/use all team icons)
- ✅ Collection sharing (public links with embeds)
- ✅ Team dashboard (usage analytics, member management)
- ✅ Role-based access control (admin, editor, viewer)
- ✅ Slack integration (post new generations to #design channel)
- ✅ Figma plugin integration (import generated icons directly)

**Success Criteria:**
- 50+ Team plan customers
- Team MRR exceeds $2,500
- < 7% churn rate for Team plans (lower than Pro due to stickiness)

---

### Phase 4: Enterprise & API Access (8-10 weeks)

**Goal:** Unlock high-value contracts with large organizations.

**Features:**
- ✅ Enterprise plan (custom pricing, starts at $500/mo)
- ✅ REST API for programmatic generation
- ✅ Webhooks (notify external systems on generation)
- ✅ White-label option (custom branding, domain)
- ✅ Custom model fine-tuning (train on brand style guide)
- ✅ SSO (SAML) for enterprise auth
- ✅ SLA (99.9% uptime guarantee, priority support)
- ✅ Dedicated account manager

**Success Criteria:**
- 5+ Enterprise customers (target: $25K MRR from Enterprise alone)
- API usage exceeds 10,000 generations/month
- Zero security incidents

**API Example:**
```bash
curl -X POST https://api.livelyicons.com/v1/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A rocket ship launching",
    "style": "line",
    "animation": "scale",
    "trigger": "hover"
  }'

# Response
{
  "iconId": "abc123",
  "svgCode": "<svg>...</svg>",
  "componentCode": "export function RocketIcon() { ... }",
  "previewUrl": "https://blob.livelyicons.com/...",
  "tokensUsed": 1
}
```

---

## 11. Risks & Mitigations

### 11.1 Community Backlash Risk

**Risk:** Existing users perceive adding paid features as a betrayal of the "free and open-source" ethos.

**Impact:** High (could damage brand reputation, cause library abandonment)

**Likelihood:** Medium (dev communities are sensitive to monetization)

**Mitigation Strategies:**
1. **Transparent Communication:**
   - Publish a blog post: "Why We're Adding AI Generation (And Why the Library Stays Free)"
   - Emphasize: Core library remains 100% free, MIT licensed, no changes to existing users
   - Frame as: "Premium add-on for custom needs, funds ongoing library maintenance"

2. **Early Adopter Perks:**
   - First 500 users get lifetime 50% discount on Pro plan
   - Original contributors get free Pro plan (GitHub commit history)

3. **Community Involvement:**
   - Ask for feedback in GitHub Discussions before launch
   - Run a poll: "What features would you pay for?"

4. **Generous Free Tier:**
   - 5 free generations (enough to test thoroughly)
   - No credit card required for trial

**Monitoring:**
- Track GitHub issues/discussions for negative sentiment
- Monitor Twitter/X mentions and Reddit posts
- NPS surveys to gauge perception shifts

---

### 11.2 AI Generation Quality Risk

**Risk:** AI-generated icons are low quality, inconsistent, or don't match prompts.

**Impact:** High (users won't pay for poor output, negative reviews)

**Likelihood:** Medium (AI models are improving but not perfect)

**Mitigation Strategies:**
1. **Model Selection:**
   - Start with Recraft V3 (icon-specialized model)
   - Maintain fallback to DALL-E 3 if Recraft fails
   - A/B test models and choose best performer

2. **Prompt Engineering Layer:**
   - Pre-process user prompts with templates:
     - User: "rocket ship"
     - API: "A minimalist line art icon of a rocket ship, simple, flat design, black and white, 24x24 pixels"
   - Maintain a library of successful prompt patterns

3. **Quality Filters:**
   - Auto-reject generations that fail validation (e.g., too complex, wrong aspect ratio)
   - Allow users to regenerate for free if they rate output < 3 stars

4. **Human Review (Phase 1):**
   - Manually review first 1,000 generations to identify failure patterns
   - Build a training dataset of good vs. bad outputs

5. **Iterative Refinement:**
   - Offer free refinements: "make it simpler", "add more detail"
   - Track refinement requests to identify model weaknesses

**Monitoring:**
- Track user ratings (1-5 stars) on generated icons
- Monitor regeneration rate (high rate = quality issues)
- A/B test model versions (Recraft v3.1 vs. v3.2)

---

### 11.3 SVG Conversion Fidelity Risk

**Risk:** Converting raster AI output (PNG) to SVG results in loss of detail, artifacts, or bloated file sizes.

**Impact:** Medium (affects aesthetics and performance)

**Likelihood:** High (if using DALL-E/SD instead of native SVG models)

**Mitigation Strategies:**
1. **Prioritize Native SVG Models:**
   - Use Recraft V3 (outputs SVG directly) as primary
   - Only fall back to raster → SVG pipeline if necessary

2. **High-Quality Vectorization:**
   - Use vectorizer.ai (AI-powered, better than Potrace)
   - Set quality threshold: Reject if output > 100 paths or > 50KB

3. **Post-Processing:**
   - Run SVGO optimization (removes redundant attributes)
   - Simplify paths (reduce anchor points by 20-30%)
   - Convert bezier curves to simpler arcs where possible

4. **User Control:**
   - Offer "Simplify" slider in editor (adjusts path complexity)
   - Show file size preview before export

**Monitoring:**
- Track average file size of generated SVGs
- Alert if file size > 50KB (indicates conversion issues)
- User feedback: "Was the icon quality acceptable?" (Yes/No)

---

### 11.4 Cost Management Risk

**Risk:** AI API costs spiral out of control due to abuse, bugs, or underpricing.

**Impact:** High (could erase profit margins or cause financial loss)

**Likelihood:** Medium (common issue for AI-powered products)

**Mitigation Strategies:**
1. **Strict Rate Limiting:**
   - Free tier: 5 generations per hour (absolute max: 10/day)
   - Pro tier: 50 generations per hour (absolute max: 500/month)
   - Block users who repeatedly hit limits

2. **Cost Alerts:**
   - Set Vercel/Stripe alerts: Notify if daily AI spend > $100
   - Weekly budget reports sent to team

3. **Token Economics:**
   - Ensure token cost > AI API cost (e.g., 1 token = $0.03, API cost = $0.02)
   - Build in 50% margin to cover processing, storage, and overhead

4. **Abuse Detection:**
   - Flag users generating 100+ identical prompts
   - Detect and block bot traffic (Cloudflare Turnstile CAPTCHA)

5. **Graceful Degradation:**
   - If API budget is exhausted, pause new generations (show maintenance message)
   - Allow exports of existing library icons (no generation blocked)

**Monitoring:**
- Daily AI API spend dashboard (Recraft + DALL-E + Vectorizer)
- Cost per generation (target: < $0.02)
- Revenue per generated icon (target: > $0.04)

---

### 11.5 Security & Privacy Risk

**Risk:** Unauthorized access to user libraries, data leaks, or payment fraud.

**Impact:** Critical (GDPR violations, user trust loss, legal liability)

**Likelihood:** Low (but high impact if occurs)

**Mitigation Strategies:**
1. **Authentication:**
   - Clerk handles auth (secure, SOC 2 compliant)
   - Enforce 2FA for Team/Enterprise plans

2. **Authorization:**
   - Row-level security: Users can only query their own `clerkUserId`
   - API routes validate Clerk session on every request

3. **Data Encryption:**
   - Database: Encryption at rest (Vercel Postgres default)
   - Blob storage: Private by default, signed URLs for access
   - API: HTTPS only (enforced by Vercel)

4. **Payment Security:**
   - Never store credit card data (handled by Stripe)
   - PCI DSS compliance via Stripe Checkout

5. **Incident Response Plan:**
   - Prepare breach notification template (GDPR requires 72-hour notification)
   - Designate security lead (responsible for patching, disclosures)

**Monitoring:**
- Failed auth attempt logs (alert if > 100/hour from single IP)
- Unauthorized access attempts (alert on 403 errors spike)
- Stripe fraud detection (automatic in Stripe dashboard)

---

## 12. Open Questions

### 12.1 Product Questions

| Question | Options | Decision Needed By | Owner |
|----------|---------|-------------------|-------|
| **Should free users keep generated icons forever?** | A) Yes, unlimited storage<br>B) Yes, but max 20 icons<br>C) No, deleted after 30 days | Phase 1 launch | Product |
| **Should we allow community sharing of generated icons?** | A) Yes (opt-in)<br>B) No (always private)<br>C) Yes, but only for Pro+ users | Phase 2 | Product |
| **Should we offer a "surprise me" mode (random generation)?** | A) Yes, fun onboarding feature<br>B) No, too gimmicky | Phase 1 (nice-to-have) | Design |
| **Should animations be editable post-generation?** | A) Yes, full control (easing, duration, etc.)<br>B) No, pick preset only | Phase 1 MVP | Engineering |
| **Should we support custom animation code (Motion props)?** | A) Yes, for advanced users<br>B) No, presets only | Phase 3 | Engineering |

| **How many variants per generation?** | A) 3 variants<br>B) 4 variants<br>C) Configurable (user picks 1-4) | Phase 1 (week 2) | Product + Engineering |
| **Should image-to-icon accept any image or only icons/sketches?** | A) Any image (photo, screenshot, sketch)<br>B) Only simple images (sketches, icons, logos)<br>C) Any image, but quality warning for complex photos | Phase 2 | Product |
| **Should CDN delivery support animation?** | A) Yes, CSS animations via sprite sheet<br>B) No, static SVGs only via CDN<br>C) Optional (user toggles animation per icon) | Phase 2 | Engineering |

### 12.2 Technical Questions

| Question | Options | Decision Needed By | Owner |
|----------|---------|-------------------|-------|
| **Which AI model should we use?** | A) Recraft V3<br>B) DALL-E 3<br>C) Stable Diffusion XL<br>D) Hybrid (best of both) | Phase 1 (week 1) | Engineering |
| **Should we fine-tune a custom model?** | A) Yes, train on existing Lively Icons<br>B) No, use off-the-shelf<br>C) Phase 2 decision | Phase 1: No<br>Phase 4: Revisit | Engineering |
| **How should we handle SVG optimization?** | A) Aggressive (smallest file size)<br>B) Balanced (quality vs. size)<br>C) Minimal (preserve all paths) | Phase 1 (week 2) | Engineering |
| **Should we support Lottie animations?** | A) Yes, export Lottie JSON<br>B) No, too complex<br>C) Phase 3+ only | Phase 2 | Engineering |
| **Should we cache generated icons server-side?** | A) Yes, 1-hour cache for regeneration<br>B) No, always fresh | Phase 1 | Engineering |
| **Which email provider?** | A) Resend (React Email integration)<br>B) Postmark (best deliverability)<br>C) Clerk built-in (limited but no extra service) | Phase 1 (week 1) | Engineering |
| **Database migration strategy?** | A) Drizzle Kit (push/migrate)<br>B) Manual SQL migrations<br>C) Prisma Migrate (switch ORM) | Phase 1 (week 1) | Engineering |

### 12.3 Business Questions

| Question | Options | Decision Needed By | Owner |
|----------|---------|-------------------|-------|
| **Should we offer a one-time purchase option?** | A) Yes, $99 lifetime (500 tokens)<br>B) No, subscription only<br>C) Phase 2+ decision | Phase 1 | Business |
| **Should we offer reseller/affiliate program?** | A) Yes, 20% commission<br>B) No, focus on direct sales | Phase 3 | Marketing |
| **Should we target B2C or B2B first?** | A) B2C (individual developers)<br>B) B2B (design teams)<br>C) Both equally | Phase 1: B2C<br>Phase 3: B2B | Marketing |
| **Should we offer educational discounts?** | A) Yes, 50% off for students<br>B) Yes, free Pro for verified educators<br>C) No discounts | Phase 2 | Business |
| **Should we build a marketplace for user-generated icons?** | A) Yes, users can sell their generated icons<br>B) No, too complex<br>C) Phase 4+ decision | Phase 4 | Product |

### 12.4 Legal Questions

| Question | Options | Decision Needed By | Owner |
|----------|---------|-------------------|-------|
| **Who owns the copyright to AI-generated icons?** | A) User owns outright<br>B) Lively Icons owns, user has unlimited license<br>C) Shared ownership | Before launch (Legal review) | Legal |
| **Are there restrictions on commercial use?** | A) No restrictions<br>B) Attribution required<br>C) Cannot resell as standalone icons | Before launch | Legal |
| **What happens if a generated icon infringes copyright?** | A) User is liable<br>B) Lively Icons is liable<br>C) Shared liability (need insurance) | Before launch | Legal |
| **Should we require DMCA agent registration?** | A) Yes (standard for UGC platforms)<br>B) No (we don't host user content publicly) | Before launch | Legal |

---

## Appendix A: User Stories

### Story 1: First-Time User

**As a** freelance React developer
**I want to** generate a custom animated icon for my client's landing page
**So that** I can deliver a unique, branded experience without hiring a designer

**Acceptance Criteria:**
- User can sign up with Google in < 30 seconds
- User can generate an icon from a simple prompt ("coffee cup")
- User sees the animated preview immediately
- User can copy React component code with one click
- Icon works when pasted into a Next.js project

---

### Story 2: Power User

**As a** design system engineer at a mid-size company
**I want to** generate a consistent set of 50 icons for our internal tool
**So that** our UI has a unified look without purchasing a $500 icon pack

**Acceptance Criteria:**
- User can paste a list of 50 prompts
- Batch generation completes within 10 minutes
- All icons have consistent style (same stroke weight, proportions)
- User can export all 50 icons as a ZIP with index file
- Icons integrate seamlessly with existing livelyicons in the project

---

### Story 3: Team Lead

**As a** product design lead at a startup
**I want to** share a library of AI-generated icons with my design team
**So that** everyone has access to our custom icon set without duplicating work

**Acceptance Criteria:**
- Team lead can invite 5 teammates
- All teammates see shared icon library
- Teammates can use/export icons but not delete
- Team lead can view usage analytics (who generated what)
- Team billing is consolidated under one subscription

---

## Appendix B: Competitive Analysis

| Feature | Lively Icons AI | iconly.ai | Flaticon | Noun Project | Iconify |
|---------|----------------|-----------|----------|--------------|---------|
| **AI Generation** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Animations** | ✅ (14 types) | ❌ | ❌ | ❌ | ❌ (community plugins only) |
| **React Components** | ✅ (primary format) | ❌ (SVG only) | ❌ | ❌ | ✅ (static) |
| **Batch Generation** | ✅ (Phase 2) | ❌ | N/A | N/A | N/A |
| **Personal Library** | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Free Tier** | 5 generations | 300 tokens | 10/day downloads | Limited | Unlimited (static) |
| **Pricing** | $19/mo (Pro) | $15-$180/mo | $9.99/mo | $39.99/year | Free |
| **Team Features** | ✅ (Phase 3) | ❌ | ❌ | ✅ | ❌ |
| **API Access** | ✅ (Phase 4) | ❌ | ❌ | ❌ | ✅ (static icons) |
| **Unique Value** | **Animated React components** | AI editing tools | Huge library | Curated designs | Best for static icons |

**Conclusion:** Lively Icons is the ONLY platform offering AI-generated animated icons as React components. This is a defensible moat.

---

## Appendix C: Technical Stack Summary

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Framework** | Next.js 15 (App Router) | Existing stack, server components, API routes |
| **UI** | React 19, Tailwind CSS 4 | Existing stack, fast development |
| **Animation** | Motion (Framer Motion) | Existing library integration |
| **Database** | Vercel Postgres (Neon) | Managed, serverless, low latency |
| **ORM** | Drizzle ORM | Type-safe, lightweight, fast |
| **Auth** | Clerk | Best Next.js integration, social providers |
| **Payments** | Stripe | Industry standard, flexible billing |
| **Storage** | Vercel Blob | Managed, CDN, simple API |
| **Cache** | Upstash Redis | Rate limiting, sessions |
| **Queue** | Inngest | Background jobs, retries |
| **AI Model** | Recraft V3 / DALL-E 3 | Icon-specialized, high quality |
| **Vectorization** | vectorizer.ai | AI-powered, best quality |
| **Email** | Resend + React Email | Developer-friendly, Vercel integration |
| **Analytics** | Vercel Analytics + PostHog | Page views + custom events |
| **Monitoring** | Vercel Logs + Sentry | Error tracking, performance |
| **Testing** | Vitest + Playwright + k6 | Unit, E2E, load testing |
| **Hosting** | Vercel | Seamless integration, edge network |

---

## Appendix D: Launch Checklist

### Pre-Launch (Weeks -2 to 0)

- [ ] Private beta with 50 users (collect feedback)
- [ ] Load testing (100 concurrent generations)
- [ ] Security audit (penetration testing)
- [ ] Legal review (Terms of Service, Privacy Policy)
- [ ] Pricing finalized (Pro: $19/mo, Team: $49/mo)
- [ ] Stripe products created (test mode → live mode)
- [ ] Clerk production app configured
- [ ] Database migrations run in production
- [ ] Blob storage provisioned
- [ ] AI API keys configured (rate limits set)
- [ ] Monitoring dashboards set up (PostHog, Sentry)
- [ ] Resend email templates tested (welcome, upgrade, payment failed, token low)
- [ ] E2E tests passing (Playwright: signup → generate → export, upgrade flow)
- [ ] Load testing passed (k6: 100 concurrent generations)
- [ ] Accessibility audit passed (axe-core + manual VoiceOver/NVDA testing)
- [ ] Webhook signature verification confirmed (Stripe + Clerk endpoints)
- [ ] Downgrade flow tested (Pro → Free: icon limit, read-only behavior)
- [ ] Dunning sequence configured (Stripe retry schedule + email triggers)
- [ ] Documentation written (Help Center articles)
- [ ] Marketing assets ready (landing page, demo video, screenshots)

### Launch Day (Day 0)

- [ ] Deploy to production (Vercel)
- [ ] Enable AI generator for all users
- [ ] Publish blog post: "Introducing AI Icon Generator"
- [ ] Post on Twitter/X with demo video
- [ ] Submit to Product Hunt (scheduled for 12:01 AM PST)
- [ ] Post in Reddit: r/reactjs, r/webdev, r/nextjs
- [ ] Email existing Lively Icons users (announce new feature)
- [ ] Monitor error rates (alert if > 1%)
- [ ] Monitor generation success rate (alert if < 95%)
- [ ] Monitor social media mentions (respond to feedback)

### Post-Launch (Weeks 1-4)

- [ ] Daily check-ins: MRR, signups, churn
- [ ] Weekly user interviews (5 new users, 5 power users)
- [ ] Iterate on prompt templates based on success rates
- [ ] Fix top 5 bugs/issues from feedback
- [ ] Publish case study: "How [Company] Uses Lively Icons AI"
- [ ] Outreach to influencers (Theo, Lee Robinson, Kent C. Dodds)
- [ ] A/B test pricing ($15 vs. $19 for Pro)
- [ ] Plan Phase 2 features based on user requests

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-10 | Product Team | Initial PRD creation |
| 1.1 | 2026-02-10 | Product Team | Added: CDN delivery, multi-variant generation, image-to-icon upload, custom style templates, annual billing, token top-ups, subscription lifecycle (downgrade/dunning/cancellation), transactional email system, Vue/vanilla export, `prefers-reduced-motion` compliance, `IconProvider` integration, webhook security, testing strategy, error/empty states, regeneration policy. Fixed: soft-delete schema bug, rate limit contradiction, churn-adjusted revenue projections. |

---

**Approval Sign-Off:**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Lead | [TBD] | | |
| Engineering Lead | [TBD] | | |
| Design Lead | [TBD] | | |
| Business/Finance | [TBD] | | |

---

**End of Document**
