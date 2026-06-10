import { defineConfig } from 'vitest/config'
import { baseResolveConfig, baseTestConfig } from '../../vitest.config.base'

export default defineConfig({
  test: {
    projects: [
      {
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
