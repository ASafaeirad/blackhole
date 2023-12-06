import type { Rule } from '@unocss/core';

import {
  colorableShadows,
  colorResolver,
  h,
  hasParseableColor,
} from '../utils';
import type { Theme } from '../theme';
import { varEmpty } from './static';

export const boxShadowsBase = {
  '--bh-ring-offset-shadow': '0 0 rgb(0 0 0 / 0)',
  '--bh-ring-shadow': '0 0 rgb(0 0 0 / 0)',
  '--bh-shadow-inset': varEmpty,
  '--bh-shadow': '0 0 rgb(0 0 0 / 0)',
};

export const boxShadows: Rule<Theme>[] = [
  // color
  [
    /^shadow(?:-(.+))?$/,
    (match, context) => {
      const [, d] = match;
      const { theme } = context;
      const v = theme.boxShadow?.[d || 'DEFAULT'];
      const c = d ? h.bracket.cssvar(d) : undefined;

      if ((v != null || c != null) && !hasParseableColor(c, theme, 'shadow')) {
        return {
          '--bh-shadow': colorableShadows((v ?? c)!, '--bh-shadow-color').join(
            ',',
          ),
          'box-shadow':
            'var(--bh-ring-offset-shadow), var(--bh-ring-shadow), var(--bh-shadow)',
        };
      }

      return colorResolver(
        '--bh-shadow-color',
        'shadow',
        'shadow',
      )(match, context);
    },
    { autocomplete: ['shadow-$colors.shadow', 'shadow-$boxShadow'] },
  ],
  [
    /^shadow-op(?:acity)?-?(.+)$/, // cspell:disable-line
    ([, opacity]) => ({
      '--bh-shadow-opacity': h.bracket.percent.cssvar(opacity),
    }),
    { autocomplete: 'shadow-(op|opacity)-<percent>' },
  ],

  // inset
  ['shadow-inset', { '--bh-shadow-inset': 'inset' }],
];
