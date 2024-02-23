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

export const bgImage: Rule<Theme>[] = [
  [
    /^bv$/,
    () => {
      return {
        'background': `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMyIgaGVpZ2h0PSIxMyIgdmlld0JveD0iMCAwIDMgMTMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yIDFMMiAxMkwxIDEyTDEgMUwyIDFaIiBmaWxsPSIjQ0NDQ0NDIi8+Cjwvc3ZnPgo=") repeat-y 0 0`,
        'background-size': '3px 16px',
      };
    },
  ],
  [
    /^bh$/,
    () => {
      return {
        'background': `url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iNSIgdmlld0JveD0iMCAwIDEzIDUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDJIMTJWM0gxVjJaIiBmaWxsPSIjQ0NDQ0NDIi8+Cjwvc3ZnPgo=") repeat-x 0 0`,
        'background-size': '16px 5px',
      };
    },
  ],
];

export const colorScheme: Rule<Theme>[] = [
  [/^color-scheme-(\w+)$/, ([, v]) => ({ 'color-scheme': v })],
];
