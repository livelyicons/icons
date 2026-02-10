# LivelyIcons Picker for VS Code

Browse, preview, and insert animated icons from the [LivelyIcons](https://livelyicons.com) library directly in VS Code.

![LivelyIcons Picker](https://github.com/livelyicons/icons/blob/main/social/43.jpeg?raw=true)

## Features

### 1,300+ Animated Icons
Access the full LivelyIcons library organized into 20 categories including arrows, media, communication, commerce, and more.

### Live Animation Preview
See icons animate in real-time before inserting. Preview all 9 motion types:
- **Spin** - Continuous rotation
- **Pulse** - Scale breathing effect
- **Bounce** - Playful vertical bounce
- **Shake** - Horizontal shake
- **Wiggle** - Rotational wiggle
- **Rubber** - Elastic rubber band
- **Flicker** - Opacity flicker
- **Float** - Gentle floating
- **Jiggle** - Quick jiggle

### Smart Code Generation
Insert icons at your cursor with automatic import management. The extension:
- Adds imports to the top of your file
- Merges with existing LivelyIcons imports
- Only includes non-default props to keep code clean

### Customization Panel
Fine-tune icons before inserting:
- **Size** - Adjust icon dimensions
- **Stroke Width** - Control line thickness
- **Color** - Pick any color or use currentColor
- **Motion Type** - Select animation style
- **Trigger** - Choose hover, click, loop, or custom

### Search & Filter
Quickly find icons by name, category, or tags. Filter by motion type to find the perfect animated icon.

### Favorites
Star frequently used icons for quick access.

## Usage

1. Click the LivelyIcons icon in the activity bar (sidebar)
2. Search or browse for an icon
3. Hover to preview the animation
4. Customize size, color, and animation settings
5. Click to insert at your cursor position

## Requirements

This extension is designed for projects using the [LivelyIcons](https://www.npmjs.com/package/livelyicons) React library:

```bash
npm install livelyicons
```

## Generated Code Example

```tsx
import { Heart, Star } from 'livelyicons/icons'

// Default props (clean output)
<Heart />

// Customized
<Star size={32} color="#fbbf24" motionType="pulse" trigger="loop" />
```

## Links

- [LivelyIcons Documentation](https://livelyicons.com/docs)
- [NPM Package](https://www.npmjs.com/package/livelyicons)
- [GitHub Repository](https://github.com/livelyicons/livelyicons)

## License

MIT
