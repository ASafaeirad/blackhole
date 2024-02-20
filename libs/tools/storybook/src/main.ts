import fs from 'node:fs';
import path from 'node:path';

import { createProjectGraphAsync } from '@nx/devkit';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import type { StorybookConfig } from '@storybook/react-vite';
import UnoCSS from 'unocss/vite';
import { mergeConfig } from 'vite';

const unoConfig = path.resolve(process.cwd(), 'uno.config.ts');

const config: StorybookConfig = {
  /* @ts-expect-error storybook issue [https://github.com/storybookjs/storybook/issues/23624] */
  stories: async () => {
    const graph = await createProjectGraphAsync();
    const value = Object.values(graph.nodes)
      .filter(node => {
        const file = path.join(
          __dirname,
          '../../../../',
          node.data.sourceRoot ?? '',
          '../tsconfig.storybook.json',
        );
        return node.type === 'lib' && fs.existsSync(file);
      })
      .map(node => ({
        titlePrefix: node.name,
        directory: path.join('../../../../', node.data.sourceRoot ?? ''),
        files: '**/*.stories.*',
      }));

    return value;
  },
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  viteFinal: viteConfig =>
    mergeConfig(viteConfig, {
      assetsInclude: ['/sb-preview/runtime.js'],
      plugins: [nxViteTsPaths(), UnoCSS({ configFile: unoConfig })],
    }),
};

export default config;
