import type { Rule } from '@unocss/core';

import { colorResolver, h } from '../_utils';
import type { Theme } from '../theme';

export const svgUtilities: Rule<Theme>[] = [
  // fills
  [
    /^fill-(.+)$/,
    colorResolver('fill', 'fill', 'text'),
    { autocomplete: 'fill-$colors.text' },
  ],
  [
    /^fill-op(?:acity)?-?(.+)$/, // cspell:disable-line
    ([, opacity]) => ({
      '--bh-fill-opacity': h.bracket.percent.cssvar(opacity),
    }),
    { autocomplete: 'fill-(op|opacity)-<percent>' },
  ],
  ['fill-none', { fill: 'none' }],

  // stroke size
  [
    /^stroke-(?:width-|size-)?(.+)$/,
    ([, s], { theme }) => ({
      'stroke-width':
        theme.lineWidth?.[s] ?? h.bracket.cssvar.fraction.px.number(s),
    }),
    { autocomplete: ['stroke-width-$lineWidth', 'stroke-size-$lineWidth'] },
  ],

  // stroke dash
  [
    /^stroke-dash-(.+)$/,
    ([, s]) => ({ 'stroke-dasharray': h.bracket.cssvar.number(s) }),
    { autocomplete: 'stroke-dash-<num>' },
  ],
  [
    /^stroke-offset-(.+)$/,
    ([, s], { theme }) => ({
      'stroke-dashoffset':
        theme.lineWidth?.[s] ?? h.bracket.cssvar.px.numberWithUnit(s),
    }),
    { autocomplete: 'stroke-offset-$lineWidth' },
  ],

  // stroke colors
  [
    /^stroke-(.+)$/,
    colorResolver('stroke', 'stroke', 'text'),
    { autocomplete: 'stroke-$colors.text' },
  ],
  [
    /^stroke-op(?:acity)?-?(.+)$/, // cspell:disable-line
    ([, opacity]) => ({
      '--bh-stroke-opacity': h.bracket.percent.cssvar(opacity),
    }),
    { autocomplete: 'stroke-(op|opacity)-<percent>' },
  ],

  // line cap
  ['stroke-cap-square', { 'stroke-linecap': 'square' }],
  ['stroke-cap-round', { 'stroke-linecap': 'round' }],
  ['stroke-cap-auto', { 'stroke-linecap': 'butt' }],

  // line join
  ['stroke-join-arcs', { 'stroke-linejoin': 'arcs' }],
  ['stroke-join-bevel', { 'stroke-linejoin': 'bevel' }],
  ['stroke-join-clip', { 'stroke-linejoin': 'miter-clip' }],
  ['stroke-join-round', { 'stroke-linejoin': 'round' }],
  ['stroke-join-auto', { 'stroke-linejoin': 'miter' }],

  // none
  ['stroke-none', { stroke: 'none' }],
];
