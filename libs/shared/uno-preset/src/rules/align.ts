import type { Rule } from '@unocss/core';

import type { Theme } from '../theme';
import { h } from '../utils/handlers';
import { globalKeywords } from '../utils/mappings';

const verticalAlignAlias: Record<string, string> = {
  'mid': 'middle',
  'base': 'baseline',
  'btm': 'bottom',
  'baseline': 'baseline',
  'top': 'top',
  'start': 'top',
  'middle': 'middle',
  'bottom': 'bottom',
  'end': 'bottom',
  'text-top': 'text-top',
  'text-bottom': 'text-bottom',
  'sub': 'sub',
  'super': 'super',
  ...Object.fromEntries(globalKeywords.map(x => [x, x])),
};

export const verticalAligns: Rule<Theme>[] = [
  [
    /^(?:vertical|align|v)-([-\w]+%?)$/,
    ([, v]) => ({
      'vertical-align': verticalAlignAlias[v] ?? h.numberWithUnit(v),
    }),
    {
      autocomplete: [
        `(vertical|align|v)-(${Object.keys(verticalAlignAlias).join('|')})`,
        '(vertical|align|v)-<percentage>',
      ],
    },
  ],
];

export const textAligns: Rule<Theme>[] = [
  'center',
  'left',
  'right',
  'justify',
  'start',
  'end',
].map(v => [`text-${v}`, { 'text-align': v }]);
