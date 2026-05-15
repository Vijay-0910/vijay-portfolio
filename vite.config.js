import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    modulePreload: { polyfill: false },
    minify: 'esbuild',
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-dom') || id.match(/[\\/]react[\\/]/)) return 'vendor-react'
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('gsap')) return 'vendor-gsap'
          if (id.includes('@react-three/drei')) return 'vendor-drei'
          if (id.includes('@react-three/fiber')) return 'vendor-r3f'
          if (id.includes('three')) return 'vendor-three'
          if (id.includes('lenis')) return 'vendor-lenis'
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
  },
})
