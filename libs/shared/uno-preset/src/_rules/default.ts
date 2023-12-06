import type { Rule } from '@unocss/core';

import type { Theme } from '../_theme';
import { textAligns, verticalAligns } from './align';
import { appearance, outline, willChange } from './behaviors';
import { borders } from './border';
import { bgColors, colorScheme, opacity, textColors } from './color';
import { containerParent } from './container';
import { textDecorations } from './decoration';
import { flex } from './flex';
import { gaps } from './gap';
import { grids } from './grid';
import { overflows } from './layout';
import {
  alignments,
  boxSizing,
  flexGridJustifiesAlignments,
  floats,
  insets,
  justifies,
  orders,
  placements,
  positions,
  zIndexes,
} from './position';
import { questionMark } from './question-mark';
import { rings } from './ring';
import { boxShadows } from './shadow';
import { aspectRatio, sizes } from './size';
import { margins, paddings } from './spacing';
import {
  appearances,
  breaks,
  contains,
  contents,
  contentVisibility,
  cursors,
  displays,
  fontSmoothings,
  fontStyles,
  pointerEvents,
  resizes,
  textOverflows,
  textTransforms,
  textWraps,
  userSelects,
  whitespaces,
} from './static';
import { svgUtilities } from './svg';
import { transforms } from './transform';
import { transitions } from './transition';
import {
  fonts,
  tabSizes,
  textIndents,
  textShadows,
  textStrokes,
} from './typography';
import { cssProperty, cssVariables } from './variables';

export const rules: Rule<Theme>[] = [
  cssVariables,
  cssProperty,
  paddings,
  margins,
  displays,
  opacity,
  bgColors,
  colorScheme,
  svgUtilities,
  borders,
  contentVisibility,
  contents,
  fonts,
  tabSizes,
  textIndents,
  textOverflows,
  textDecorations,
  textStrokes,
  textShadows,
  textTransforms,
  textAligns,
  textColors,
  fontStyles,
  fontSmoothings,
  boxShadows,
  rings,
  flex,
  grids,
  gaps,
  positions,
  sizes,
  aspectRatio,
  cursors,
  appearances,
  pointerEvents,
  resizes,
  verticalAligns,
  userSelects,
  whitespaces,
  breaks,
  overflows,
  outline,
  appearance,
  orders,
  justifies,
  alignments,
  placements,
  flexGridJustifiesAlignments,
  insets,
  floats,
  zIndexes,
  boxSizing,
  transitions,
  transforms,
  willChange,
  containerParent,
  contains,
  textWraps,

  // should be the last
  questionMark,
].flat(1);
