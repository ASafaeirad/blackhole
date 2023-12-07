import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import type { StorybookConfig } from '@storybook/vue3-vite';
import UnoCSS from 'unocss/vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  viteFinal: viteConfig =>
    mergeConfig(viteConfig, {
      plugins: [
        nxViteTsPaths(),
        UnoCSS({ configFile: '../../../../uno.config.ts' }),
      ],
    }),
};

export default config;
