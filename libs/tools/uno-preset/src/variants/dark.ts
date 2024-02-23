import type { Variant, VariantObject } from '@unocss/core';
import { variantMatcher, variantParentMatcher } from '@unocss/rule-utils';

import type { PresetBlackholeOptions, Theme } from '..';

export function variantColorsMediaOrClass(
  options: PresetBlackholeOptions = {},
): Variant<Theme>[] {
  if (options.dark === 'class' || typeof options.dark === 'object') {
    const { dark = '.dark', light = '.light' } =
      typeof options.dark === 'string' ? {} : options.dark;

    return [
      variantMatcher('dark', input => ({
        prefix: `${dark} $$ ${input.prefix}`,
      })) as VariantObject<Theme>,
      variantMatcher('light', input => ({
        prefix: `${light} $$ ${input.prefix}`,
      })) as VariantObject<Theme>,
    ];
  }

  return [
    variantParentMatcher(
      'dark',
      '@media (prefers-color-scheme: dark)',
    ) as VariantObject<Theme>,
    variantParentMatcher(
      'light',
      '@media (prefers-color-scheme: light)',
    ) as VariantObject<Theme>,
  ];
}
