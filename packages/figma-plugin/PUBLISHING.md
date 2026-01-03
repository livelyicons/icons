# Figma Community Publishing Checklist

This document outlines the complete process for publishing LivelyIcons to the Figma Community. Follow this checklist to ensure a smooth submission and approval process.

## Overview

**Plugin Name**: LivelyIcons
**Tagline**: 1,319 animated icons for your designs
**Publisher**: LivelyIcons Team
**Version**: 1.0.0
**Target Audience**: Designers, product teams, UI/UX professionals

---

## Pre-Submission Requirements

### 1. Required Visual Assets

All assets should be created before starting the submission process.

#### Cover Image
- [ ] **File**: `assets/cover.png`
- [ ] **Dimensions**: 1920 × 960 pixels
- [ ] **Format**: PNG (RGB color)
- [ ] **Max File Size**: 2MB
- [ ] **Content Requirements**:
  - Show diverse selection of icons from multiple categories
  - Include LivelyIcons branding/wordmark
  - Display plugin interface or icon grid
  - Use clean, modern aesthetic matching Figma's design language
  - Ensure legibility at thumbnail size (384×192px)
- [ ] **Design Tips**:
  - Use gradient background from Lively brand (green tones)
  - Show 12-20 representative icons in a grid
  - Add subtle animation trails or motion hints
  - Include text: "1,319 Animated Icons" or similar
  - Maintain high contrast for visibility

#### Plugin Icon
- [ ] **File**: `assets/icon.png`
- [ ] **Dimensions**: 128 × 128 pixels
- [ ] **Format**: PNG with transparency
- [ ] **Max File Size**: 256KB
- [ ] **Content Requirements**:
  - Use Lively brand icon (vine/growth symbol)
  - Ensure recognizability at small sizes (32×32px)
  - Works on both light and dark backgrounds
- [ ] **Source**: Use `/public/logo.svg` as reference
- [ ] **Export Settings**:
  - 72 DPI minimum
  - RGB color space
  - Transparent background

#### Screenshots (4-6 recommended)

Each screenshot should demonstrate a key feature:

**Screenshot 1: Browse All Icons**
- [ ] **File**: `assets/screenshots/01-browse.png`
- [ ] **Dimensions**: 1280 × 800 pixels (or 1600×1000, 1920×1200)
- [ ] **Shows**: Full icon grid with category tabs visible
- [ ] **Highlights**: Breadth of icon library, organized categories

**Screenshot 2: Search Functionality**
- [ ] **File**: `assets/screenshots/02-search.png`
- [ ] **Dimensions**: 1280 × 800 pixels
- [ ] **Shows**: Search bar active with results filtered
- [ ] **Highlights**: Fast, intelligent search with fuzzy matching

**Screenshot 3: Customization Panel**
- [ ] **File**: `assets/screenshots/03-customize.png`
- [ ] **Dimensions**: 1280 × 800 pixels
- [ ] **Shows**: Customize panel expanded with size/stroke/color options
- [ ] **Highlights**: Live preview showing customization changes

**Screenshot 4: Export Formats**
- [ ] **File**: `assets/screenshots/04-export.png`
- [ ] **Dimensions**: 1280 × 800 pixels
- [ ] **Shows**: Export panel with code output visible
- [ ] **Highlights**: SVG/React/Vue export options

**Screenshot 5: Canvas Integration (Optional)**
- [ ] **File**: `assets/screenshots/05-canvas.png`
- [ ] **Dimensions**: 1280 × 800 pixels
- [ ] **Shows**: Icons inserted onto Figma canvas in a real design
- [ ] **Highlights**: Seamless integration with design workflow

**Screenshot 6: Category Filtering (Optional)**
- [ ] **File**: `assets/screenshots/06-categories.png`
- [ ] **Dimensions**: 1280 × 800 pixels
- [ ] **Shows**: Category tabs with specific category selected
- [ ] **Highlights**: Easy navigation and filtering

**Screenshot Guidelines for All**:
- Use realistic design context (not empty canvas)
- Show plugin UI clearly
- Ensure text is legible
- Use consistent Figma theme (suggest light mode for clarity)
- Capture actual plugin running (not mockups)
- Add subtle annotations if needed (arrows, highlights)

---

### 2. Plugin Metadata

#### Name and Description
- [ ] **Name**: LivelyIcons
- [ ] **Tagline** (60 chars max): `1,319 animated icons for your designs`
- [ ] **Short Description** (120 chars max):
  ```
  Browse, customize, and insert 1,319 animated icons. Adjust size, stroke, color. Export as SVG, React, or Vue.
  ```
