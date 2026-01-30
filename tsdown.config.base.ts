import type { OutExtensionContext, UserConfig } from 'tsdown'

/**
 * Shared tsdown configuration for all publishable packages.
 * Package-specific options can be overridden by extending this config.
 */
export const baseConfig = {
  entry: ['src/index.ts'],
  outDir: 'build',

  outExtensions: (ctx: OutExtensionContext) => ({
    js: ctx.format === 'es' ? '.mjs' : '.js',
    dts: ctx.format === 'es' ? '.d.mts' : '.d.ts',
  }),

  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  target: 'es2022',

  onSuccess() {
    console.info('Build succeeded!')
  },

  // Built-in validation tools
  attw: {
    entrypoints: ['.'],
    enabled: true,
    level: 'error',
    profile: 'node16',
  },

  publint: {
    enabled: true,
    level: 'error',
  },
} satisfies UserConfig
