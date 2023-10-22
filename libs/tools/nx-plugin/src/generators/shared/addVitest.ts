import type { Tree } from '@nx/devkit';
import {
  joinPathFragments,
  offsetFromRoot,
  readProjectConfiguration,
  updateProjectConfiguration,
} from '@nx/devkit';

import type { NormalizedSchema } from '../solid-library/schema';

export function addVitest(tree: Tree, options: NormalizedSchema) {
  const project = readProjectConfiguration(tree, options.name);

  const coveragePath = joinPathFragments(
    'coverage',
    project.root === '.' ? options.name : project.root,
  );
  const testOptions = {
    passWithNoTests: true,
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

  updateProjectConfiguration(tree, options.name, project);
}
