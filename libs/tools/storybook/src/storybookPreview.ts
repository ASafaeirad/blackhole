// eslint-disable-next-line import/no-unresolved
import 'uno.css';

import type { Preview } from '@storybook/vue3';

export const storybookPreview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};
