import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['**/unit/**/*.test.ts'],
          environment: 'node',
          globals: true,
        },
      },
      {
        test: {
          name: 'integration',
          include: ['**/integration/**/*.test.ts'],
          environment: 'node',
          globals: true,
        },
      },
    ],
  },
})
