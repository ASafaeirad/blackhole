import type { Tree } from '@nx/devkit';
import {
  readNxJson,
  readProjectConfiguration,
  updateNxJson,
  updateProjectConfiguration,
} from '@nx/devkit';

import type { NormalizedSchema } from '../schema';

export function addLinting(tree: Tree, options: NormalizedSchema) {
  addTargetDefaults(tree);
  const projectConfig = readProjectConfiguration(tree, options.name);

  projectConfig.targets ??= {};
  projectConfig.targets.lint = {
    executor: '@nx/eslint:lint',
    outputs: ['{options.outputFile}'],
    options: {
      lintFilePatterns: [`${options.projectRoot}/**/*.{ts,spec.ts}`],
    },
  };

  updateProjectConfiguration(tree, options.name, projectConfig);
}

function addTargetDefaults(tree: Tree) {
  const nxJson = readNxJson(tree)!;

  const productionFileSet = nxJson.namedInputs?.production;

  if (productionFileSet) {
    productionFileSet.push('!{projectRoot}/.eslintrc.js');
    nxJson.namedInputs!.production = Array.from(new Set(productionFileSet));
  }

  nxJson.targetDefaults ??= {};

  nxJson.targetDefaults.lint ??= {};
  nxJson.targetDefaults.lint.inputs ??= [
    'default',
    `{workspaceRoot}/.eslintrc.js`,
    `{workspaceRoot}/.eslintignore`,
  ];

  updateNxJson(tree, nxJson);
}
