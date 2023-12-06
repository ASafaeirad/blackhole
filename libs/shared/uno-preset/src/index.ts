import type { Postprocessor, PresetOptions } from '@unocss/core';
import { definePreset } from '@unocss/core';
import { extractorArbitraryVariants } from '@unocss/extractor-arbitrary-variants';

import { normalizePreflights } from './utils/normalizePreflights';
import { preflights } from './preflights';
import { rules } from './rules';
import { shorthands } from './shorthands';
import type { Theme, ThemeAnimation } from './theme';
import { theme } from './theme';
import { variants } from './variants';

export type { Theme, ThemeAnimation };

export interface DarkModeSelectors {
  /**
   * Selector for light variant.
   *
   * @default '.light'
   */
  light?: string;

  /**
   * Selector for dark variant.
   *
   * @default '.dark'
   */
  dark?: string;
}

export interface PresetBlackholeOptions extends PresetOptions {
  /**
   * Dark mode options
   *
   * @default 'class'
   */
  dark?: DarkModeSelectors | 'class' | 'media';
  /**
   * Generate pseudo selector as `[group=""]` instead of `.group`
   *
   * @default false
   */
  attributifyPseudo?: boolean;
  /**
   * Prefix for CSS variables.
   *
   * @default 'un-'
   */
  prefix?: string[] | string;
  /**
   * Generate preflight
   *
   * @default true
   */
  preflight?: boolean;

  /**
   * Enable arbitrary variants, for example `<div class="[&>*]:m-1 [&[open]]:p-2"></div>`.
   *
   * Disable this might slightly improve the performance.
   *
   * @default true
   */
  arbitraryVariants?: boolean;
}

export const presetBlackhole = definePreset(
  (options: PresetBlackholeOptions = {}) => {
    options.dark = options.dark ?? 'class';
    options.attributifyPseudo = options.attributifyPseudo ?? false;
    options.preflight = options.preflight ?? true;
    const variablePrefix = 'bh-';

    return {
      name: '@unocss/preset-blackhole',
      theme,
      rules,
      variants: variants(options),
      options,
      prefix: options.prefix,
      postprocess: VarPrefixPostprocessor(variablePrefix),
      preflights: options.preflight
        ? normalizePreflights(preflights, variablePrefix)
        : [],
      extractorDefault: options.arbitraryVariants
        ? extractorArbitraryVariants
        : undefined,
      autocomplete: {
        shorthands,
      },
    };
  },
);

export function VarPrefixPostprocessor(
  prefix: string,
): Postprocessor | undefined {
  if (prefix !== 'bh-') {
    return obj => {
      obj.entries.forEach(i => {
        i[0] = i[0].replace(/^--bh-/, `--${prefix}`);
        if (typeof i[1] === 'string')
          i[1] = i[1].replace(/var\(--bh-/g, `var(--${prefix}`);
      });
    };
  }
}
