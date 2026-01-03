// Package script for bundling the Figma plugin
// This copies the manifest and dist files into a single directory for distribution

import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const packageDir = join(root, 'package');

console.log('📦 Packaging Figma plugin...');

// Ensure package directory exists
if (!existsSync(packageDir)) {
  mkdirSync(packageDir, { recursive: true });
}

// Check if dist exists
if (!existsSync(distDir)) {
  console.error('❌ dist/ directory not found. Run `npm run build` first.');
  process.exit(1);
}

try {
  // Copy manifest
  copyFileSync(
    join(root, 'manifest.json'),
    join(packageDir, 'manifest.json')
  );
  console.log('✓ Copied manifest.json');

  // Copy built files
  copyFileSync(
    join(distDir, 'main.js'),
    join(packageDir, 'main.js')
  );
  console.log('✓ Copied main.js');

  copyFileSync(
    join(distDir, 'index.html'),
    join(packageDir, 'index.html')
  );
  console.log('✓ Copied index.html');

  console.log('✅ Plugin packaged successfully in package/');
  console.log('   You can now import this directory in Figma Desktop');
} catch (error) {
  console.error('❌ Packaging failed:', error.message);
  process.exit(1);
}
