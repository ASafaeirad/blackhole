/* eslint-disable @nx/enforce-module-boundaries */
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import type { StorybookConfig } from '@storybook/html-vite';
import UnoCSS from 'unocss/vite';
import type { UserConfig } from 'vite';
import { mergeConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },

  viteFinal: viteConfig => {
    return mergeConfig(viteConfig, {
      plugins: [
        solidPlugin(),
        nxViteTsPaths(),
        UnoCSS({ configFile: '../../../../uno.config.ts' }),
      ],
    } as UserConfig);
  },
};

export default config;
