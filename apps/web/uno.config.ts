import { defineConfig } from 'unocss';

import { presetBlackhole } from '../../libs/shared/uno-preset/src/index'; // eslint-disable-line @nx/enforce-module-boundaries, import/no-relative-packages

const palette = {
  flare: 'lch(65 60.36 26.96)',
  gray: {
    100: 'lch(93.75% 0 0)',
    200: 'lch(75.51% 0 0)',
    600: 'lch(30.59% 0 0)',
    700: 'lch(20.79% 0 0)',
    800: 'lch(15.16% 0 0)',
    900: 'lch(11.76% 0 0)',
  },
  tint: {
    10: 'lch(100 0 0 / 0.1)',
    30: 'lch(100 0 0 / 0.3)',
    50: 'lch(100 0 0 / 0.4)',
    80: 'lch(100 0 0 / 0.5)',
  },
};

export default defineConfig({
  theme: {
    colors: {
      border: {
        red: '#f00',
      },
      shadow: {},
      bg: {
        primary: palette.gray[900],
        elevated: palette.gray[800],
        alternative: palette.gray[100],
        subtle: palette.tint[30],
        cta: palette.gray[700],
      },
      text: {
        primary: palette.gray[100],
        alternative: palette.gray[900],
        muted: palette.tint[50],
        active: palette.tint[50],
      },
    },
  },
  rules: [],
  presets: [presetBlackhole()],
});
