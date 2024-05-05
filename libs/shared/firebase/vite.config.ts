/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: '../../../node_modules/.vite/firebase',
  plugins: [nxViteTsPaths()],
  test: {
    reporters: ['default'],
    globals: true,
    passWithNoTests: true,
    environment: 'jsdom',
    include: ['src/**/*.spec.{ts,tsx}'],
  },
});
