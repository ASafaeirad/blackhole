import type { Rule } from '@unocss/core';
import { warnOnce } from '@unocss/core';

import type { Theme } from '../theme';

export const containerParent: Rule<Theme>[] = [
  [
    /^@container(?:\/(\w+))?(?:-(normal))?$/,
    ([, l, v]) => {
      warnOnce(
        'The container query rule is experimental and may not follow semver.',
      );

      return {
        'container-type': v ?? 'inline-size',
        'container-name': l,
      };
    },
  ],
];
