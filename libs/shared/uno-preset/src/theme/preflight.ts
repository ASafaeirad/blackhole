import { boxShadowsBase, ringBase, transformBase } from '../rules';
import { colorVars } from './colors';
import type { Theme } from './types';

export const preflightBase = {
  ...transformBase,
  ...boxShadowsBase,
  ...ringBase,
  ...colorVars,
} satisfies Theme['preflightBase'];
