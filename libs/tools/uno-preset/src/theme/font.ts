import { pxToRem } from '../utils/handlers';
import type { Theme } from './types';

const emoji = [
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
];

const toFont = (arr: string[]) => arr.join(',');

export const fontFamily = {
  sans: toFont([
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    ...emoji,
  ]),
  serif: toFont(['ui-serif', 'serif']),
  mono: toFont(['IBM Plex Mono', 'ui-monospace', 'monospace']),
} satisfies Theme['fontFamily'];

const fontWeight = {
  regular: '400',
  semiBold: '500',
  extraBold: '800',
};

export const textStyle = {
  body: {
    'font-size': '20px',
    'font-weight': fontWeight.regular,
    'line-height': 'normal',
  },
  large: {
    'font-size': pxToRem(32),
    'font-weight': fontWeight.regular,
    'line-height': 'normal',
  },
  title: {
    'font-size': pxToRem(26),
    'font-weight': fontWeight.semiBold,
    'line-height': 'normal',
  },
  small: {
    'font-size': pxToRem(14),
    'font-weight': fontWeight.regular,
    'line-height': 'normal',
  },
  xsamll: {
    'font-size': pxToRem(12),
    'font-weight': fontWeight.regular,
    'line-height': 'normal',
  },
} satisfies Theme['textStyle'];
