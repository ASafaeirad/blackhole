import type { TargetConfiguration, Tree } from '@nx/devkit';
import { addProjectConfiguration } from '@nx/devkit';

import type { NormalizedSchema } from '../schema';

export function addProject(tree: Tree, options: NormalizedSchema) {
  const targets: Record<string, TargetConfiguration> = {
    lint: createLintTarget(options),
  };

  addProjectConfiguration(tree, options.name, {
    root: options.projectRoot,
    sourceRoot: `${options.projectRoot}/src`,
    projectType: 'library',
    tags: options.parsedTags,
    targets,
  });
}

function createLintTarget(options: NormalizedSchema): TargetConfiguration {
  return {
    executor: '@nx/linter:lint',
    options: {
      linter: 'eslint',
      tsConfig: `${options.projectRoot}/tsconfig.lib.json`,
      exclude: ['**/node_modules/**', `!${options.projectRoot}/**/*`],
    },
  };
}
