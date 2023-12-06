/* @refresh reload */
/**
 * Don't forget the line above for HMR!
 *
 * Note: for some reason HMR breaks if you change .stories file,
 * however reloading the page fixes this issue
 */

import '@unocss/reset/eric-meyer.css';
import 'virtual:uno.css';

import type { Decorator, Parameters } from '@storybook/html';
import { render } from 'solid-js/web';

export const decorators: Decorator[] = [
  Story => {
    const solidRoot = document.createElement('div');

    render(Story, solidRoot);

    return solidRoot;
  },
];

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
