import { defineConfig, presetIcons, presetWebFonts } from 'unocss';

import { presetBlackhole } from './libs/shared/uno-preset/src'; // eslint-disable-line @nx/enforce-module-boundaries, import/no-relative-packages

export default defineConfig({
  shortcuts: {
    fc: 'flex flex-col',
    fr: 'flex flex-row',
    f1: 'flex-1',
  },
  presets: [
    presetBlackhole(),
    presetIcons(),
    presetWebFonts({
      fonts: {
        sans: {
          name: 'Inter',
          weights: [400, 500, 800],
          provider: 'google',
        },
      },
    }),
  ],
});
