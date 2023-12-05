import type { Rule } from '@unocss/core';

import { colorResolver, h } from '../_utils';
import type { Theme } from '../theme';
import { varEmpty } from './static';

export const ringBase = {
  '--bh-ring-inset': varEmpty,
  '--bh-ring-offset-width': '0px',
  '--bh-ring-offset-color': '#fff',
  '--bh-ring-width': '0px',
  '--bh-ring-color': 'rgb(147 197 253 / 0.5)',
  '--bh-shadow': '0 0 rgb(0 0 0 / 0)',
};

export const rings: Rule<Theme>[] = [
  // size
  [
    /^ring(?:-(.+))?$/,
    ([, d], { theme }) => {
      const value = theme.ringWidth?.[d || 'DEFAULT'] ?? h.px(d || '1');

      if (value) {
        return {
          '--bh-ring-width': value,
          '--bh-ring-offset-shadow':
            'var(--bh-ring-inset) 0 0 0 var(--bh-ring-offset-width) var(--bh-ring-offset-color)',
          '--bh-ring-shadow':
            'var(--bh-ring-inset) 0 0 0 calc(var(--bh-ring-width) + var(--bh-ring-offset-width)) var(--bh-ring-color)',
          'box-shadow':
            'var(--bh-ring-offset-shadow), var(--bh-ring-shadow), var(--bh-shadow)',
        };
      }
    },
    { autocomplete: 'ring-$ringWidth' },
  ],
  [
    /^ring-(?:width-|size-)(.+)$/,
    ([, d], { theme }) => ({
      '--bh-ring-width': theme.lineWidth?.[d] ?? h.bracket.cssvar.px(d),
    }),
    { autocomplete: 'ring-(width|size)-$lineWidth' },
  ],

  // offset size
  ['ring-offset', { '--bh-ring-offset-width': '1px' }],
  [
    /^ring-offset-(?:width-|size-)?(.+)$/,
    ([, d], { theme }) => ({
      '--bh-ring-offset-width': theme.lineWidth?.[d] ?? h.bracket.cssvar.px(d),
    }),
    { autocomplete: 'ring-offset-(width|size)-$lineWidth' },
  ],

  // colors
  [
    /^ring-(.+)$/,
    colorResolver('--bh-ring-color', 'ring', 'border'),
    { autocomplete: 'ring-$colors.border' },
  ],
  [
    /^ring-op(?:acity)?-?(.+)$/, // cspell:disable-line
    ([, opacity]) => ({
      '--bh-ring-opacity': h.bracket.percent.cssvar(opacity),
    }),
    { autocomplete: 'ring-(op|opacity)-<percent>' },
  ],

  // offset color
  [
    /^ring-offset-(.+)$/,
    colorResolver('--bh-ring-offset-color', 'ring-offset', 'border'),
    { autocomplete: 'ring-offset-$colors.border' },
  ],
  [
    /^ring-offset-op(?:acity)?-?(.+)$/, // cspell:disable-line
    ([, opacity]) => ({
      '--bh-ring-offset-opacity': h.bracket.percent.cssvar(opacity),
    }),
    { autocomplete: 'ring-offset-(op|opacity)-<percent>' },
  ],

  // style
  ['ring-inset', { '--bh-ring-inset': 'inset' }],
];
