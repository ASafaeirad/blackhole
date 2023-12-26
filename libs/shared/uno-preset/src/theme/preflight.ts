import { boxShadowsBase, ringBase, transformBase } from '../rules';
import { colorVars } from './colors';
import { fontFamily } from './font';
import type { Theme } from './types';

export const preflightBase = {
  ...transformBase,
  ...boxShadowsBase,
  ...ringBase,
  ...colorVars,
  'font-family': fontFamily.sans,
} satisfies Theme['preflightBase'];