- [ ] **Full Description** (4000 chars max):
  ```
  LivelyIcons brings 1,319 professionally designed, animation-ready icons directly to your Figma workflow. Browse, search, customize, and insert beautiful icons in seconds.

  FEATURES

  Massive Icon Library
  • 1,319 premium icons covering all design needs
  • 36 organized categories from accessibility to weather
  • Consistent stroke-based design language
  • Built for animation and motion design

  Intelligent Search
  • Fuzzy search finds icons even with typos
  • Keyword matching with synonyms
  • Real-time results as you type
  • Category filtering for focused browsing

  Powerful Customization
  • Size presets: 16px to 64px
  • Stroke width: 0.5 to 4.0
  • Full color picker
  • Live preview of changes

  Flexible Export
  • Insert directly to canvas
  • Copy SVG code
  • Export as React components
  • Export as Vue templates
  • One-click clipboard integration

  HOW TO USE

  1. Open LivelyIcons from the Plugins menu
  2. Browse icons or search by keyword
  3. Click an icon to select it
  4. Customize size, stroke width, and color
  5. Click Insert to add to canvas, or Copy Code to use in development

  CATEGORIES

  Accessibility, Analytics, Animals, Arrows, Brands, Buildings, Business, Charts, Clothing, Communication, Development, Devices, Education, Files, Finance, Food, Furniture, Gaming, Health, Media, Nature, Printing, Productivity, Science, Security, Shapes, Shopping, Social, Sports, Text, Tools, Transportation, Travel, UI, Users, Weather

  TECHNICAL

  • No network access required - works offline
  • Fast performance with lazy loading
  • Clean, optimized SVG output
  • Privacy-focused - no data collection

  Part of the LivelyIcons ecosystem including NPM package and VS Code extension. Visit livelyicons.com to learn more.
  ```

#### Categories and Tags
- [ ] **Primary Category**: Productivity
- [ ] **Secondary Category**: Design Tools
- [ ] **Tags** (up to 10):
  - icons
  - svg
  - animated
  - icon library
  - design system
  - react
  - vue
  - customization
  - vector
  - export

---

### 3. Plugin Build and Testing

#### Pre-Submission Build
- [ ] Run full build: `npm run build`
- [ ] Verify `dist/` folder contains:
  - `main.js` (plugin sandbox code)
  - `index.html` (UI entry point)
  - All bundled assets
- [ ] Check bundle sizes (should be optimized):
  - `main.js`: < 100KB
  - Total dist folder: < 5MB
- [ ] Verify `manifest.json` is valid and complete

#### Testing Checklist
Test all functionality in both Figma Desktop and Web:

**Core Features**
- [ ] Plugin opens correctly
- [ ] All 1,319 icons load and display
- [ ] Icon grid scrolls smoothly
- [ ] Search returns correct results
- [ ] Category filtering works
- [ ] Icon selection highlights correctly

**Customization**
- [ ] Size buttons change icon preview
- [ ] Stroke width slider updates preview
- [ ] Color picker changes icon color
- [ ] Custom color input works
- [ ] Live preview updates in real-time

**Export and Insert**
- [ ] Insert button adds icon to canvas
- [ ] Inserted icon matches preview (size, stroke, color)
- [ ] SVG export generates valid code
- [ ] React export generates valid JSX
- [ ] Vue export generates valid template
- [ ] Copy to clipboard works

**UI/UX**
- [ ] Plugin resizes correctly
- [ ] Panels expand/collapse smoothly
- [ ] Search clears properly
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Works in light and dark mode
- [ ] Tooltips display correctly
- [ ] Loading states work

**Edge Cases**
- [ ] Empty search results show message
- [ ] Very long icon names don't break layout
- [ ] Rapid clicking doesn't cause errors
- [ ] Plugin works with no internet connection
- [ ] Works on files with many layers

**Performance**
- [ ] Plugin loads in < 2 seconds
- [ ] Search responds in < 100ms
- [ ] No memory leaks during extended use
- [ ] Scrolling is smooth with 1000+ items

**Browser/Platform Testing**
- [ ] Figma Desktop (Mac)
- [ ] Figma Desktop (Windows)
- [ ] Figma Web (Chrome)
- [ ] Figma Web (Safari)
- [ ] Figma Web (Firefox)
- [ ] Figma Web (Edge)

---

### 4. Documentation Review

- [ ] README.md is complete and accurate
- [ ] CHANGELOG.md reflects current version
- [ ] All links in documentation work
- [ ] Code examples are correct
- [ ] Screenshots in docs match actual plugin
- [ ] Installation instructions are clear

---

### 5. Legal and Compliance

- [ ] Verify icon license allows commercial use
- [ ] Confirm MIT license is appropriate
- [ ] Ensure no trademarked icons without permission
- [ ] Privacy policy reflects "no data collection"
- [ ] Terms of service are clear (if applicable)
- [ ] Accessibility statement included (if applicable)

---

## Submission Process

### Step 1: Prepare Submission Package

1. [ ] Create submission folder:
   ```bash
   mkdir figma-community-submission
   cd figma-community-submission
   ```

2. [ ] Copy required files:
   ```bash
   cp ../manifest.json .
   cp -r ../dist .
   cp -r ../assets .
   cp ../README.md .
   ```

3. [ ] Verify structure:
   ```
   figma-community-submission/
   ├── manifest.json
   ├── dist/
   │   ├── main.js
   │   ├── index.html
   │   └── [bundled assets]
   ├── assets/
   │   ├── cover.png
   │   ├── icon.png
   │   └── screenshots/
   │       ├── 01-browse.png
   │       ├── 02-search.png
   │       ├── 03-customize.png
   │       └── 04-export.png
   └── README.md
   ```

