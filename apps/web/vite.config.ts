/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  cacheDir: '../../node_modules/.vite/web',
  server: {
    port: 3000,
    host: 'localhost',
  },
  plugins: [
    solidPlugin(),
    nxViteTsPaths(),
    UnoCSS({ configFile: '../../uno.config.ts' }),
  ],
  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{spec}.{ts,tsx}'],
  },
});
