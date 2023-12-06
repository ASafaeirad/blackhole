import type { Tree } from '@nx/devkit';
import {
  readNxJson,
  readProjectConfiguration,
  updateNxJson,
  updateProjectConfiguration,
} from '@nx/devkit';

import type { NormalizedProjectSchema } from './schema';

export function addTSC(tree: Tree, schema: NormalizedProjectSchema) {
  addTargetDefaults(tree);
  const project = readProjectConfiguration(tree, schema.name);

  project.targets ??= {};
  project.targets['tsc'] = {};

  updateProjectConfiguration(tree, schema.name, project);
}

function addTargetDefaults(tree: Tree) {
  const nxJson = readNxJson(tree)!;

  nxJson.targetDefaults ??= {};
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  nxJson.targetDefaults['tsc'] ??= {
    cache: true,
    executor: 'nx:run-commands',
    options: {
      command: 'pnpm tsc --project {projectRoot}/tsconfig.lib.json --noEmit',
    },
    inputs: ['default', `{workspaceRoot}/tsconfig.*.json`],
  };

  updateNxJson(tree, nxJson);
}
