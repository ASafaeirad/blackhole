import type { CSSEntries, CSSObject, Rule, RuleContext } from '@unocss/core';
import { colorOpacityToString, colorToString } from '@unocss/rule-utils';

import type { Theme } from '../theme';
import {
  cornerMap,
  directionMap,
  globalKeywords,
  h,
  hasParseableColor,
  isCSSMathFn,
  parseColor,
} from '../utils';

export const borderStyles = [
  'solid',
  'dashed',
  'dotted',
  'double',
  'hidden',
  'none',
  'groove',
  'ridge',
  'inset',
  'outset',
  ...globalKeywords,
];

export const borders: Rule<Theme>[] = [
  // compound
  [
    /^(?:border|b)()(?:-(.+))?$/,
    handlerBorder,
    { autocomplete: '(border|b)-<directions>' },
  ],
  [/^(?:border|b)-([xy])(?:-(.+))?$/, handlerBorder],
  [/^(?:border|b)-([rltbse])(?:-(.+))?$/, handlerBorder], // cspell:disable-line
  [/^(?:border|b)-(block|inline)(?:-(.+))?$/, handlerBorder],
  [/^(?:border|b)-([bi][se])(?:-(.+))?$/, handlerBorder],

  // size
  [
    /^(?:border|b)-()(?:width|size)-(.+)$/,
    handlerBorderSize,
    { autocomplete: ['(border|b)-<num>', '(border|b)-<directions>-<num>'] },
  ],
  [/^(?:border|b)-([xy])-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-([rltbse])-(?:width|size)-(.+)$/, handlerBorderSize], // cspell:disable-line
  [/^(?:border|b)-(block|inline)-(?:width|size)-(.+)$/, handlerBorderSize],
  [/^(?:border|b)-([bi][se])-(?:width|size)-(.+)$/, handlerBorderSize],

  // colors
  [
    /^(?:border|b)-()(?:color-)?(.+)$/,
    handlerBorderColor,
    {
      autocomplete: [
        '(border|b)-$colors.border',
        '(border|b)-<directions>-$colors.border',
      ],
    },
  ],
  [/^(?:border|b)-([xy])-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border|b)-([rltbse])-(?:color-)?(.+)$/, handlerBorderColor], // cspell:disable-line
  [/^(?:border|b)-(block|inline)-(?:color-)?(.+)$/, handlerBorderColor],
  [/^(?:border|b)-([bi][se])-(?:color-)?(.+)$/, handlerBorderColor],

  // opacity
  [
    /^(?:border|b)-()op(?:acity)?-?(.+)$/, // cspell:disable-line
    handlerBorderOpacity,
    { autocomplete: '(border|b)-(op|opacity)-<percent>' },
  ],
  [/^(?:border|b)-([xy])-op(?:acity)?-?(.+)$/, handlerBorderOpacity], // cspell:disable-line
  [/^(?:border|b)-([rltbse])-op(?:acity)?-?(.+)$/, handlerBorderOpacity], // cspell:disable-line
  [/^(?:border|b)-(block|inline)-op(?:acity)?-?(.+)$/, handlerBorderOpacity], // cspell:disable-line
  [/^(?:border|b)-([bi][se])-op(?:acity)?-?(.+)$/, handlerBorderOpacity], // cspell:disable-line

  // radius
  [
    /^(?:rounded)()(?:-(.+))?$/,
    handlerRounded,
    { autocomplete: ['rounded', 'rounded-$borderRadius'] },
  ],
  [/^(?:rounded)-([rltbse])(?:-(.+))?$/, handlerRounded], // cspell:disable-line
  [/^(?:rounded)-([rltb]{2})(?:-(.+))?$/, handlerRounded], // cspell:disable-line
  [/^(?:rounded)-([bise][se])(?:-(.+))?$/, handlerRounded], // cspell:disable-line
  [/^(?:rounded)-([bi][se]-[bi][se])(?:-(.+))?$/, handlerRounded],

  // style
  [
    /^(?:border|b)-(?:style-)?()(.+)$/,
    handlerBorderStyle,
    {
      autocomplete: [
        '(border|b)-style',
        `(border|b)-(${borderStyles.join('|')})`,
        '(border|b)-<directions>-style',
        `(border|b)-<directions>-(${borderStyles.join('|')})`,
        `(border|b)-<directions>-style-(${borderStyles.join('|')})`,
        `(border|b)-style-(${borderStyles.join('|')})`,
      ],
    },
  ],
  [/^(?:border|b)-([xy])-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border|b)-([rltbse])-(?:style-)?(.+)$/, handlerBorderStyle], // cspell:disable-line
  [/^(?:border|b)-(block|inline)-(?:style-)?(.+)$/, handlerBorderStyle],
  [/^(?:border|b)-([bi][se])-(?:style-)?(.+)$/, handlerBorderStyle],
];

