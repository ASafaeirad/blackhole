import type { Variant } from '@unocss/core';
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
      })),
      variantMatcher('light', input => ({
        prefix: `${light} $$ ${input.prefix}`,
      })),
    ];
  }

  return [
    variantParentMatcher('dark', '@media (prefers-color-scheme: dark)'),
    variantParentMatcher('light', '@media (prefers-color-scheme: light)'),
  ];
}
