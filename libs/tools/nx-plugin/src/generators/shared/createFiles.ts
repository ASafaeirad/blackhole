import type { Tree } from '@nx/devkit';
import {
  generateFiles,
  joinPathFragments,
  names,
  offsetFromRoot,
} from '@nx/devkit';

import type { NormalizedProjectSchema } from './schema';

export function createFiles(host: Tree, options: NormalizedProjectSchema) {
  generateFiles(
    host,
    joinPathFragments(__dirname, '../files'),
    options.projectRoot,
    {
      ...options,
      ...names(options.name),
      offsetFromRoot: offsetFromRoot(options.projectRoot),
    },
  );
}
