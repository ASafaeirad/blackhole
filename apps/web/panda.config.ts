import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  include: ['./src/**/*.{ts,tsx}', '../../libs/shared/design/*.{ts,tsx}'],
  exclude: [],
  theme: {
    extend: {},
  },
  outdir: 'src/system',
});
