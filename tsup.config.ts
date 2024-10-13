import { defineConfig } from 'tsup'

export default defineConfig({
  sourcemap: true,
  dts: true,
  minify: false,
  format: ['esm', 'cjs'],
  outDir: 'build',
})
