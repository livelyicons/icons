# LivelyIcons for Figma

**1,319 animated icons at your fingertips. Browse, customize, and insert beautiful icons directly into your Figma designs.**

LivelyIcons is a comprehensive icon library plugin that brings professionally designed, animation-ready icons to your Figma workflow. With instant search, flexible customization, and seamless canvas integration, LivelyIcons makes it effortless to enhance your designs with high-quality iconography.

## Features

### Massive Icon Library
- **1,319 Premium Icons** - Extensive collection covering all your design needs
- **36 Organized Categories** - From accessibility to weather, analytics to UI elements
- **Consistent Design Language** - All icons follow a unified stroke-based aesthetic
- **Animation-Ready** - Built with motion design in mind

### Intelligent Search
- **Fuzzy Search** - Find icons even with typos or partial matches
- **Keyword Matching** - Search by alternative names and synonyms
- **Category Filtering** - Narrow results by browsing specific categories
- **Real-Time Results** - Instant feedback as you type

### Powerful Customization
- **Size Control** - Choose from 16px, 24px, 32px, 48px, or 64px presets
- **Stroke Width** - Adjust line weight from 0.5 to 4.0 for perfect visual balance
- **Color Picker** - Apply any color to match your design system
- **Live Preview** - See changes in real-time before inserting

### Flexible Export
- **Direct Insert** - Add icons to your Figma canvas with one click
- **SVG Export** - Copy clean, optimized SVG code
- **React Components** - Get ready-to-use React/JSX code
- **Vue Components** - Generate Vue-compatible templates
- **Clipboard Integration** - Instantly copy code to use in your development workflow

## How to Use

### Getting Started
1. Open the LivelyIcons plugin from the Figma menu: `Plugins → LivelyIcons`
2. The plugin panel opens with the full icon library displayed

### Browsing Icons
- **Scroll** through the icon grid to explore all 1,319 icons
- **Click category tabs** at the top to filter by category (All, Accessibility, Analytics, etc.)
- **Hover** over any icon to see its name

### Searching for Icons
1. Click the search bar at the top of the panel
2. Type keywords (e.g., "arrow", "user", "chart")
3. Results update instantly with fuzzy matching
4. Clear search to return to browsing mode

### Customizing Icons
1. **Select an icon** from the grid (it will highlight)
2. Expand the **CUSTOMIZE** panel to adjust:
   - **Size**: Click size buttons (16-64px)
   - **Stroke Width**: Drag slider (0.5-4.0)
   - **Color**: Click color chips or use custom picker
3. Watch the **live preview** update in real-time

### Inserting into Figma
1. Customize your icon with desired size, stroke, and color
2. Click the **Insert** button at the bottom
3. Icon appears on your Figma canvas as an editable vector
4. Position and use like any Figma shape

### Exporting Code
1. Select and customize your icon
2. Expand the **EXPORT AS** panel
3. Choose your format:
   - **SVG** - Raw SVG markup
   - **React** - JSX component code
   - **Vue** - Vue template code
4. Click **Copy Code** to copy to clipboard
5. Paste into your code editor

## Icon Categories

LivelyIcons organizes 1,319 icons across 36 thoughtfully curated categories:

- **Accessibility** - Inclusive design icons
- **Analytics** - Charts, graphs, and metrics
- **Animals** - Wildlife and pets
- **Arrows** - Directional indicators
- **Brands** - Popular service logos
- **Buildings** - Architecture and structures
- **Business** - Corporate and professional
- **Charts** - Data visualization
- **Clothing** - Fashion and apparel
- **Communication** - Messaging and contact
- **Development** - Code and programming
- **Devices** - Computers and gadgets
- **Education** - Learning and academics
- **Files** - Documents and storage
- **Finance** - Money and banking
- **Food** - Dining and cuisine
- **Furniture** - Home and office
- **Gaming** - Play and entertainment
- **Health** - Medical and wellness
- **Media** - Audio and video
- **Nature** - Plants and environment
- **Printing** - Output and publishing
- **Productivity** - Tasks and efficiency
- **Science** - Research and lab
- **Security** - Protection and privacy
- **Shapes** - Geometric elements
- **Shopping** - E-commerce and retail
- **Social** - Networks and sharing
- **Sports** - Athletics and fitness
- **Text** - Typography and formatting
- **Tools** - Utilities and instruments
- **Transportation** - Vehicles and transit
- **Travel** - Tourism and destinations
- **UI** - User interface elements
- **Users** - People and profiles
- **Weather** - Climate and conditions

