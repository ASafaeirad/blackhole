import path from 'node:path';

import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  root: __dirname,

  build: {
    outDir: '../../dist/apps/web',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: function manualChunks(id) {
          if (id.includes('date-fns')) return 'date-fns';
          if (
            id.includes('/react-dom@') ||
            id.includes('/react@') ||
            id.includes('use-sync-external-store')
          )
            return 'react';
          if (id.includes('react-aria') || id.includes('radix-ui'))
            return 'design-system';
          if (id.includes('jotai')) return 'jotai';
          if (id.includes('@tanstack')) return 'tanstack';
          if (id.includes('framer-motion')) return 'framer-motion';
          if (id.includes('@firebase')) return 'firebase';
          if (id.includes('node_modules')) return 'vendor';
          return 'main';
        },
      },
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
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'TheBlackhole',
        short_name: 'TheBlackhole',
        background_color: 'lch(11.76% 0 0)',
        description: 'All in one focus app',
        display: 'standalone',
        theme_color: 'lch(11.76% 0 0)',
        orientation: 'portrait',
        screenshots: [
          {
            src: '/screenshots/screenshot-01.png',
            sizes: '1280x720',
            form_factor: 'wide',
            type: 'image/png',
          },
          {
            src: '/screenshots/screenshot-02.png',
            sizes: '400x720',
            type: 'image/png',
          },
        ],
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
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
