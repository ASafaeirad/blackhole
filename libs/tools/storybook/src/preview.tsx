// eslint-disable-next-line @nx/enforce-module-boundaries
import '../../../shared/design/src/GlobalStyle';

import type { Decorator, Parameters, Preview } from '@storybook/react';
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';

const decorators: Decorator[] = [
  Story => (
    <RouterProvider
      router={createRouter({
        routeTree: createRootRoute({
          component: Story,
          notFoundComponent: Story,
        }),
      })}
    />
  ),
];

const parameters: Parameters = {
  backgrounds: {
    default: 'dark',
    values: [{ name: 'dark', value: 'lch(11.76% 0 0)' }],
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const preview: Preview = {
  decorators,
  parameters,
};

export default preview;
