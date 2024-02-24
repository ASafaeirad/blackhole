import type { VariantContext, VariantObject } from '@unocss/core';
import { variantGetParameter, variantParentMatcher } from '@unocss/rule-utils';

import type { Theme } from '../theme';
import { h } from '../utils';

export const variantPrint: VariantObject<Theme> = variantParentMatcher(
  'print',
  '@media print',
) as VariantObject<Theme>;

export const variantCustomMedia: VariantObject<Theme> = {
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
