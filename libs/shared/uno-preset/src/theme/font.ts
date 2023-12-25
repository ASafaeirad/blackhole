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
  mono: toFont(['ui-monospace', 'monospace']),
} satisfies Theme['fontFamily'];

const fontWeight = {
  regular: '400',
  semiBold: '500',
  extraBold: '800',
};

export const textStyle = {
  body: {
    fontSize: '16px',
    fontWeight: fontWeight.regular,
    lineHeight: 'normal',
  },
  large: {
    fontSize: pxToRem(32),
    fontWeight: fontWeight.regular,
    lineHeight: 'normal',
  },
  title: {
    fontSize: pxToRem(26),
    fontWeight: fontWeight.semiBold,
    lineHeight: 'normal',
  },
  logo: {
    fontSize: pxToRem(32),
    fontWeight: fontWeight.extraBold,
    lineHeight: 'normal',
  },
  small: {
    fontSize: pxToRem(14),
    fontWeight: fontWeight.regular,
    lineHeight: 'normal',
  },
  xsamll: {
    fontSize: pxToRem(12),
    fontWeight: fontWeight.regular,
    lineHeight: 'normal',
  },
} satisfies Theme['textStyle'];
