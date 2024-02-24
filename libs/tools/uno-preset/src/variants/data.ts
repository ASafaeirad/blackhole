import type { Variant, VariantContext, VariantObject } from '@unocss/core';
import { variantGetParameter } from '@unocss/rule-utils';

import type { Theme } from '../theme';
import { h } from '../utils';

export const variantDataAttribute: VariantObject<Theme> = {
  name: 'data',
  match(matcher, ctx: VariantContext<Theme>) {
    const variant = variantGetParameter(
      'data-',
      matcher,
      ctx.generator.config.separators,
    );

    if (variant) {
      const [match, rest] = variant;
      const dataAttribute = h.bracket(match) ?? ctx.theme.data?.[match] ?? '';

      if (dataAttribute) {
        return {
          matcher: rest,
          selector: s => `${s}[data-${dataAttribute}]`,
        };
      }
    }
  },
};

export const variantGroupDataAttribute: Variant<Theme> = {
  name: 'group-data',
  match(matcher, ctx: VariantContext<Theme>) {
    const variant = variantGetParameter(
      'group-data-',
      matcher,
      ctx.generator.config.separators,
    );

    if (variant) {
      const [match, rest] = variant;
      const dataAttribute = h.bracket(match) ?? ctx.theme.data?.[match] ?? '';

      if (dataAttribute) {
        return {
          matcher: `group-[[data-${dataAttribute}]]:${rest}`,
        };
      }
    }
  },
};
