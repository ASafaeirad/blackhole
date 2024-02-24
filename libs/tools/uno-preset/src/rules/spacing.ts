import type { Rule } from '@unocss/core';

import type { Theme } from '../theme';
import { directionSize } from '../utils';

export const paddings: Rule<Theme>[] = [
  [
    /^p()-(-?.+)$/,
    directionSize('padding'),
    { autocomplete: ['(m|p)<num>', '(m|p)-<num>'] },
  ],
  [
    /^p([rltbse])-(-?.+)$/,
    directionSize('padding'),
    { autocomplete: ['(m|p)[rltbse]-<num>'] },
  ],
  [/^p([xy])(?:-?(-?.+))?$/, directionSize('padding')],
  [
    /^p-(block|inline)(?:-(-?.+))?$/,
    directionSize('padding'),
    { autocomplete: '(m|p)-(block|inline)-<num>' },
  ],
  [
    /^p-([bi][se])(?:-?(-?.+))?$/,
    directionSize('padding'),
    { autocomplete: '(m|p)-(bs|be|is|ie)-<num>' },
  ],
];

export const margins: Rule<Theme>[] = [
  [/^ma?()-?(-?.+)$/, directionSize('margin')],
  [/^m-xy()()$/, directionSize('margin')],
  [/^m([rltbse])-(-?.+)$/, directionSize('margin')],
  [/^m-([xy])(?:-?(-?.+))?$/, directionSize('margin')],
  [/^m-(block|inline)(?:-(-?.+))?$/, directionSize('margin')],
  [/^m-([bi][se])(?:-?(-?.+))?$/, directionSize('margin')],
];
