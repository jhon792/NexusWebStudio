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

export default defineConfig({
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
    // Code splitting manual para separar vendors pesados
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom'],
          // Router
          'vendor-router': ['react-router'],
          // Animaciones (Framer Motion)
          'vendor-motion': ['motion'],
          // Iconos
          'vendor-icons': ['lucide-react'],
          // Radix UI (todos los componentes)
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
    // Aumentar el límite de aviso (chunks están bien separados)
    chunkSizeWarningLimit: 600,
    // Minificación de CSS
    cssMinify: true,
    // Source maps en producción desactivados (seguridad: no exponer código fuente)
    sourcemap: false,
    // Target moderno para mejor tree-shaking
    target: 'es2020',
  },

  server: {
    // Headers de seguridad en desarrollo
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
})
