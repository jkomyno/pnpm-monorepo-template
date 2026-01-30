import { defineConfig } from 'vitest/config'

/**
 * Shared vitest configuration defaults.
 * Packages should import and spread these into their project definitions.
 */
export const baseTestConfig = {
  environment: 'node',
  globals: true,
} as const

export default defineConfig({
  test: {
    ...baseTestConfig,
    include: ['__tests__/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/build/**', '**/dist/**'],
  },
})
