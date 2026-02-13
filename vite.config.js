import { defineConfig } from 'vite'

export default defineConfig({
  base: '/taskflow-starter/',  // Nom de votre repo !
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'node',
  },
})
