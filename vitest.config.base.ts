import { fileURLToPath } from 'node:url'
import { defaultServerConditions } from 'vite'
import { defineConfig } from 'vitest/config'

/**
 * Shared vitest configuration defaults.
 * Packages should import and spread these into their project definitions.
 */
export const baseTestConfig = {
  environment: 'node',
  globals: true,
} as const

/**
 * Resolve workspace packages to their TypeScript sources through the same custom
 * export condition that tsconfig `customConditions` uses, so tests never depend on
 * potentially stale `build/` artifacts.
 *
 * Vitest resolves test imports through Vite's SSR pipeline, so this must be set under
 * `ssr.resolve` (top-level `resolve.conditions` only affects the client environment).
 * Custom conditions replace Vite's defaults, so the defaults are spread back in.
 *
 * Note: inline vitest projects do not inherit the root-level `ssr` options, so this
 * must be set on each project definition.
 */
export const baseResolveConfig = {
  conditions: ['@jkomyno/source', ...defaultServerConditions],
} as const

/**
 * Map `src/...` import specifiers to the package's own `src/` directory, mirroring the
 * `paths` mapping in the shared tsconfig, so tests avoid long relative imports.
 * Pass the package vitest config's `import.meta.url`.
 */
export const srcAlias = (configUrl: string): { src: string } => ({
  src: fileURLToPath(new URL('./src', configUrl)),
})

export default defineConfig({
  ssr: { resolve: baseResolveConfig },
  test: {
    ...baseTestConfig,
    include: ['__tests__/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/build/**', '**/dist/**'],
  },
})
