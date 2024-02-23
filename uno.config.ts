import { defineConfig, presetIcons, presetWebFonts } from 'unocss';

import { presetBlackhole } from './libs/tools/uno-preset/src'; // eslint-disable-line @nx/enforce-module-boundaries, import/no-relative-packages

export default defineConfig({
  shortcuts: {
    'absolute-center': 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'fc': 'flex flex-col',
    'fr': 'flex flex-row',
    'f1': 'flex-1',
    'center': 'justify-center items-center',
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
        mono: {
          name: 'Kode Mono',
          weights: [400, 500, 600],
          provider: 'google',
        },
      },
    }),
  ],
});
