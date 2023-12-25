import type { Variant } from '@unocss/core';
import { variantMatcher } from '@unocss/rule-utils';

import type { Theme } from '../theme';

export const variantLanguageDirections: Variant<Theme>[] = [
  variantMatcher('rtl', input => ({
    prefix: `[dir="rtl"] $$ ${input.prefix}`,
  })),
  variantMatcher('ltr', input => ({
    prefix: `[dir="ltr"] $$ ${input.prefix}`,
  })),
];
