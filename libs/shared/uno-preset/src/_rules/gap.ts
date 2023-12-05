import type { Rule, RuleContext } from '@unocss/core';

import { h } from '../_utils';
import type { Theme } from '../theme';

const directions: Record<string, string> = {
  '': '',
  'x': 'column-',
  'y': 'row-',
};

function handleGap([, d = '', s]: string[], { theme }: RuleContext<Theme>) {
  const v = theme.spacing?.[s] ?? h.bracket.cssvar.global.rem(s);

  if (v != null) {
    return {
      [`${directions[d]}gap`]: v,
    };
  }
}

export const gaps: Rule[] = [
  [
    /^(?:flex-|grid-)?gap-?()(.+)$/,
    handleGap,
    { autocomplete: ['gap-$spacing', 'gap-<num>'] },
  ],
  [
    /^(?:flex-|grid-)?gap-([xy])-?(.+)$/,
    handleGap,
    { autocomplete: ['gap-(x|y)-$spacing', 'gap-(x|y)-<num>'] },
  ],
];
