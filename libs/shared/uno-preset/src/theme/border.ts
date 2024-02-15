import { pxToRem } from '../utils';
import type { Theme } from './types';

export const borderRadius = {
  DEFAULT: pxToRem(4),
  none: '0',
  md: pxToRem(4),
  xl: pxToRem(60),
  full: '9999px',
} satisfies Theme['borderRadius'];
