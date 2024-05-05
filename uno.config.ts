import { defineConfig, presetIcons, presetWebFonts } from 'unocss';
import { presetScrollbar } from 'unocss-preset-scrollbar';
import transformerVariantGroup from '@unocss/transformer-variant-group';

import { presetBlackhole } from './libs/tools/uno-preset/src'; // eslint-disable-line @nx/enforce-module-boundaries, import/no-relative-packages

export default defineConfig({
  shortcuts: {
    'absolute-center': 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
    'fc': 'flex flex-col',
    'fr': 'flex flex-row',
    'f1': 'flex-1',
    'center': 'justify-center items-center',
    'layout': 'px-8 md:px-32',
  },
  presets: [
    presetBlackhole(),
    presetIcons(),
    presetScrollbar({
      scrollbarWidth: '4px',
      scrollbarHeight: '4px',
      scrollbarTrackRadius: '2px',
      scrollbarThumbRadius: '2px',
      scrollbarThumbColor: 'rgba(255, 255, 255, 0.1)',
      scrollbarTrackColor: 'rgba(0, 0, 0, 0.2)',
    }),
    presetWebFonts({
      fonts: {
        sans: {
          name: 'Inter',
          weights: [400, 500, 800],
          provider: 'google',
        },
        mono: {
          name: 'IBM Plex Mono',
          weights: [400, 500, 600],
          provider: 'google',
        },
      },
    }),
  ],
  transformers: [transformerVariantGroup()],
});
