import type { Variant } from '@unocss/core';

import type { PresetBlackholeOptions } from '..';
import type { Theme } from '../_theme';
import { variantAria } from './aria';
import { variantBreakpoints } from './breakpoints';
import { variantCombinators } from './combinators';
import { variantContainerQuery } from './container';
import { variantColorsMediaOrClass } from './dark';
import { variantDataAttribute, variantGroupDataAttribute } from './data';
import { variantLanguageDirections } from './directions';
import { variantImportant } from './important';
import { variantCustomMedia, variantPrint } from './media';
import {
  variantCssLayer,
  variantInternalLayer,
  variantScope,
  variantSelector,
  variantVariables,
} from './misc';
import { variantNegative } from './negative';
import {
  variantPartClasses,
  variantPseudoClassesAndElements,
  variantPseudoClassFunctions,
  variantTaggedPseudoClasses,
} from './pseudo';
import { variantSupports } from './supports';

export function variants(options: PresetBlackholeOptions): Variant<Theme>[] {
  return [
    variantAria,
    variantDataAttribute,
    variantCssLayer,

    variantSelector,
    variantInternalLayer,
    variantNegative,
    variantImportant(),
    variantSupports,
    variantPrint,
    variantCustomMedia,
    variantBreakpoints(),
    ...variantCombinators,

    variantPseudoClassesAndElements(),
    variantPseudoClassFunctions(),
    ...variantTaggedPseudoClasses(options),

    variantPartClasses,
    ...variantColorsMediaOrClass(options),
    ...variantLanguageDirections,
    variantScope,

    variantContainerQuery,
    variantVariables,
    variantGroupDataAttribute,
  ];
}
