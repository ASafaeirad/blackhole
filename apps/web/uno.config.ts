import { defineConfig } from 'unocss';

import { presetBlackhole } from '../../libs/shared/uno-preset/src/index'; // eslint-disable-line @nx/enforce-module-boundaries, import/no-relative-packages

export default defineConfig({
  presets: [presetBlackhole()],
});