### Step 2: Upload to Figma Community

1. [ ] Go to [figma.com/community](https://www.figma.com/community)
2. [ ] Log in to publisher account
3. [ ] Click **Create** → **Plugin**

### Step 3: Fill in Plugin Details

**Basic Information**
- [ ] Upload `icon.png` as plugin icon
- [ ] Enter plugin name: **LivelyIcons**
- [ ] Enter tagline: **1,319 animated icons for your designs**
- [ ] Select categories: **Productivity**, **Design Tools**

**Description**
- [ ] Paste full description (from metadata section above)
- [ ] Add tags: icons, svg, animated, icon library, design system, react, vue, customization, vector, export
- [ ] Link to website: https://livelyicons.com (when available)
- [ ] Link to GitHub: https://github.com/livelyicons/figma-plugin (when available)
- [ ] Link to support: https://livelyicons.com/support (when available)

**Media**
- [ ] Upload cover image (`cover.png`)
- [ ] Upload screenshots (in order: browse, search, customize, export)
- [ ] Add captions to screenshots:
  - Screenshot 1: "Browse 1,319 icons across 36 categories"
  - Screenshot 2: "Find exactly what you need with fuzzy search"
  - Screenshot 3: "Customize size, stroke, and color with live preview"
  - Screenshot 4: "Export as SVG, React, or Vue components"

**Plugin Files**
- [ ] Upload `manifest.json`
- [ ] Upload entire `dist/` folder (as ZIP or individual files)
- [ ] Verify file upload success

**Additional Information**
- [ ] Publisher name: LivelyIcons Team
- [ ] Support email: support@livelyicons.com (or appropriate contact)
- [ ] Privacy policy URL: (if available)
- [ ] License: MIT
- [ ] Version: 1.0.0

### Step 4: Preview and Test

- [ ] Use Figma's preview feature to test plugin
- [ ] Verify all features work in preview environment
- [ ] Check that screenshots match actual plugin
- [ ] Review description for typos
- [ ] Ensure all links work

### Step 5: Submit for Review

- [ ] Review submission checklist one final time
- [ ] Click **Submit for Review**
- [ ] Wait for Figma team review (typically 1-5 business days)
- [ ] Monitor email for review feedback

---

## Post-Submission

### If Approved
- [ ] Announce on social media
- [ ] Update website with Figma Community link
- [ ] Add "Available on Figma Community" badge to README
- [ ] Monitor initial user feedback
- [ ] Respond to comments and questions
- [ ] Track analytics (if Figma provides)

### If Rejected
- [ ] Read rejection feedback carefully
- [ ] Address all issues mentioned
- [ ] Update assets/code as needed
- [ ] Re-test thoroughly
- [ ] Re-submit with changes documented

### Ongoing Maintenance
- [ ] Monitor community comments weekly
- [ ] Respond to user questions within 48 hours
- [ ] Track feature requests and bugs
- [ ] Plan updates based on feedback
- [ ] Keep README and screenshots current

---

## Tips for Success

### Approval Best Practices
1. **High-Quality Screenshots**: Show real use cases, not empty states
2. **Clear Value Proposition**: Immediately communicate what makes LivelyIcons useful
3. **Polished UI**: Match Figma's design language and quality standards
4. **Comprehensive Testing**: Zero bugs in common workflows
5. **Detailed Description**: Help users understand features before installing
6. **Professional Assets**: Cover image should be eye-catching and clear

### Common Rejection Reasons (to Avoid)
- Low-quality or misleading screenshots
- Bugs in core functionality
- Poor performance or crashes
- Unclear plugin purpose
- Inadequate testing
- Copyright/trademark violations
- Excessive permissions requested
- Poor UI/UX that doesn't match Figma standards

### Plugin Discovery Optimization
- Use all 10 tag slots
- Include keywords users actually search for
- Write description with SEO in mind
- Update plugin regularly to stay relevant
- Encourage users to leave reviews
- Share in design communities

---

## Resources

### Figma Documentation
- [Plugin Publishing Guide](https://www.figma.com/plugin-docs/publishing-plugins/)
- [Community Guidelines](https://www.figma.com/community/guidelines)
- [Plugin Review Process](https://www.figma.com/plugin-docs/plugin-review-process/)

### Asset Creation Tools
- **Figma** - Create screenshots by designing frames
- **Figma → Export** - Export screenshots as PNG at 2x
- **Image Optimization** - Use TinyPNG or ImageOptim to compress assets

### Testing
- [Figma Plugin API Docs](https://www.figma.com/plugin-docs/)
- [Figma Desktop App](https://www.figma.com/downloads/)

---

## Contact and Support

**Pre-Submission Questions**:
- Internal team review
- Design critique sessions
- User testing with beta group

**Post-Submission Support**:
- support@livelyicons.com
- Figma Community comments
- GitHub Issues

---

**Last Updated**: 2025-01-03
**Document Version**: 1.0
**Next Review**: Before v1.1.0 release