function borderColorResolver(direction: string) {
  return ([, body]: string[], theme: Theme): CSSObject | undefined => {
    const data = parseColor(body, theme, 'border');

    if (!data) return;

    const { alpha, color, cssColor } = data;

    if (cssColor) {
      if (alpha != null)
        return {
          [`border${direction}-color`]: colorToString(cssColor, alpha),
        };

      if (direction === '')
        return {
          '--bh-border-opacity': colorOpacityToString(cssColor),
          'border-color': colorToString(cssColor, 'var(--bh-border-opacity)'),
        };
      return {
        // Separate this return since if `direction` is an empty string, the first key will be overwritten by the second.
        '--bh-border-opacity': colorOpacityToString(cssColor),
        [`--bh-border${direction}-opacity`]: 'var(--bh-border-opacity)',
        [`border${direction}-color`]: colorToString(
          cssColor,
          `var(--bh-border${direction}-opacity)`,
        ),
      };
    }

    if (color) {
      if (isCSSMathFn(color)) return { 'border-width': color };

      return {
        [`border${direction}-color`]: colorToString(color, alpha),
      };
    }
  };
}

function handlerBorder(
  m: string[],
  ctx: RuleContext<Theme>,
): CSSEntries | undefined {
  return handlerBorderSize(m, ctx);
}

function handlerBorderSize(
  [, a = '', b]: string[],
  { theme }: RuleContext<Theme>,
): CSSEntries | undefined {
  const v =
    theme.lineWidth?.[b || 'DEFAULT'] ?? h.bracket.cssvar.global.px(b || '1');

  if (a in directionMap && v != null)
    return directionMap[a].map(i => [`border${i}-width`, v]);
}

function handlerBorderColor(
  [, a = '', c]: string[],
  { theme }: RuleContext<Theme>,
): CSSObject | undefined {
  if (a in directionMap && hasParseableColor(c, theme, 'border')) {
    return Object.assign(
      {},
      ...directionMap[a].map(i => borderColorResolver(i)(['', c], theme)),
    );
  }
}

function handlerBorderOpacity([, a = '', opacity]: string[]):
  | CSSEntries
  | undefined {
  const v = h.bracket.percent.cssvar(opacity);
  if (a in directionMap && v != null)
    return directionMap[a].map(i => [`--bh-border${i}-opacity`, v]);
}

function handlerRounded(
  [, a = '', s]: string[],
  { theme }: RuleContext<Theme>,
): CSSEntries | undefined {
  const v =
    theme.borderRadius?.[s || 'DEFAULT'] ??
    h.bracket.cssvar.global.fraction.rem(s || '1');

  if (a in cornerMap && v != null)
    return cornerMap[a].map(i => [`border${i}-radius`, v]);
}

export function handlerBorderStyle([, a = '', s]: string[]):
  | CSSEntries
  | undefined {
  if (borderStyles.includes(s) && a in directionMap)
    return directionMap[a].map(i => [`border${i}-style`, s]);
}
