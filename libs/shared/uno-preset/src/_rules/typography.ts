import type { CSSObject, Rule } from '@unocss/core';
import { toArray } from '@unocss/core';

import type { Theme } from '../_theme';
import { colorableShadows, colorResolver, h, splitShorthand } from '../_utils';

function handleThemeByKey(
  s: string,
  theme: Theme,
  key: 'letterSpacing' | 'lineHeight',
) {
  return theme[key]?.[s] ?? h.bracket.cssvar.global.rem(s);
}

export const fonts: Rule<Theme>[] = [
  // size
  [
    /^text-(.+)$/,
    ([, s = 'base'], { theme }) => {
      const [size, leading] = splitShorthand(s, 'length');
      const sizePairs = toArray(theme.fontSize?.[size]) as [
        string,
        CSSObject | string,
        string?,
      ];
      const lineHeight = leading
        ? handleThemeByKey(leading, theme, 'lineHeight')
        : undefined;

      if (sizePairs?.[0]) {
        const [fontSize, height, letterSpacing] = sizePairs;

        if (typeof height === 'object') {
          return {
            'font-size': fontSize,
            ...height,
          };
        }

        return {
          'font-size': fontSize,
          'line-height': lineHeight ?? height ?? '1',
          'letter-spacing': letterSpacing
            ? handleThemeByKey(letterSpacing, theme, 'letterSpacing')
            : undefined,
        };
      }

      const fontSize = h.bracketOfLength.rem(size);

      if (lineHeight && fontSize) {
        return {
          'font-size': fontSize,
          'line-height': lineHeight,
        };
      }

      return { 'font-size': h.bracketOfLength.rem(s) };
    },
    { autocomplete: 'text-$fontSize' },
  ],
  [
    /^(?:text|font)-size-(.+)$/,
    ([, s], { theme }) => {
      const themed = toArray(theme.fontSize?.[s]) as [
        string,
        CSSObject | string,
      ];
      const size = themed?.[0] ?? h.bracket.cssvar.global.rem(s);
      if (size != null) return { 'font-size': size };
    },
    { autocomplete: 'text-size-$fontSize' },
  ],

  // weights
  [
    /^(?:font|fw)-?([^-]+)$/,
    ([, s], { theme }) => ({
      'font-weight': theme.fontWeight?.[s] ?? h.bracket.global.number(s),
    }),
    {
      autocomplete: [
        '(font|fw)-(100|200|300|400|500|600|700|800|900)',
        '(font|fw)-$fontWeight',
      ],
    },
  ],

  // leadings
  [
    /^(?:font-)?(?:leading|lh|line-height)-(.+)$/,
    ([, s], { theme }) => ({
      'line-height': handleThemeByKey(s, theme, 'lineHeight'),
    }),
    { autocomplete: '(leading|lh|line-height)-$lineHeight' },
  ],

  // synthesis
  ['font-synthesis-weight', { 'font-synthesis': 'weight' }],
  ['font-synthesis-style', { 'font-synthesis': 'style' }],
  ['font-synthesis-small-caps', { 'font-synthesis': 'small-caps' }],
  ['font-synthesis-none', { 'font-synthesis': 'none' }],
  [
    /^font-synthesis-(.+)$/,
    ([, s]) => ({ 'font-synthesis': h.bracket.cssvar.global(s) }),
  ],

  // tracking
  [
    /^(?:font-)?tracking-(.+)$/,
    ([, s], { theme }) => ({
      'letter-spacing':
        theme.letterSpacing?.[s] ?? h.bracket.cssvar.global.rem(s),
    }),
    { autocomplete: 'tracking-$letterSpacing' },
  ],

  // word-spacing
  [
    /^(?:font-)?word-spacing-(.+)$/,
    ([, s], { theme }) => ({
      'word-spacing': theme.wordSpacing?.[s] ?? h.bracket.cssvar.global.rem(s),
    }),
    { autocomplete: 'word-spacing-$wordSpacing' },
  ],

  // family
  [
    /^font-(.+)$/,
    ([, d], { theme }) => ({
      'font-family': theme.fontFamily?.[d] ?? h.bracket.cssvar.global(d),
    }),
    { autocomplete: 'font-$fontFamily' },
  ],
];

export const tabSizes: Rule<Theme>[] = [
  [
    /^tab(?:-(.+))?$/,
    ([, s]) => {
      const v = h.bracket.cssvar.global.number(s || '4');

      if (v != null) {
        return {
          '-moz-tab-size': v,
          '-o-tab-size': v,
          'tab-size': v,
        };
      }
    },
  ],
];

export const textIndents: Rule<Theme>[] = [
  [
    /^indent(?:-(.+))?$/,
    ([, s], { theme }) => ({
      'text-indent':
        theme.textIndent?.[s || 'DEFAULT'] ??
        h.bracket.cssvar.global.fraction.rem(s),
    }),
    { autocomplete: 'indent-$textIndent' },
  ],
];

export const textStrokes: Rule<Theme>[] = [
  // widths
  [
    /^text-stroke(?:-(.+))?$/,
    ([, s], { theme }) => ({
      '-webkit-text-stroke-width':
        theme.textStrokeWidth?.[s || 'DEFAULT'] ?? h.bracket.cssvar.px(s),
    }),
    { autocomplete: 'text-stroke-$textStrokeWidth' },
  ],

  // colors
  [
    /^text-stroke-(.+)$/,
    colorResolver('-webkit-text-stroke-color', 'text-stroke', 'text'),
    { autocomplete: 'text-stroke-$colors.text' },
  ],
  [
    /^text-stroke-op(?:acity)?-?(.+)$/, // cspell:disable-line
    ([, opacity]) => ({
      '--bh-text-stroke-opacity': h.bracket.percent.cssvar(opacity),
    }),
    { autocomplete: 'text-stroke-(op|opacity)-<percent>' },
  ],
];

export const textShadows: Rule<Theme>[] = [
  [
    /^text-shadow(?:-(.+))?$/,
    ([, s], { theme }) => {
      const v = theme.textShadow?.[s || 'DEFAULT'];

      if (v != null) {
        return {
          '--bh-text-shadow': colorableShadows(
            v,
            '--bh-text-shadow-color',
          ).join(','),
          'text-shadow': 'var(--bh-text-shadow)',
        };
      }

      return { 'text-shadow': h.bracket.cssvar.global(s) };
    },
    { autocomplete: 'text-shadow-$textShadow' },
  ],

  // colors
  [
    /^text-shadow-color-(.+)$/,
    colorResolver('--bh-text-shadow-color', 'text-shadow', 'shadow'),
    { autocomplete: 'text-shadow-color-$colors.text' },
  ],
  [
    /^text-shadow-color-op(?:acity)?-?(.+)$/, // cspell:disable-line
    ([, opacity]) => ({
      '--bh-text-shadow-opacity': h.bracket.percent.cssvar(opacity),
    }),
    { autocomplete: 'text-shadow-color-(op|opacity)-<percent>' },
  ],
];
