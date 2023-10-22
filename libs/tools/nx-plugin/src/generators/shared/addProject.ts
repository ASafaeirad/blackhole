import type { Tree } from '@nx/devkit';
import { addProjectConfiguration } from '@nx/devkit';

import type { NormalizedProjectSchema } from './schema';

export function addProject(tree: Tree, options: NormalizedProjectSchema) {
  addProjectConfiguration(tree, options.name, {
    root: options.projectRoot,
    sourceRoot: `${options.projectRoot}/src`,
    projectType: 'library',
    tags: options.parsedTags,
  });
}
