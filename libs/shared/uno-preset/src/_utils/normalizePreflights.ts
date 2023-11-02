import type { Preflight, PreflightContext } from '@unocss/core';

export function normalizePreflights<TTheme extends object>(
  preflights: Preflight<TTheme>[],
  variablePrefix: string,
) {
  if (variablePrefix !== 'bh-') {
    return preflights.map(p => ({
      ...p,
      getCSS: (() => async (ctx: PreflightContext<TTheme>) => {
        const css = await p.getCSS(ctx);
        if (css) return css.replace(/--bh-/g, `--${variablePrefix}`);
      })(),
    }));
  }

  return preflights;
}
