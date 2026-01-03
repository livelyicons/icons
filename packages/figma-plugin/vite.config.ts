import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { resolve } from 'path';

// https://vitejs.dev/config/
// UI-only build config - main.ts is built separately via esbuild
export default defineConfig({
  plugins: [
    preact(),
    tailwindcss(),
    viteSingleFile()
  ],
  root: './src/ui',
  build: {
    outDir: '../../dist',
    emptyOutDir: false, // Don't clear - main.js is built separately
    cssCodeSplit: false,
    target: 'es2017'
  },
  resolve: {
    alias: {
      'react': 'preact/compat',
      'react-dom': 'preact/compat',
      '@': resolve(__dirname, './src')
    }
  }
});
