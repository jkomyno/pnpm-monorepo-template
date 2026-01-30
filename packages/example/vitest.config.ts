import { defineConfig } from 'vitest/config'
import { baseTestConfig } from '../../vitest.config.base'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          ...baseTestConfig,
          name: 'unit',
          include: ['__tests__/unit/**/*.test.ts'],
        },
      },
    ],
  },
})
