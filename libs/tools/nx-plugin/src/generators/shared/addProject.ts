import type { Tree } from '@nx/devkit';
import { addProjectConfiguration } from '@nx/devkit';

import type { NormalizedProjectSchema } from './schema';

export function addProject(tree: Tree, schema: NormalizedProjectSchema) {
  addProjectConfiguration(tree, schema.name, {
    root: schema.projectRoot,
    sourceRoot: `${schema.projectRoot}/src`,
    projectType: 'library',
    tags: schema.parsedTags,
  });
}
