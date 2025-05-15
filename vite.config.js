import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'hoist-non-react-statics': '/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js',
      'react-fast-compare': 'react-fast-compare',
    }
  },
  optimizeDeps: {
    include: ['react-fast-compare']
  },
})
