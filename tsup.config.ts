import { defineConfig } from 'tsup'

export default defineConfig({
  // All entries bundled together to avoid race conditions with clean
  entry: {
    'index': 'src/index.ts',
    'static': 'src/static/index.ts',
    'css': 'src/lib/css-animations.ts'
  },
  format: ['cjs', 'esm'],
  dts: {
    compilerOptions: {
      incremental: false
    }
  },
  splitting: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'motion'],
  treeshake: true,
  minify: false,
  outDir: 'dist',
  // Note: "use client" is added via the source files themselves for animated components
  // Static and CSS modules intentionally do not have "use client"
})
