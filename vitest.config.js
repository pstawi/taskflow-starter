import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
      // On ne mesure la qualité que sur la logique métier (tasks.js),
      // pas sur le fichier UI app.js.
      exclude: ['node_modules/', 'tests/', '*.config.js', 'src/app.js'],
      thresholds: {
        lines: 70,
        branches: 70,
        functions: 70,
        statements: 70,
      },
    },
  },
})

