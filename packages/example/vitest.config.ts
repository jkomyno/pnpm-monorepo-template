import { defineConfig } from 'vitest/config'
import { baseResolveConfig, baseTestConfig, srcAlias } from '../../vitest.config.base'

export default defineConfig({
  test: {
    projects: [
      {
        resolve: { alias: srcAlias(import.meta.url) },
        ssr: { resolve: baseResolveConfig },
        test: {
          ...baseTestConfig,
          name: 'unit',
          include: ['__tests__/unit/**/*.test.ts'],
        },
      },
    ],
  },
})
