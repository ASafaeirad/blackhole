import type { Tree } from '@nx/devkit';
import { getWorkspaceLayout, joinPathFragments, updateJson } from '@nx/devkit';

import type { NormalizedProjectSchema } from './schema';

export function addImportPath(tree: Tree, schema: NormalizedProjectSchema) {
  const { libsDir } = getWorkspaceLayout(tree);

  return updateJson(tree, 'tsconfig.base.json', json => {
    const c = json.compilerOptions;
    c.paths = c.paths || {};

    if (c.paths[schema.importPath]) {
      throw new Error(
        `You already have a library using the import path "${schema.importPath}". Make sure to specify a unique one.`,
      );
    }

    c.paths[schema.importPath] = [
      joinPathFragments(`${libsDir}/${schema.projectDirectory}/src/index.ts`),
    ];

    return json;
  });
}
