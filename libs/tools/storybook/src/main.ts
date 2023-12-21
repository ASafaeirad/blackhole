import path from 'node:path';

import { createProjectGraphAsync } from '@nx/devkit';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import type { StorybookConfig } from '@storybook/vue3-vite';
import UnoCSS from 'unocss/vite';
import { mergeConfig } from 'vite';

const unoConfig = path.resolve(process.cwd(), 'uno.config.ts');

const storybookConfig: StorybookConfig = {
  /* @ts-expect-error storybook issue [https://github.com/storybookjs/storybook/issues/23624] */
  stories: async () => {
    const graph = await createProjectGraphAsync();
    const value = Object.values(graph.nodes).map(node => ({
      titlePrefix: node.name,
      directory: `../../../../${node.data.sourceRoot ?? ''}`,
      files: '**/*.stories.*',
    }));

    return value;
  },
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  viteFinal: viteConfig =>
    mergeConfig(viteConfig, {
      // ISSUE: https://github.com/vitejs/vite/issues/15374
      assetsInclude: ['/sb-preview/runtime.js'],
      plugins: [nxViteTsPaths(), UnoCSS({ configFile: unoConfig })],
    }),
};

export default storybookConfig;
