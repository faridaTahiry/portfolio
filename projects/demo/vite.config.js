import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// This project is deployed at /projects/demo/ on the same Netlify site.
export default defineConfig({
  plugins: [react()],
  base: '/projects/demo/',
  build: {
    outDir: '../../dist/projects/demo',
    emptyOutDir: true,
  },
})
