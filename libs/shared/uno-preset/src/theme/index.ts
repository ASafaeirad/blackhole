import { borderRadius } from './border';
import { colors } from './colors';
import { blur, dropShadow } from './filters';
import { fontFamily, textStyle } from './font';
import {
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

export const theme: Theme = {
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
  textStyle,
  breakpoints,
  verticalBreakpoints,
  borderRadius,
  boxShadow,
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
};