## Integration with LivelyIcons Ecosystem

This Figma plugin is part of the broader LivelyIcons ecosystem:

- **NPM Package** - Use icons in React, Vue, or vanilla JavaScript projects
- **VS Code Extension** - Browse and insert icon code directly in your editor
- **Documentation Site** - Comprehensive icon reference and usage guides

Visit [livelyicons.com](https://livelyicons.com) to explore the full ecosystem.

## Technical Details

### Icon Specifications
- **Format**: SVG vector graphics
- **Style**: Stroke-based (outlined)
- **ViewBox**: 24x24 default coordinate system
- **Optimization**: Clean paths, no unnecessary attributes
- **Accessibility**: Semantic naming for screen readers

### Performance
- **Lazy Loading**: Icons load efficiently as you scroll
- **Fuzzy Search**: Powered by Fuse.js for intelligent matching
- **Lightweight**: Minimal bundle size, fast load times
- **No Network Calls**: All icons embedded, works offline

### Export Format Details

**SVG Export**
```xml
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="..."/>
</svg>
```

**React Export**
```jsx
export const IconName = () => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="..." />
  </svg>
);
```

**Vue Export**
```vue
<template>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="..." />
  </svg>
</template>
```

## Tips and Best Practices

### For Designers
- **Create variants** by duplicating icons and adjusting stroke/color
- **Build icon systems** by standardizing size and stroke across your design
- **Use components** to make icon instances reusable
- **Maintain consistency** by exporting icon specs (size, stroke, color) to design tokens

### For Developers
- **Match design specs** by using the same customization settings in code
- **Copy component code** instead of exporting SVG for better maintainability
- **Use the NPM package** for production projects (see livelyicons.com)
- **Preserve accessibility** by adding proper labels when implementing

### Icon Selection Tips
- **Start specific, go general** - Try specific keywords first (e.g., "calendar" before "time")
- **Explore categories** - Browse related categories to find alternatives
- **Check multiple keywords** - Icons are tagged with synonyms
- **Preview in context** - Customize and preview before inserting

## Keyboard Shortcuts

- **Search**: Start typing to focus search bar
- **Clear Search**: `Esc` when search is focused
- **Close Plugin**: `Esc` when nothing is focused

## Privacy and Data

LivelyIcons respects your privacy:

- **No Network Access**: All icons are embedded in the plugin
- **No Data Collection**: We don't track usage or collect personal information
- **No External Services**: Works completely offline
- **No Account Required**: Free to use, no sign-up needed

## Support and Feedback

### Getting Help
- **Documentation**: Visit livelyicons.com for comprehensive guides
- **Issues**: Report bugs or request features on GitHub
- **Community**: Join discussions about icon design and usage

### Contributing
LivelyIcons is part of an open-source ecosystem. Contributions welcome:
- **Icon Requests**: Suggest new icons or categories
- **Bug Reports**: Help us improve the plugin
- **Feature Ideas**: Share your enhancement suggestions

## Credits

**Design & Development**
- Icon set curated and standardized for consistency
- Plugin built with Preact, TypeScript, and Tailwind CSS
- Fuzzy search powered by Fuse.js

**License**
- Icons: MIT License - Free for commercial and personal use
- Plugin: MIT License - Open source

## Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed release notes.

## Links

- **Website**: [livelyicons.com](https://livelyicons.com)
- **NPM Package**: `@livelyicons/icons` (coming soon)
- **GitHub**: [github.com/livelyicons](https://github.com/livelyicons)
- **VS Code Extension**: Search "LivelyIcons" in VS Code marketplace

---

**Made with care for designers and developers.**

Bring your designs to life with LivelyIcons.
