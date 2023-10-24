/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  cacheDir: '../../../node_modules/.vite/design',
  plugins: [nxViteTsPaths()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react/jsx-runtime',
        '@blackhole/styled-system',
        '@blackhole/styled-system/css',
        '@pandacss/dev',
      ],
    },
  },
  test: {
    globals: true,
    cache: { dir: '../../../node_modules/.vitest' },
    environment: 'jsdom',
    include: ['src/**/*.{spec}.{ts,tsx}'],
  },
});
