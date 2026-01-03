# Changelog

All notable changes to the LivelyIcons Figma Plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### Added

#### Core Features
- Browse complete library of 1,319 animated icons
- Organized into 36 curated categories (Accessibility, Analytics, Animals, Arrows, Brands, Buildings, Business, Charts, Clothing, Communication, Development, Devices, Education, Files, Finance, Food, Furniture, Gaming, Health, Media, Nature, Printing, Productivity, Science, Security, Shapes, Shopping, Social, Sports, Text, Tools, Transportation, Travel, UI, Users, Weather)
- Real-time fuzzy search with keyword matching powered by Fuse.js
- Category filtering for focused browsing

#### Customization
- Size presets: 16px, 24px, 32px, 48px, 64px
- Adjustable stroke width: 0.5 to 4.0 with 0.1 increments
- Color picker with preset palette and custom color selection
- Live preview panel showing customizations in real-time

#### Export and Integration
- Direct insert to Figma canvas as editable vectors
- SVG code export with custom attributes
- React/JSX component export
- Vue template export
- One-click copy to clipboard functionality

#### User Experience
- Clean, modern interface matching Figma's design language
- Responsive grid layout with icon previews
- Collapsible panels for efficient space usage
- Theme-aware UI supporting light and dark modes
- Keyboard shortcuts for common actions

#### Technical
- Offline-first architecture with no network requirements
- Optimized performance with lazy loading
- Built with Preact for minimal bundle size
- TypeScript for type safety
- Tailwind CSS for consistent styling

### Design Decisions

**Why 1,319 icons?**
- Comprehensive coverage of common design needs
- Balanced between variety and maintainability
- Curated for quality over quantity

**Why 36 categories?**
- Granular enough for specific searches
- Broad enough to avoid overwhelming users
- Industry-standard categorization aligned with common design systems

**Why stroke-based icons?**
- Consistent visual language across entire set
- Easy to customize weight and color
- Better performance for animation
- Matches modern design trends

**Why these customization options?**
- Size presets match common design system scales
- Stroke width range accommodates diverse use cases
- Color customization enables brand alignment

### Known Limitations

- Icons are inserted as vector shapes, not components (Figma API limitation)
- No bulk insert capability in v1.0 (planned for future release)
- Search limited to English keywords (internationalization planned)

### Browser Support

- Figma Desktop App (Mac, Windows, Linux)
- Figma Web (Chrome, Firefox, Safari, Edge)

### Performance

- Plugin load time: < 1 second
- Search response time: < 100ms
- Icon insert time: < 50ms
- Memory footprint: ~15MB

---

## Future Roadmap

The following features are under consideration for future releases:

### v1.1.0 (Planned)
- Icon favorites/bookmarking system
- Recent icons history
- Bulk selection and insert
- Custom color palette saving

### v1.2.0 (Planned)
- Icon animation previews
- Export to Lottie/animated formats
- Advanced search filters (by stroke complexity, element count)
- Icon comparison mode

### v2.0.0 (Future)
- Component instance support
- Team library integration
- Custom icon uploads and management
- Collaborative icon collections

---

## Versioning Policy

- **Major versions** (x.0.0): Breaking changes, major feature additions
- **Minor versions** (1.x.0): New features, backward compatible
- **Patch versions** (1.0.x): Bug fixes, performance improvements

## Support

For issues, feature requests, or questions:
- **GitHub Issues**: [livelyicons/figma-plugin/issues](https://github.com/livelyicons/figma-plugin/issues)
- **Documentation**: [livelyicons.com/docs](https://livelyicons.com/docs)
- **Community**: [livelyicons.com/community](https://livelyicons.com/community)

---

**Note**: Release dates will be updated when versions are published to Figma Community.
