import type { Rule } from '@unocss/core';

import type { Theme } from '../theme';
import { h } from '../utils';

export const fonts: Rule<Theme>[] = [
  // size
  [
    /^text-(.+)$/,
    ([, s = 'body'], { theme }) => theme.textStyle?.[s],
    { autocomplete: 'text-$textStyle' },
  ],

  // family
  [
    /^font-(.+)$/,
    ([, d], { theme }) => ({
      'font-family': theme.fontFamily?.[d] ?? h.bracket.cssvar.global(d),
    }),
    { autocomplete: 'font-$fontFamily' },
  ],
];

export const tabSizes: Rule<Theme>[] = [
  [
    /^tab(?:-(.+))?$/,
    ([, s]) => {
      const v = h.bracket.cssvar.global.number(s || '4');

      if (v != null) {
        return {
          '-moz-tab-size': v,
          '-o-tab-size': v,
          'tab-size': v,
        };
      }
    },
  ],
];
