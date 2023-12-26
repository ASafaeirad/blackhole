import { createValueHandler } from '@unocss/rule-utils';

import * as valueHandlers from './handlers';

export const handler = createValueHandler(valueHandlers);
export const h = handler;

export function pxToRem(px: number): string {
  return `${px / 16}rem`;
}

export { valueHandlers };
