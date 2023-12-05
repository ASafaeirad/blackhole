import type { Tree } from '@nx/devkit';
import {
  readNxJson,
  readProjectConfiguration,
  updateNxJson,
  updateProjectConfiguration,
} from '@nx/devkit';

import type { NormalizedProjectSchema } from './schema';

export function addLinting(tree: Tree, schema: NormalizedProjectSchema) {
  addTargetDefaults(tree);
  const projectConfig = readProjectConfiguration(tree, schema.name);

  projectConfig.targets ??= {};
  projectConfig.targets['lint'] = {
    executor: '@nx/eslint:eslint',
    outputs: ['{options.outputFile}'],
    options: {
      lintFilePatterns: [`${schema.projectRoot}/**/*.{ts,spec.ts}`],
    },
  };

  updateProjectConfiguration(tree, schema.name, projectConfig);
}

function addTargetDefaults(tree: Tree) {
  const nxJson = readNxJson(tree)!;

  const productionFileSet = nxJson.namedInputs?.['production'];

  if (productionFileSet) {
    productionFileSet.push('!{projectRoot}/.eslintrc.cjs');
    nxJson.namedInputs!['production'] = Array.from(new Set(productionFileSet));
  }

  nxJson.targetDefaults ??= {};

  nxJson.targetDefaults['lint'] ??= {
    cache: true,
  };
  nxJson.targetDefaults['lint'].inputs ??= [
    'default',
    `{workspaceRoot}/.eslintrc.cjs`,
    `{workspaceRoot}/.eslintignore`,
  ];

  updateNxJson(tree, nxJson);
}
