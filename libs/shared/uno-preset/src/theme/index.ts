import { colors } from './colors';
import { blur, dropShadow } from './filters';
import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  textIndent,
  textShadow,
  textStrokeWidth,
  wordSpacing,
} from './font';
import {
  borderRadius,
  boxShadow,
  breakpoints,
  duration,
  easing,
  lineWidth,
  media,
  ringWidth,
  verticalBreakpoints,
  zIndex,
} from './misc';
import { preflightBase } from './preflight';
import { containers, height, maxHeight, maxWidth, width } from './size';
import { spacing } from './spacing';
import type { Theme } from './types';

export type { Theme, ThemeAnimation } from './types';

export const theme = {
  colors,
  width,
  height,
  maxWidth,
  maxHeight,
  minWidth: maxWidth,
  minHeight: maxHeight,
  inlineSize: width,
  blockSize: height,
  maxInlineSize: maxWidth,
  maxBlockSize: maxHeight,
  minInlineSize: maxWidth,
  minBlockSize: maxHeight,
  fontFamily,
  fontSize,
  fontWeight,
  breakpoints,
  verticalBreakpoints,
  borderRadius,
  lineHeight,
  letterSpacing,
  wordSpacing,
  boxShadow,
  textIndent,
  textShadow,
  textStrokeWidth,
  blur,
  dropShadow,
  easing,
  lineWidth,
  spacing,
  duration,
  ringWidth,
  preflightBase,
  containers,
  zIndex,
  media,
} satisfies Theme;