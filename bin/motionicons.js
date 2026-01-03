#!/usr/bin/env node

/**
 * MotionIcons CLI
 *
 * A command-line tool for exploring and using MotionIcons
 *
 * Commands:
 *   search <query>  - Fuzzy search icons by name
 *   list            - List all available icons
 *   copy <name>     - Copy import code to clipboard
 *   info <name>     - Show icon details
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

/**
 * Icon metadata - maps kebab-case names to component info
 */
const iconRegistry = generateIconRegistry();

/**
 * Generate icon registry from file system
 */
function generateIconRegistry() {
  const iconsDir = path.join(__dirname, '..', 'src', 'icons');
  const registry = {};

  try {
    const files = fs.readdirSync(iconsDir);

    for (const file of files) {
      if (file.endsWith('.tsx') && file !== 'index.ts') {
        const kebabName = file.replace('.tsx', '');
        const componentName = kebabToPascal(kebabName);

        registry[kebabName] = {
          name: componentName,
          file: `icons/${file}`,
          kebabName: kebabName,
        };
      }
    }
  } catch (err) {
    // If running from dist, try to parse the built index
    const distIndex = path.join(__dirname, '..', 'dist', 'index.d.ts');
    if (fs.existsSync(distIndex)) {
      const content = fs.readFileSync(distIndex, 'utf-8');
      const exportMatches = content.matchAll(/export \{ (\w+) \}/g);

      for (const match of exportMatches) {
        const componentName = match[1];
        if (isIconComponent(componentName)) {
          const kebabName = pascalToKebab(componentName);
          registry[kebabName] = {
            name: componentName,
            file: `icons/${kebabName}.tsx`,
            kebabName: kebabName,
          };
        }
      }
    }
  }

  return registry;
}

/**
 * Check if a component name is an icon (not a utility/hook)
 */
function isIconComponent(name) {
  const nonIcons = [
    'IconProvider', 'useIconContext', 'useIconAnimation', 'useIconConfig',
    'animations', 'draw', 'rotate', 'pulse', 'bounce', 'translate',
    'stagger', 'shake', 'spin', 'fade', 'pop', 'cn', 'mergeConfig',
    'isDefined', 'withDefault'
  ];
  return !nonIcons.includes(name) && /^[A-Z]/.test(name);
}

/**
 * Convert kebab-case to PascalCase
 */
