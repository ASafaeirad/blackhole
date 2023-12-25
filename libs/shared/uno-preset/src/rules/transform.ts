import type { CSSValues, Rule, RuleContext } from '@unocss/core';

import type { Theme } from '../theme';
import { h, makeGlobalStaticRules, positionMap, xyzMap } from '../utils';

const transformValues = ['translate', 'rotate', 'scale'];

const transformCpu = [
  'translateX(var(--bh-translate-x))',
  'translateY(var(--bh-translate-y))',
  'translateZ(var(--bh-translate-z))',
  'rotate(var(--bh-rotate))',
  'rotateX(var(--bh-rotate-x))',
  'rotateY(var(--bh-rotate-y))',
  'rotateZ(var(--bh-rotate-z))',
  'skewX(var(--bh-skew-x))',
  'skewY(var(--bh-skew-y))',
  'scaleX(var(--bh-scale-x))',
  'scaleY(var(--bh-scale-y))',
  'scaleZ(var(--bh-scale-z))',
].join(' ');

const transformGpu = [
  'translate3d(var(--bh-translate-x), var(--bh-translate-y), var(--bh-translate-z))',
  'rotate(var(--bh-rotate))',
  'rotateX(var(--bh-rotate-x))',
  'rotateY(var(--bh-rotate-y))',
  'rotateZ(var(--bh-rotate-z))',
  'skewX(var(--bh-skew-x))',
  'skewY(var(--bh-skew-y))',
  'scaleX(var(--bh-scale-x))',
  'scaleY(var(--bh-scale-y))',
  'scaleZ(var(--bh-scale-z))',
].join(' ');

export const transformBase = {
  // transform
  '--bh-rotate': 0,
  '--bh-rotate-x': 0,
  '--bh-rotate-y': 0,
  '--bh-rotate-z': 0,
  '--bh-scale-x': 1,
  '--bh-scale-y': 1,
  '--bh-scale-z': 1,
  '--bh-skew-x': 0,
  '--bh-skew-y': 0,
  '--bh-translate-x': 0,
  '--bh-translate-y': 0,
  '--bh-translate-z': 0,
};

export const transforms: Rule<Theme>[] = [
  // origins
  [
    /^(?:transform-)?origin-(.+)$/,
    ([, s]) => ({ 'transform-origin': positionMap[s] ?? h.bracket.cssvar(s) }),
    {
      autocomplete: [
        `transform-origin-(${Object.keys(positionMap).join('|')})`,
        `origin-(${Object.keys(positionMap).join('|')})`,
      ],
    },
  ],

  // perspectives
  [
    /^(?:transform-)?perspect(?:ive)?-(.+)$/, // cspell:disable-line
    ([, s]) => {
      const v = h.bracket.cssvar.px.numberWithUnit(s);

      if (v != null) {
        return {
          '-webkit-perspective': v,
          'perspective': v,
        };
      }
    },
  ],

  // skip 1 & 2 letters shortcut
  [
    /^(?:transform-)?perspect(?:ive)?-origin-(.+)$/, // cspell:disable-line
    ([, s]) => {
      const v =
        h.bracket.cssvar(s) ?? (s.length >= 3 ? positionMap[s] : undefined);

      if (v != null) {
        return {
          '-webkit-perspective-origin': v,
          'perspective-origin': v,
        };
      }
    },
  ],

  // modifiers
  [/^(?:transform-)?translate-()(.+)$/, handleTranslate],
  [/^(?:transform-)?translate-([xyz])-(.+)$/, handleTranslate],
  [/^(?:transform-)?rotate-()(.+)$/, handleRotate],
  [/^(?:transform-)?rotate-([xyz])-(.+)$/, handleRotate],
  [/^(?:transform-)?skew-()(.+)$/, handleSkew],
  [
    /^(?:transform-)?skew-([xy])-(.+)$/,
    handleSkew,
    {
      autocomplete: ['transform-skew-(x|y)-<percent>', 'skew-(x|y)-<percent>'],
    },
  ],
  [/^(?:transform-)?scale-()(.+)$/, handleScale],
  [
    /^(?:transform-)?scale-([xyz])-(.+)$/,
    handleScale,
    {
      autocomplete: [
        `transform-(${transformValues.join('|')})-<percent>`,
        `transform-(${transformValues.join('|')})-(x|y|z)-<percent>`,
        `(${transformValues.join('|')})-<percent>`,
        `(${transformValues.join('|')})-(x|y|z)-<percent>`,
      ],
    },
  ],

  // style
  [
    /^(?:transform-)?preserve-3d$/,
    () => ({ 'transform-style': 'preserve-3d' }),
  ],
  [/^(?:transform-)?preserve-flat$/, () => ({ 'transform-style': 'flat' })],

  // base
  ['transform', { transform: transformCpu }],
  ['transform-cpu', { transform: transformCpu }],
  ['transform-gpu', { transform: transformGpu }],
  ['transform-none', { transform: 'none' }],
  ...makeGlobalStaticRules('transform'),
];

function handleTranslate(
  [, d, b]: string[],
  { theme }: RuleContext<Theme>,
): CSSValues | undefined {
  const v = theme.spacing?.[b] ?? h.bracket.cssvar.fraction.rem(b);

  if (v != null) {
    return [
      ...xyzMap[d].map((i): [string, string] => [`--bh-translate${i}`, v]),
      ['transform', transformCpu],
    ];
  }
}

function handleScale([, d, b]: string[]): CSSValues | undefined {
  const v = h.bracket.cssvar.fraction.percent(b);

  if (v != null) {
    return [
      ...xyzMap[d].map((i): [string, string] => [`--bh-scale${i}`, v]),
      ['transform', transformCpu],
    ];
  }
}

function handleRotate([, d = '', b]: string[]): CSSValues | undefined {
  const v = h.bracket.cssvar.degree(b);

  if (v != null) {
    if (d) {
      return {
        '--bh-rotate': 0,
        [`--bh-rotate-${d}`]: v,
        'transform': transformCpu,
      };
    } else {
      return {
        '--bh-rotate-x': 0,
        '--bh-rotate-y': 0,
        '--bh-rotate-z': 0,
        '--bh-rotate': v,
        'transform': transformCpu,
      };
    }
  }
}

function handleSkew([, d, b]: string[]): CSSValues | undefined {
  const v = h.bracket.cssvar.degree(b);

  if (v != null) {
    return [
      ...xyzMap[d].map((i): [string, string] => [`--bh-skew${i}`, v]),
      ['transform', transformCpu],
    ];
  }
}
