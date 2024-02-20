import type { Rule } from '@unocss/core';

import type { Theme } from '../theme';
import { colorResolver, globalKeywords, h } from '../utils';

export const opacity: Rule<Theme>[] = [
  [
    /^op(?:acity)?-?(.+)$/, // cspell:disable-line
    ([, d]) => ({ opacity: h.bracket.percent.cssvar(d) }),
  ],
];

export const textColors: Rule<Theme>[] = [
  [
    /^(?:color|c)-(.+)$/,
    colorResolver('color', 'text', 'text'),
    { autocomplete: '(color)-$colors.text' },
  ],
  [
    /^(?:color|c)-(.+)$/,
    ([, v]) => (globalKeywords.includes(v) ? { color: v } : undefined),
    { autocomplete: `(color)-(${globalKeywords.join('|')})` },
  ],
];

export const bgColors: Rule<Theme>[] = [
  [
    /^bg-(.+)$/,
    colorResolver('background-color', 'bg', 'bg'),
    { autocomplete: ['bg-$colors.bg', 'bg-transparent'] },
  ],
];

export const colorScheme: Rule<Theme>[] = [
  [/^color-scheme-(\w+)$/, ([, v]) => ({ 'color-scheme': v })],
];