function kebabToPascal(str) {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Convert PascalCase to kebab-case
 */
function pascalToKebab(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

/**
 * Simple fuzzy search implementation
 */
function fuzzySearch(query, items) {
  const queryLower = query.toLowerCase();
  const results = [];

  for (const item of items) {
    const itemLower = item.toLowerCase();

    // Exact match
    if (itemLower === queryLower) {
      results.push({ item, score: 100 });
      continue;
    }

    // Starts with query
    if (itemLower.startsWith(queryLower)) {
      results.push({ item, score: 90 - (itemLower.length - queryLower.length) });
      continue;
    }

    // Contains query
    if (itemLower.includes(queryLower)) {
      results.push({ item, score: 70 - itemLower.indexOf(queryLower) });
      continue;
    }

    // Fuzzy character match
    let score = 0;
    let queryIndex = 0;
    let lastMatchIndex = -1;

    for (let i = 0; i < itemLower.length && queryIndex < queryLower.length; i++) {
      if (itemLower[i] === queryLower[queryIndex]) {
        score += 10;
        // Bonus for consecutive matches
        if (lastMatchIndex === i - 1) {
          score += 5;
        }
        // Bonus for matching at word boundaries
        if (i === 0 || item[i - 1] === '-') {
          score += 3;
        }
        lastMatchIndex = i;
        queryIndex++;
      }
    }

    // Only include if all query characters were found
    if (queryIndex === queryLower.length && score > 0) {
      results.push({ item, score: score - (itemLower.length / 10) });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .map(r => r.item);
}

/**
 * Copy text to clipboard (cross-platform) using spawnSync for safety
 */
function copyToClipboard(text) {
  const platform = process.platform;

  try {
    if (platform === 'darwin') {
      // macOS: use pbcopy
      const result = spawnSync('pbcopy', [], { input: text, encoding: 'utf-8' });
      return result.status === 0;
    } else if (platform === 'win32') {
      // Windows: use clip.exe
      const result = spawnSync('clip', [], { input: text, encoding: 'utf-8' });
      return result.status === 0;
    } else {
      // Linux: try xclip first, then xsel
      let result = spawnSync('xclip', ['-selection', 'clipboard'], { input: text, encoding: 'utf-8' });
      if (result.status === 0) return true;

      result = spawnSync('xsel', ['--clipboard', '--input'], { input: text, encoding: 'utf-8' });
      return result.status === 0;
    }
  } catch (err) {
    return false;
  }
}

/**
 * Format icon for display
 */
function formatIcon(kebabName, icon, showDetails = false) {
  let output = `  ${colors.cyan}${icon.name}${colors.reset}`;
  output += ` ${colors.dim}(${kebabName})${colors.reset}`;

  if (showDetails) {
    output += `\n    ${colors.dim}Import: ${colors.reset}import { ${icon.name} } from 'motionicon'`;
  }

  return output;
}

/**
 * Command: search
 */
function cmdSearch(query) {
  if (!query) {
    console.log(`${colors.red}Error: Please provide a search query${colors.reset}`);
    console.log(`Usage: motionicons search <query>`);
    process.exit(1);
  }

  const iconNames = Object.keys(iconRegistry);
  const matches = fuzzySearch(query, iconNames);

  if (matches.length === 0) {
    console.log(`${colors.yellow}No icons found matching "${query}"${colors.reset}`);
    return;
  }

  console.log(`\n${colors.bold}Found ${matches.length} icon(s) matching "${query}":${colors.reset}\n`);

  const displayLimit = 20;
  const toShow = matches.slice(0, displayLimit);

  for (const name of toShow) {
    console.log(formatIcon(name, iconRegistry[name], true));
    console.log();
  }

  if (matches.length > displayLimit) {
    console.log(`${colors.dim}  ... and ${matches.length - displayLimit} more${colors.reset}\n`);
  }
}

/**
 * Command: list
 */
function cmdList(options = {}) {
  const iconNames = Object.keys(iconRegistry).sort();
  const total = iconNames.length;

  console.log(`\n${colors.bold}MotionIcons Library - ${total} icons${colors.reset}\n`);

  if (options.compact) {
    // Compact view - 4 columns
    const columns = 4;
    const colWidth = 25;

    for (let i = 0; i < iconNames.length; i += columns) {
      let row = '';
      for (let j = 0; j < columns && i + j < iconNames.length; j++) {
        const name = iconRegistry[iconNames[i + j]].name;
        row += name.padEnd(colWidth);
      }
      console.log(`  ${row}`);
    }
  } else {
    // Categorized view
    const categories = categorizeIcons(iconNames);

    for (const [category, icons] of Object.entries(categories)) {
      console.log(`${colors.bold}${colors.blue}${category}${colors.reset} ${colors.dim}(${icons.length})${colors.reset}`);

      for (const name of icons) {
        console.log(`  ${colors.cyan}${iconRegistry[name].name}${colors.reset}`);
      }
      console.log();
    }
  }

  console.log(`${colors.dim}Total: ${total} icons${colors.reset}\n`);
  console.log(`${colors.dim}Tip: Use 'motionicons search <query>' to find specific icons${colors.reset}\n`);
}

/**
 * Categorize icons by common prefixes/patterns
 */
function categorizeIcons(iconNames) {
  const categories = {
    'Arrows & Navigation': [],
    'Media & Entertainment': [],
    'Communication': [],
    'Files & Documents': [],
    'UI & Layout': [],
    'Tools & Development': [],
    'Weather & Nature': [],
    'Health & Medical': [],
    'Shopping & Commerce': [],
    'Security': [],
    'Transportation': [],
    'Food & Drink': [],
    'Education': [],
    'Buildings & Places': [],
    'Sports & Games': [],
    'Devices': [],
    'Charts & Data': [],
    'Users & People': [],
    'Other': [],
  };

  const patterns = {
    'Arrows & Navigation': /^(arrow|chevron|corner|move|navigation|compass|map)/i,
    'Media & Entertainment': /^(play|pause|volume|mic|video|camera|music|film|radio|speaker|tv|headphone|airplay|cast|skip|rewind|fast|repeat|shuffle)/i,
    'Communication': /^(mail|message|phone|send|at-sign|hash|rss|wifi|voicemail)/i,
    'Files & Documents': /^(file|folder|archive|clipboard|paperclip|document)/i,
    'UI & Layout': /^(layout|grid|list|panel|sidebar|maximize|minimize|columns|rows|square|circle|triangle|menu|more)/i,
    'Tools & Development': /^(code|terminal|command|database|server|hard-drive|cpu|wrench|hammer|screwdriver|brush|pen|pencil|palette|settings)/i,
    'Weather & Nature': /^(cloud|sun|moon|sunrise|sunset|wind|thermometer|droplet|umbrella|snowflake|flame|leaf|tree|mountain|wave)/i,
    'Health & Medical': /^(heart|stethoscope|pill|syringe|bandage|microscope|test-tube|dna|bone|brain|ear|eye|hand|footprint|wheelchair)/i,
    'Shopping & Commerce': /^(shopping|credit-card|dollar|percent|receipt|wallet|gift|package|truck|store|barcode|qr|tag)/i,
    'Security': /^(lock|unlock|shield|key|fingerprint|scan|alert|ban|badge)/i,
    'Transportation': /^(car|bus|train|plane|ship|sailboat|bike|rocket|fuel|parking|traffic)/i,
    'Food & Drink': /^(coffee|cup|wine|beer|martini|pizza|apple|cherry|grape|banana|carrot|sandwich|utensil|chef|cookie|ice-cream)/i,
    'Education': /^(graduation|book|library|notebook|ruler|pen-tool|highlighter|eraser|calculator|backpack|lightbulb|lamp|glasses)/i,
    'Buildings & Places': /^(building|factory|landmark|castle|church|hospital|school|warehouse|tent|anchor|globe)/i,
    'Sports & Games': /^(trophy|medal|target|crosshair|dice|puzzle|joystick|sword|wand|dumbbell)/i,
    'Devices': /^(laptop|monitor|tablet|watch|printer|mouse|keyboard|smartphone|gamepad|webcam|router|usb|sd-card|battery|bluetooth)/i,
    'Charts & Data': /^(activity|area-chart|bar-chart|gauge|kanban|line-chart|pie-chart|presentation|signal|table|trending)/i,
    'Users & People': /^(user|users|contact|baby|accessibility)/i,
  };

  for (const name of iconNames) {
    let categorized = false;

    for (const [category, pattern] of Object.entries(patterns)) {
      if (pattern.test(name)) {
        categories[category].push(name);
        categorized = true;
        break;
      }
    }

    if (!categorized) {
      categories['Other'].push(name);
    }
  }

  // Remove empty categories
  for (const [key, value] of Object.entries(categories)) {
    if (value.length === 0) {
      delete categories[key];
    }
  }

  return categories;
}

/**
 * Command: copy
 */
function cmdCopy(iconName) {
  if (!iconName) {
    console.log(`${colors.red}Error: Please provide an icon name${colors.reset}`);
    console.log(`Usage: motionicons copy <icon-name>`);
    process.exit(1);
  }

  // Try to find the icon (support both kebab-case and PascalCase)
  let icon = iconRegistry[iconName];

  if (!icon) {
    // Try converting from PascalCase
    const kebabName = pascalToKebab(iconName);
    icon = iconRegistry[kebabName];
  }

  if (!icon) {
    // Try fuzzy search
    const matches = fuzzySearch(iconName, Object.keys(iconRegistry));
    if (matches.length > 0) {
      console.log(`${colors.yellow}Icon "${iconName}" not found.${colors.reset}`);
      console.log(`${colors.dim}Did you mean one of these?${colors.reset}\n`);
      for (const match of matches.slice(0, 5)) {
        console.log(`  ${colors.cyan}${iconRegistry[match].name}${colors.reset}`);
      }
      process.exit(1);
    }

    console.log(`${colors.red}Icon "${iconName}" not found${colors.reset}`);
    process.exit(1);
  }

  const importCode = `import { ${icon.name} } from 'motionicon'`;

  if (copyToClipboard(importCode)) {
    console.log(`\n${colors.green}Copied to clipboard:${colors.reset}`);
    console.log(`  ${colors.cyan}${importCode}${colors.reset}\n`);
  } else {
    console.log(`\n${colors.yellow}Could not copy to clipboard. Here's the import:${colors.reset}`);
    console.log(`  ${colors.cyan}${importCode}${colors.reset}\n`);
  }
}

/**
 * Command: info
 */
function cmdInfo(iconName) {
  if (!iconName) {
    console.log(`${colors.red}Error: Please provide an icon name${colors.reset}`);
    console.log(`Usage: motionicons info <icon-name>`);
    process.exit(1);
  }

  // Try to find the icon
  let kebabName = iconName;
  let icon = iconRegistry[iconName];

  if (!icon) {
    // Try converting from PascalCase
    kebabName = pascalToKebab(iconName);
    icon = iconRegistry[kebabName];
  }

  if (!icon) {
    const matches = fuzzySearch(iconName, Object.keys(iconRegistry));
    if (matches.length > 0) {
      console.log(`${colors.yellow}Icon "${iconName}" not found.${colors.reset}`);
      console.log(`${colors.dim}Did you mean one of these?${colors.reset}\n`);
      for (const match of matches.slice(0, 5)) {
        console.log(`  ${colors.cyan}${iconRegistry[match].name}${colors.reset}`);
      }
      process.exit(1);
    }

    console.log(`${colors.red}Icon "${iconName}" not found${colors.reset}`);
    process.exit(1);
  }

  console.log(`\n${colors.bold}${colors.cyan}${icon.name}${colors.reset}`);
  console.log(`${'─'.repeat(40)}`);
  console.log(`${colors.dim}Name:${colors.reset}      ${icon.name}`);
  console.log(`${colors.dim}Kebab:${colors.reset}     ${kebabName}`);
  console.log(`${colors.dim}File:${colors.reset}      src/${icon.file}`);
  console.log();
  console.log(`${colors.bold}Import:${colors.reset}`);
  console.log(`  ${colors.cyan}import { ${icon.name} } from 'motionicon'${colors.reset}`);
  console.log();
  console.log(`${colors.bold}Usage:${colors.reset}`);
  console.log(`  ${colors.dim}// Basic usage${colors.reset}`);
  console.log(`  ${colors.cyan}<${icon.name} />${colors.reset}`);
  console.log();
  console.log(`  ${colors.dim}// With props${colors.reset}`);
  console.log(`  ${colors.cyan}<${icon.name} size={24} motionType="scale" trigger="hover" />${colors.reset}`);
  console.log();
  console.log(`  ${colors.dim}// Accessible with label${colors.reset}`);
  console.log(`  ${colors.cyan}<${icon.name} aria-label="${icon.name.replace(/([A-Z])/g, ' $1').trim()}" />${colors.reset}`);
  console.log();
  console.log(`${colors.bold}Available Props:${colors.reset}`);
  console.log(`  ${colors.dim}size?:${colors.reset}        number (default: 24)`);
  console.log(`  ${colors.dim}strokeWidth?:${colors.reset} number (default: 2)`);
  console.log(`  ${colors.dim}className?:${colors.reset}   string`);
  console.log(`  ${colors.dim}animated?:${colors.reset}    boolean`);
  console.log(`  ${colors.dim}motionType?:${colors.reset}  'scale' | 'rotate' | 'translate' | 'shake' | 'pulse' | 'bounce' | 'draw' | 'spin' | 'none'`);
  console.log(`  ${colors.dim}trigger?:${colors.reset}     'hover' | 'loop' | 'mount' | 'inView'`);
  console.log(`  ${colors.dim}aria-label?:${colors.reset}  string`);
  console.log();
}

/**
 * Show help
 */
function showHelp() {
  console.log(`
${colors.bold}${colors.cyan}MotionIcons CLI${colors.reset}
${colors.dim}A command-line tool for exploring and using MotionIcons${colors.reset}

${colors.bold}USAGE${colors.reset}
  motionicons <command> [options]

${colors.bold}COMMANDS${colors.reset}
  ${colors.cyan}search${colors.reset} <query>    Fuzzy search icons by name
  ${colors.cyan}list${colors.reset}              List all available icons
  ${colors.cyan}list${colors.reset} --compact    List icons in compact format
  ${colors.cyan}copy${colors.reset} <name>       Copy import code to clipboard
  ${colors.cyan}info${colors.reset} <name>       Show detailed icon information

${colors.bold}EXAMPLES${colors.reset}
  ${colors.dim}# Search for arrow icons${colors.reset}
  motionicons search arrow

  ${colors.dim}# Copy Heart icon import to clipboard${colors.reset}
  motionicons copy heart

  ${colors.dim}# Get info about Settings icon${colors.reset}
  motionicons info settings

  ${colors.dim}# List all icons compactly${colors.reset}
  motionicons list --compact

${colors.bold}TIPS${colors.reset}
  - Icon names can be in kebab-case (arrow-right) or PascalCase (ArrowRight)
  - Search is fuzzy, so partial matches work (e.g., "arr" finds "arrow")
  - Use with npx: npx motionicons search heart
`);
}

/**
 * Show version
 */
function showVersion() {
  try {
    const pkg = require(path.join(__dirname, '..', 'package.json'));
    console.log(`motionicons v${pkg.version}`);
  } catch {
    console.log('motionicons v1.0.0');
  }
}

// Main entry point
const args = process.argv.slice(2);
const command = args[0];

if (!command || command === '--help' || command === '-h') {
  showHelp();
  process.exit(0);
}

if (command === '--version' || command === '-v') {
  showVersion();
  process.exit(0);
}

switch (command) {
  case 'search':
    cmdSearch(args.slice(1).join(' '));
    break;
  case 'list':
    cmdList({ compact: args.includes('--compact') || args.includes('-c') });
    break;
  case 'copy':
    cmdCopy(args[1]);
    break;
  case 'info':
    cmdInfo(args[1]);
    break;
  default:
    console.log(`${colors.red}Unknown command: ${command}${colors.reset}`);
    showHelp();
    process.exit(1);
}
