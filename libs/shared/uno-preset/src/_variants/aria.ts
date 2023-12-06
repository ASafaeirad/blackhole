import type { VariantContext, VariantObject } from '@unocss/core';
import { variantGetParameter } from '@unocss/rule-utils';

import type { Theme } from '../_theme';
import { h } from '../_utils';

export const variantAria: VariantObject = {
  name: 'aria',
  match(matcher, ctx: VariantContext<Theme>) {
    const variant = variantGetParameter(
      'aria-',
      matcher,
      ctx.generator.config.separators,
    );

    if (variant) {
      const [match, rest] = variant;
      const aria = h.bracket(match) ?? ctx.theme.aria?.[match] ?? '';

      if (aria) {
        return {
          matcher: rest,
          selector: s => `${s}[aria-${aria}]`,
        };
      }
    }
  },
};
