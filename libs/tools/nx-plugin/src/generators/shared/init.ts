import type { Tree } from '@nx/devkit';
import {
  addDependenciesToPackageJson,
  convertNxGenerator,
  runTasksInSerial,
} from '@nx/devkit';

import {
  eslintPluginSolidVersion,
  solidVersion,
  vitePluginSolidVersion,
  vitestCoverageV8Version,
} from './versions';

export function initGenerator(tree: Tree) {
  const installTask = addDependenciesToPackageJson(
    tree,
    {},
    {
      'solid-js': solidVersion,
      'eslint-plugin-solid': eslintPluginSolidVersion,
      'vite-plugin-solid': vitePluginSolidVersion,
      '@vitest/coverage-v8': vitestCoverageV8Version,
    },
  );

  return runTasksInSerial(installTask);
}

export const initSchematic = convertNxGenerator(initGenerator);
