import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    rollupOptions: {
      // El split manual de vendors solo aplica al build de CLIENTE. En el build
      // SSR (prerender), react/react-dom son externos y no pueden ir en chunks.
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              'vendor-react': ['react', 'react-dom'],
              'vendor-router': ['react-router'],
              'vendor-motion': ['motion'],
              'vendor-icons': ['lucide-react'],
              'vendor-radix': [
                '@radix-ui/react-accordion',
                '@radix-ui/react-dialog',
                '@radix-ui/react-dropdown-menu',
                '@radix-ui/react-select',
                '@radix-ui/react-tabs',
                '@radix-ui/react-tooltip',
                '@radix-ui/react-checkbox',
                '@radix-ui/react-switch',
                '@radix-ui/react-slot',
              ],
            },
          },
    },
    chunkSizeWarningLimit: 600,
    cssMinify: true,
    sourcemap: false,
    target: 'es2020',
  },

  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
}))
