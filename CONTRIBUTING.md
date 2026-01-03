# Contributing to LivelyIcons

Thank you for your interest in contributing to LivelyIcons! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/icons.git
   cd icons
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

## Development Workflow

### Project Structure

```
├── src/
│   ├── icons/          # Animated icon components
│   ├── static/         # Static icon components (RSC-compatible)
│   └── lib/            # Core library (provider, hooks, types)
├── app/                # Next.js demo site
├── registry/           # shadcn/ui registry files
├── scripts/            # Build and generation scripts
└── public/             # Static assets
```

### Available Scripts

```bash
pnpm dev              # Start Next.js dev server
pnpm build            # Build Next.js site
pnpm build:lib        # Build library with tsup
pnpm type-check       # Run TypeScript type checking
pnpm lint             # Run ESLint
```

### Adding a New Icon

1. Create the icon component in `src/icons/`:
   ```tsx
   // src/icons/my-icon.tsx
   'use client'
   import { createAnimatedIcon, defaultIconProps } from '../lib/create-icon'

   export const MyIcon = createAnimatedIcon({
     name: 'MyIcon',
     paths: (
       <>
         <path d="..." />
       </>
     ),
     ...defaultIconProps,
   })
   ```

2. Export it from `src/icons/index.ts`

3. Create the static version in `src/static/` if needed

4. Run the type generation:
   ```bash
   pnpm generate:types
   ```

### Building the Library

```bash
pnpm build:lib
```

This generates:
- `dist/index.js` - CJS bundle
- `dist/index.mjs` - ESM bundle
- `dist/index.d.ts` - TypeScript declarations

## Pull Request Process

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/my-feature
   ```

2. Make your changes and commit with clear messages:
   ```bash
   git commit -m "feat: add new sparkle icon"
   ```

3. Push to your fork and open a pull request

4. Ensure all checks pass:
   - TypeScript compilation
   - Linting
   - Build succeeds

### Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `chore:` - Maintenance tasks
- `refactor:` - Code refactoring
- `test:` - Test additions or changes

## Icon Guidelines

### Design Principles

- **24x24 viewBox** - All icons use a consistent 24x24 grid
- **Stroke-based** - Use strokes rather than fills for consistency
- **2px stroke** - Default stroke width for visual balance
- **Simple paths** - Optimize SVG paths for smaller bundle size

### Animation Considerations

When creating icons, consider how they'll animate:
- Ensure paths are structured for draw animations
- Test with all motion types (scale, rotate, pulse, etc.)
- Verify accessibility with reduced motion enabled

## Reporting Issues

When reporting bugs, please include:

1. A clear description of the issue
2. Steps to reproduce
3. Expected vs actual behavior
4. Your environment (browser, React version, etc.)

## Icon Requests

Want a new icon added to LivelyIcons? We use community voting to prioritize new icons!

### How It Works

1. **Search first** - Check [existing icon requests](../../issues?q=is%3Aissue+label%3Aicon-request) to avoid duplicates
2. **Submit a request** - Use the [Icon Request template](../../issues/new?template=icon-request.yml)
3. **Vote on requests** - Add a 👍 reaction to requests you'd like to see implemented
4. **Top-voted icons get built** - We regularly review and implement the most requested icons

### What Makes a Good Request

- **Clear use case** - Explain how you'd use the icon
- **Specific name** - Suggest a descriptive, kebab-case name
- **Category** - Help us organize by selecting an appropriate category
- **References** - Link to similar icons or visual inspiration

### Request Lifecycle

| Label | Meaning |
|-------|---------|
| `icon-request` | New request, open for voting |
| `approved` | Will be implemented |
| `in-progress` | Currently being designed/built |
| `completed` | Icon has been added |

## Feature Requests

We welcome feature requests! Please open an issue with:

1. A clear description of the feature
2. Use cases and benefits
3. Any implementation ideas (optional)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for any questions about contributing.
