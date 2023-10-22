import type { Tree } from '@nx/devkit';
import {
  generateFiles,
  joinPathFragments,
  names,
  offsetFromRoot,
} from '@nx/devkit';

import type { NormalizedProjectSchema } from './schema';

export function createFiles(tree: Tree, options: NormalizedProjectSchema) {
  generateFiles(
    tree,
    joinPathFragments(__dirname, '../files'),
    options.projectRoot,
    {
      ...options,
      ...names(options.name),
      offsetFromRoot: offsetFromRoot(options.projectRoot),
    },
  );
}
