import type { Tree } from '@nx/devkit';
import {
  readNxJson,
  readProjectConfiguration,
  updateNxJson,
  updateProjectConfiguration,
} from '@nx/devkit';

import type { NormalizedProjectSchema } from './schema';

export function addSpell(tree: Tree, schema: NormalizedProjectSchema) {
  addTargetDefaults(tree);
  const project = readProjectConfiguration(tree, schema.name);

  project.targets ??= {};
  project.targets['spell'] = {
    executor: 'nx:run-commands',
    options: {
      command: 'pnpm cspell {projectRoot}',
    },
  };

  updateProjectConfiguration(tree, schema.name, project);
}

function addTargetDefaults(tree: Tree) {
  const nxJson = readNxJson(tree)!;

  nxJson.targetDefaults ??= {};
  nxJson.targetDefaults['spell'] ??= {
    cache: true,
  };
  nxJson.targetDefaults['spell'].inputs ??= [
    'default',
    `{workspaceRoot}/.cspell.json`,
    `{workspaceRoot}/configs/cspell/*.txt`,
  ];

  updateNxJson(tree, nxJson);
}