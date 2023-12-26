import { pxToRem } from '../utils/handlers';
import type { Theme } from './types';

export const spacing = {
  'DEFAULT': pxToRem(2),
  'none': '0',
  '1': pxToRem(2),
  '2': pxToRem(4),
  '3': pxToRem(8),
  '4': pxToRem(12),
  '5': pxToRem(16),
  '6': pxToRem(24),
  '7': pxToRem(32),
  '8': pxToRem(40),
  '9': pxToRem(64),
  '10': pxToRem(80),
} satisfies Theme['spacing'];
