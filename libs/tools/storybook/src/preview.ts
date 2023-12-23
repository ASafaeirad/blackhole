// eslint-disable-next-line @nx/enforce-module-boundaries
import '../../../shared/design/src/GlobalStyle';

import type { Decorator, Preview } from '@storybook/react';

const decorators: Decorator[] = [];

const preview: Preview = {
  decorators,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: 'lch(11.76% 0 0)' }],
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
