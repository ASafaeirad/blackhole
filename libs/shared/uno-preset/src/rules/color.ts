import type { Rule } from '@unocss/core';

import { colorResolver, globalKeywords, h } from '../utils';

export const opacity: Rule[] = [
  [
    /^op(?:acity)?-?(.+)$/, // cspell:disable-line
    ([, d]) => ({ opacity: h.bracket.percent.cssvar(d) }),
  ],
];

export const textColors: Rule[] = [
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

export const bgColors: Rule[] = [
  [
    /^bg-(.+)$/,
    colorResolver('background-color', 'bg', 'bg'),
    { autocomplete: 'bg-$colors.bg' },
  ],
];

export const colorScheme: Rule[] = [
  [/^color-scheme-(\w+)$/, ([, v]) => ({ 'color-scheme': v })],
];
