import type { Tree } from '@nx/devkit';
import {
  joinPathFragments,
  offsetFromRoot,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit';

import type { NormalizedSchema } from '../solid-library/schema';

export function addVitest(tree: Tree, schema: NormalizedSchema) {
  const project = readProjectConfiguration(tree, schema.name);

  const coveragePath = joinPathFragments(
    'coverage',
    project.root === '.' ? schema.name : project.root,
  );
  const testOptions = {
    reportsDirectory: joinPathFragments(
      offsetFromRoot(project.root),
      coveragePath,
    ),
  };

  project.targets ??= {};

  project.targets['test'] = {
    executor: '@nx/vite:test',
    outputs: ['{options.reportsDirectory}'],
    options: testOptions,
  };

  updateProjectConfiguration(tree, schema.name, project);
}
