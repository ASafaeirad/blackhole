/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: '../../../node_modules/.vite/task-list',
  plugins: [nxViteTsPaths()],
  test: {
    reporters: ['default'],
    globals: true,
    passWithNoTests: true,
    cache: { dir: '../../../node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.spec.{ts,tsx}'],
  },
});