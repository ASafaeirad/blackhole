import type { Tree } from '@nx/devkit';
import {
  generateFiles,
  joinPathFragments,
  names,
  offsetFromRoot,
} from '@nx/devkit';

import type { NormalizedSchema } from '../schema';

export function createFiles(tree: Tree, schema: NormalizedSchema) {
  generateFiles(
    tree,
    joinPathFragments(__dirname, '../files'),
    schema.projectRoot,
    {
      ...schema,
      ...names(schema.name),
      offsetFromRoot: offsetFromRoot(schema.projectRoot),
    },
  );
}
