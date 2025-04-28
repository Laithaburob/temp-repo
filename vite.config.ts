import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// ← import the new tagger plugin:
import { componentTagger } from 'lovable-tagger'

export default defineConfig({
  plugins: [
    react(),
    // ← add it here to enable Lovable’s Select feature:
    componentTagger(),
  ],
  server: {
    port: 8080,
    host: '::'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: true,
  }
})
