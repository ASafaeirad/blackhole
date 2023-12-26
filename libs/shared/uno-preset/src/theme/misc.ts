import { pxToRem } from '../utils';
import type { Theme } from './types';

// keep in ASC order: container.ts and breakpoints.ts need that order
export const breakpoints = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
} satisfies Theme['breakpoints'];

export const verticalBreakpoints = {
  ...breakpoints,
} satisfies Theme['breakpoints'];

export const lineWidth = {
  DEFAULT: '1px',
  none: '0',
} satisfies Theme['lineWidth'];

export const duration = {
  DEFAULT: '150ms',
  none: '0s',
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
} satisfies Theme['duration'];

export const borderRadius = {
  DEFAULT: pxToRem(4),
  none: '0',
  md: pxToRem(4),
  xl: pxToRem(60),
  full: '9999px',
} satisfies Theme['borderRadius'];

export const boxShadow = {
  'DEFAULT': [
    'var(--bh-shadow-inset) 0 1px 3px 0 rgb(0 0 0 / 0.1)',
    'var(--bh-shadow-inset) 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  ],
  'none': '0 0 rgb(0 0 0 / 0)',
  'sm': 'var(--bh-shadow-inset) 0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'md': [
    'var(--bh-shadow-inset) 0 4px 6px -1px rgb(0 0 0 / 0.1)',
    'var(--bh-shadow-inset) 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  ],
  'lg': [
    'var(--bh-shadow-inset) 0 10px 15px -3px rgb(0 0 0 / 0.1)',
    'var(--bh-shadow-inset) 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  ],
  'xl': [
    'var(--bh-shadow-inset) 0 20px 25px -5px rgb(0 0 0 / 0.1)',
    'var(--bh-shadow-inset) 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  ],
  '2xl': 'var(--bh-shadow-inset) 0 25px 50px -12px rgb(0 0 0 / 0.25)',
  'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
} satisfies Theme['boxShadow'];

export const easing = {
  'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
  'linear': 'linear',
  'in': 'cubic-bezier(0.4, 0, 1, 1)',
  'out': 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
} satisfies Theme['easing'];

export const ringWidth = {
  DEFAULT: '1px',
  none: '0',
} satisfies Theme['ringWidth'];

export const zIndex = {
  auto: 'auto',
};

export const media = {
  mouse: '(hover) and (pointer: fine)',
};
