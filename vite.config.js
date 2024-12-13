import react from '@vitejs/plugin-react'
import laravel from 'laravel-vite-plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~': '/resources',
    },
  },
  plugins: [
    laravel({
      input: 'resources/scripts/app.tsx',
      ssr: 'resources/scripts/ssr.tsx',
      refresh: true,
    }),
    react(),
  ],
})
