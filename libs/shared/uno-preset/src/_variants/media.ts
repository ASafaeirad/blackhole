import type { VariantContext, VariantObject } from '@unocss/core';
import { variantGetParameter, variantParentMatcher } from '@unocss/rule-utils';

import type { Theme } from '../_theme';
import { h } from '../_utils';

export const variantPrint: VariantObject = variantParentMatcher(
  'print',
  '@media print',
);

export const variantCustomMedia: VariantObject = {
  name: 'media',
  match(matcher, ctx: VariantContext<Theme>) {
    const variant = variantGetParameter(
      'media-',
      matcher,
      ctx.generator.config.separators,
    );

    if (variant) {
      const [match, rest] = variant;

      let media = h.bracket(match) ?? '';
      if (media === '') media = ctx.theme.media?.[match] ?? '';

      if (media) {
        return {
          matcher: rest,
          handle: (input, next) =>
            next({
              ...input,
              parent: `${
                input.parent ? `${input.parent} $$ ` : ''
              }@media ${media}`,
            }),
        };
      }
    }
  },
  multiPass: true,
};
