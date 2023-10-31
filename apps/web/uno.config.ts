import { defineConfig } from 'unocss';

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
  theme: {},
  rules: [
    ['color-primary', { color: palette.gray[100] }],
    ['color-alternative', { color: palette.gray[900] }],
    ['color-muted', { color: palette.tint[50] }],
    ['color-active', { color: palette.tint[50] }],

    ['bg-primary', { backgroundColor: palette.gray[900] }],
    ['bg-elevated', { backgroundColor: palette.gray[800] }],
    ['bg-alternative', { backgroundColor: palette.gray[100] }],
    ['bg-subtle', { backgroundColor: palette.tint[30] }],
    ['bg-cta', { backgroundColor: palette.gray[700] }],
  ],
  presets: [],
});
