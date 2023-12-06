import { boxShadowsBase, ringBase, transformBase } from '../rules';
import type { Theme } from './types';

export const preflightBase = {
  fontSize: '.625rem',
  ...transformBase,
  ...boxShadowsBase,
  ...ringBase,
} satisfies Theme['preflightBase'];
