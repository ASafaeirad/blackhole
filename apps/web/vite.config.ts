import path from 'node:path';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,

  build: {
    outDir: '../../dist/apps/web',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  cacheDir: '../../node_modules/.vite/apps/web',
  server: {
    port: 3000,
  },
  preview: {
    port: 4200,
  },
  plugins: [
    react({
      babel: {
        presets: ['jotai/babel/preset'],
      },
    }),
    TanStackRouterVite({
      routesDirectory: path.join(__dirname, 'src/routes'),
      generatedRouteTree: path.join(__dirname, 'src/routeTree.gen.ts'),
    }),
    nxViteTsPaths(),
    UnoCSS({ configFile: '../../uno.config.ts' }),
  ],
  test: {
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/web',
      provider: 'v8',
    },
    globals: true,
    passWithNoTests: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.spec.{ts,tsx}'],
  },
});
