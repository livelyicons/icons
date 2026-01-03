# Visual Assets for Figma Community Publishing

This directory contains visual assets required for publishing LivelyIcons to the Figma Community. All assets must be created before submission.

## Required Assets Checklist

- [ ] `cover.png` - Cover image for plugin listing
- [ ] `icon.png` - Plugin icon
- [ ] `screenshots/` - Directory containing 4-6 feature screenshots

---

## 1. Cover Image

**Filename**: `cover.png`

### Specifications
- **Dimensions**: 1920 × 960 pixels
- **Aspect Ratio**: 2:1 (landscape)
- **Format**: PNG
- **Color Mode**: RGB
- **Max File Size**: 2MB
- **Resolution**: 72 DPI minimum

### Design Requirements

#### Content to Include
1. **LivelyIcons Branding**
   - Include LivelyIcons wordmark or logo
   - Use Lively brand colors (green gradient: #064e3b → #065f46)

2. **Icon Showcase**
   - Display 12-20 representative icons from diverse categories
   - Show icons in a clean grid or artistic arrangement
   - Ensure icons are clearly visible and legible

3. **Key Messaging**
   - "1,319 Animated Icons" or similar stat
   - Optional: "For Figma Designers" or value proposition

4. **Visual Style**
   - Modern, clean design matching Figma's aesthetic
   - Use gradients, subtle shadows, or depth
   - Suggest motion/animation through trails or blur effects

#### Design Tips
- **Thumbnail Preview**: Ensure design works at 384×192px (Community thumbnail size)
- **High Contrast**: Make sure text and icons pop against background
- **Avoid Clutter**: Keep composition clean and focused
- **Show Personality**: Let the "Lively" brand shine through with energy and movement

#### Color Palette
Use colors from the Lively brand identity:

- **Primary Green**: `#22c55e` (Lively growth)
- **Secondary Green**: `#4ade80` (Fresh accent)
- **Light Green**: `#86efac` (Highlights)
- **Dark Forest**: `#064e3b` (Background)
- **Deep Forest**: `#065f46` (Background gradient)
- **White/Light**: `#ffffff` or `#f9fafb` (Text, icons on dark)

#### Example Layout Ideas

**Option A: Grid Showcase**
```
┌─────────────────────────────────────────┐
│  [LivelyIcons Logo]     1,319 Icons     │
│                                         │
│  [Icon] [Icon] [Icon] [Icon] [Icon]    │
│  [Icon] [Icon] [Icon] [Icon] [Icon]    │
│  [Icon] [Icon] [Icon] [Icon] [Icon]    │
│  [Icon] [Icon] [Icon] [Icon] [Icon]    │
│                                         │
│      For Figma Designers                │
└─────────────────────────────────────────┘
```

**Option B: Hero Icon with Surrounding Constellation**
```
┌─────────────────────────────────────────┐
│  LivelyIcons                            │
│                                         │
│      [Icon]  [Icon]                     │
│                                         │
│  [Icon]   [LARGE ICON]   [Icon]        │
│                                         │
│      [Icon]  [Icon]                     │
│                                         │
│  1,319 Animated Icons for Figma         │
└─────────────────────────────────────────┘
```

**Option C: Plugin Interface Mockup**
```
┌─────────────────────────────────────────┐
│  LivelyIcons                            │
│                                         │
│  [Screenshot of plugin interface        │
│   showing icon grid, search bar,        │
│   and customization panel]              │
│                                         │
│  Browse, Customize, Insert              │
└─────────────────────────────────────────┘
```

### Creation Tools
- **Figma**: Design directly in Figma, export as PNG at 2x
- **Adobe Illustrator/Photoshop**: Professional design tools
- **Canva**: Quick design option

### Export Settings
```
Format: PNG
Scale: 2x (for retina displays)
Color Space: sRGB
Compression: Optimize for web
```

### Quality Checklist
- [ ] Design looks good at full size (1920×960)
- [ ] Design is recognizable at thumbnail size (384×192)
- [ ] Text is legible and high contrast
- [ ] Icons are crisp and clear
- [ ] File size is under 2MB
- [ ] No pixelation or artifacts
- [ ] Colors are vibrant and accurate
- [ ] Brand identity is clear

---

## 2. Plugin Icon

**Filename**: `icon.png`

### Specifications
- **Dimensions**: 128 × 128 pixels
- **Format**: PNG with transparency
- **Color Mode**: RGBA (with alpha channel)
- **Max File Size**: 256KB
- **Resolution**: 72 DPI minimum

### Design Requirements

#### Source
Use the Lively brand icon from `/public/logo.svg` as the source:
- Vine/growth symbol with curved stem
- Two leaves (primary and secondary)
- Tendril curl at top
- Motion echo trails suggesting animation

#### Adaptations for Small Size
At 128×128px (and shown as small as 32×32px in some contexts):

1. **Simplify if Needed**
   - Keep the iconic vine shape
   - Ensure leaves are distinct
   - Motion trails should be visible but not cluttered
   - Consider removing smallest details that won't show at 32×32px

2. **Contrast and Clarity**
   - Make sure icon works on both light and dark backgrounds
   - Use strong color contrast
   - Avoid very thin lines (< 2px at final size)

3. **Center the Icon**
   - Add small padding (8-12px) around the symbol
   - Ensure visual weight is balanced

#### Color Options

**Option A: Full Color (Recommended)**
- Use gradient from logo.svg
- Green gradient: `#22c55e` → `#86efac`
- Dark background circle or square

**Option B: Monochrome with Background**
- White icon on green circular background
- Ensures visibility on any background

**Option C: Transparent Background**
- Full color icon
- No background
- Must work on light and dark equally

### Creation Steps

1. **Open** `/public/logo.svg` in design tool
2. **Extract** the vine icon (paths only, remove background)
3. **Resize** artboard to 128×128px
4. **Center** icon with appropriate padding
5. **Simplify** details if needed for small size
6. **Test** at 32×32px to ensure clarity
7. **Export** as PNG with transparency

### Export Settings
```
Format: PNG-24 (with alpha)
Size: 128×128px
Color Space: sRGB
Transparency: Enabled
Background: Transparent (or solid color if using background option)
```

### Quality Checklist
- [ ] Icon is recognizable at 32×32px
- [ ] Icon is recognizable at 128×128px
- [ ] Transparent background (or appropriate solid background)
- [ ] No jagged edges or pixelation
- [ ] Colors match brand identity
- [ ] File size under 256KB
- [ ] Works on light backgrounds
- [ ] Works on dark backgrounds
- [ ] Visually distinct from other icon plugins

---

## 3. Screenshots

**Directory**: `screenshots/`

### Specifications (All Screenshots)
- **Dimensions**: 1280 × 800 pixels (recommended)
  - Alternative: 1600 × 1000 or 1920 × 1200
  - Must maintain 16:10 aspect ratio
- **Format**: PNG
- **Color Mode**: RGB
- **Max File Size per Screenshot**: 2MB
- **Resolution**: 72 DPI minimum

### Required Screenshots

#### Screenshot 1: Browse All Icons
**Filename**: `01-browse.png`

**What to Show**:
- Full plugin interface open in Figma
- Icon grid visible with multiple icons
- Category tabs displayed at top
- Search bar visible (but empty/inactive)
- Some variety of icons showing different styles

**Purpose**: Demonstrate the breadth of the icon library

**Capture Tips**:
- Use a real Figma file (not empty canvas)
- Show plugin docked to the side
- Ensure all UI elements are visible
- Use light mode for clarity (or dark mode if preferred)
- Include ~20-30 icons in view

**Caption**: "Browse 1,319 icons across 36 categories"

---

#### Screenshot 2: Search Functionality
**Filename**: `02-search.png`

**What to Show**:
- Search bar with text entered (e.g., "arrow" or "user")
- Filtered icon results below
- Highlight how fuzzy search works (optional annotation)

**Purpose**: Show search capability and result filtering

**Capture Tips**:
- Choose a common search term with good results
- Show 8-12 relevant results
- Consider adding subtle highlight or arrow pointing to search bar
- Show count of results if visible in UI

**Caption**: "Find exactly what you need with fuzzy search"

---

#### Screenshot 3: Customization Panel
**Filename**: `03-customize.png`

**What to Show**:
- An icon selected from the grid
- Customize panel EXPANDED showing all options:
  - Size presets (16, 24, 32, 48, 64)
  - Stroke width slider
  - Color picker
- Live preview showing the customized icon

**Purpose**: Demonstrate customization capabilities

**Capture Tips**:
- Choose a distinctive icon that shows customization well
- Set custom values (e.g., 48px, stroke 2.5, custom color)
- Ensure live preview is clearly visible
- Show before/after if possible (two icons with different settings)

**Caption**: "Customize size, stroke, and color with live preview"

---

#### Screenshot 4: Export Formats
**Filename**: `04-export.png`

**What to Show**:
- Export panel EXPANDED showing format options (SVG, React, Vue)
- One format selected with generated code visible
- Copy Code button visible
- Could show code panel or clipboard notification

**Purpose**: Highlight export functionality and developer-friendly features

**Capture Tips**:
- Choose React or Vue export (more impressive than plain SVG)
- Show actual generated code if your UI displays it
- Consider annotation showing "Copy to clipboard" action
- Make code legible but doesn't need to fill screen

**Caption**: "Export as SVG, React, or Vue components"

---

#### Screenshot 5 (Optional): Canvas Integration
**Filename**: `05-canvas.png`

**What to Show**:
- Figma canvas with inserted icons in context
- Real design work (e.g., UI mockup, dashboard, website)
- Multiple icons from plugin integrated naturally
- Plugin still visible showing the insert action

**Purpose**: Show real-world usage and design integration

**Capture Tips**:
- Create a realistic design (mobile app, dashboard, etc.)
- Use 5-10 icons from the plugin
- Show how icons fit into actual design work
- Keep plugin visible on side to show the workflow

**Caption**: "Seamlessly integrate icons into your designs"

---

#### Screenshot 6 (Optional): Category Filtering
**Filename**: `06-categories.png`

**What to Show**:
- Category tabs with one specific category selected
- Icons filtered to only that category
- Good variety of icons within the category shown

**Purpose**: Demonstrate organization and filtering

**Capture Tips**:
- Choose a category with visually interesting icons (e.g., "Animals", "Weather")
- Show ~15-20 icons from that category
- Make it clear which category tab is active

**Caption**: "Explore icons by category for focused browsing"

---

### General Screenshot Guidelines

#### Capture Environment
- **Figma Version**: Use latest Figma Desktop or Web
- **Theme**: Light mode recommended (better visibility), or dark if brand-appropriate
- **Canvas**: Show realistic design work, not empty canvas
- **Zoom**: Set to comfortable viewing level (50-100%)
- **Window**: Ensure plugin is visible and properly sized

#### Composition
- **Rule of Thirds**: Place important elements strategically
- **White Space**: Don't overcrowd, leave breathing room
- **Focus**: Each screenshot should focus on ONE key feature
- **Consistency**: Use same Figma theme across all screenshots
- **Context**: Show enough of Figma UI to orient users, but not so much it distracts

#### Quality Standards
- **Sharpness**: No blur or motion artifacts
- **Colors**: Accurate and vibrant
- **Text**: All text must be legible (minimum 12px effective size)
- **Alignment**: UI elements should be properly aligned
- **Completeness**: No cut-off elements or awkward cropping

#### Optional Enhancements
- **Annotations**: Subtle arrows or highlights (use sparingly)
- **Callouts**: Small text labels for clarity
- **Hover States**: Show tooltips or interactive states
- **Before/After**: Split screen showing feature impact

### Creation Process

1. **Set Up Figma**
   - Open a real project or create realistic mockup
   - Install and open LivelyIcons plugin
   - Set theme (light or dark)
   - Resize plugin to appropriate width

2. **Prepare Each Scene**
   - Navigate to feature you want to showcase
   - Ensure UI is in correct state (panels expanded, icons selected, etc.)
   - Stage the "action" you're demonstrating

3. **Capture Screenshot**
   - Use Figma's built-in screenshot (Cmd/Ctrl + Shift + 4)
   - Or use macOS Screenshot tool (Shift + Cmd + 4)
   - Or Windows Snipping Tool
   - Capture full window including plugin

4. **Edit in Image Editor** (if needed)
   - Crop to 1280×800 (or chosen size)
   - Add subtle annotations if helpful
   - Optimize image compression
   - Verify file size < 2MB

5. **Quality Check**
   - View at 100% zoom - is everything sharp?
   - View at 50% zoom - does it still make sense?
   - Does it clearly show the feature?
   - Is text legible?

### Export Settings
```
Format: PNG-24
Size: 1280×800px (or 1600×1000, 1920×1200)
Color Space: sRGB
Compression: Optimize for web (keep under 2MB)
```

### Screenshot Checklist (Each Screenshot)
- [ ] Correct dimensions (1280×800 or alternative)
- [ ] File size under 2MB
- [ ] Feature clearly demonstrated
- [ ] All text is legible
- [ ] No sensitive information visible
- [ ] Realistic design context shown
- [ ] Colors are accurate
- [ ] No UI glitches or artifacts
- [ ] Filename matches convention (01-browse.png, etc.)
- [ ] Caption prepared for Figma Community upload

---

## File Organization

Expected file structure:
```
assets/
├── README.md (this file)
├── cover.png (1920×960)
├── icon.png (128×128)
└── screenshots/
    ├── 01-browse.png (1280×800)
    ├── 02-search.png (1280×800)
    ├── 03-customize.png (1280×800)
    ├── 04-export.png (1280×800)
    ├── 05-canvas.png (1280×800) [optional]
    └── 06-categories.png (1280×800) [optional]
```

---

## Tools and Resources

### Design Tools
- **Figma** (recommended) - Design and export directly
- **Adobe Photoshop** - Professional image editing
- **Adobe Illustrator** - Vector graphics
- **Sketch** - macOS design tool
- **Affinity Designer** - Cost-effective alternative

### Screenshot Tools
- **macOS**: Cmd+Shift+4 (built-in)
- **Windows**: Snipping Tool, Snip & Sketch
- **Figma Plugin**: Screenshot plugins available

### Image Optimization
- **TinyPNG** - https://tinypng.com/ (compress PNG files)
- **ImageOptim** - macOS app for optimization
- **Squoosh** - https://squoosh.app/ (Google's image optimizer)

### Reference and Inspiration
- **Figma Community** - Browse other successful plugins for inspiration
- **Apple App Store** - Similar screenshot standards
- **Google Play Store** - Screenshot best practices

---

## Tips for Success

### Design Principles
1. **Clarity Over Creativity**: Make sure features are obvious
2. **Consistency**: Use same visual style across all assets
3. **Brand Alignment**: Stay true to Lively brand identity
4. **Professional Quality**: Match or exceed Figma's design standards

### Common Mistakes to Avoid
- Blurry or pixelated images
- Empty canvas (no context)
- Cluttered composition
- Illegible text
- Wrong dimensions or file formats
- Misleading screenshots (showing features that don't exist)
- Dark screenshots that are hard to see at thumbnail size

### Testing Your Assets
1. **View at Multiple Sizes**: Check how cover looks at thumbnail size
2. **Different Backgrounds**: Test icon on light and dark backgrounds
3. **Peer Review**: Get feedback from team members
4. **Compare to Competitors**: Look at similar plugins in Community

---

## Asset Creation Timeline

Recommended sequence:

1. **Day 1**: Create plugin icon (fastest, use existing logo)
2. **Day 2**: Capture all screenshots (test plugin thoroughly first)
3. **Day 3**: Design and create cover image
4. **Day 4**: Optimize all images, final review
5. **Day 5**: Upload to Figma Community

---

## Quality Assurance

Before submission, verify:

- [ ] All required files present
- [ ] All files meet size requirements
- [ ] All files meet dimension requirements
- [ ] Images are optimized for web
- [ ] No compression artifacts
- [ ] Colors are accurate
- [ ] Branding is consistent
- [ ] Screenshots show actual plugin features
- [ ] No placeholder content
- [ ] File names follow convention

---

## Updates and Maintenance

When updating plugin (v1.1, v1.2, etc.):

- Update screenshots if UI has changed significantly
- Keep cover image current with latest feature count
- Refresh screenshots annually even if features haven't changed
- Update if Figma's UI design language changes

---

## Contact

**Questions about asset creation?**
- Review PUBLISHING.md for complete submission guide
- Check Figma's official plugin publishing docs
- Consult with design team for brand guidelines

---

**Document Version**: 1.0
**Last Updated**: 2025-01-03
**Next Review**: Before v1.1.0 release
