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

  updateNxJson(tree, nxJson);
}
