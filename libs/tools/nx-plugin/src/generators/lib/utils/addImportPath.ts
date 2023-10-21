import type { Tree } from '@nx/devkit';
import { getWorkspaceLayout, joinPathFragments, updateJson } from '@nx/devkit';

import type { NormalizedSchema } from '../schema';

export function addImportPath(tree: Tree, options: NormalizedSchema) {
  const { libsDir } = getWorkspaceLayout(tree);

  return updateJson(tree, 'tsconfig.base.json', json => {
    const c = json.compilerOptions;
    c.paths = c.paths || {};

    if (c.paths[options.importPath]) {
      throw new Error(
        `You already have a library using the import path "${options.importPath}". Make sure to specify a unique one.`,
      );
    }

    c.paths[options.importPath] = [
      joinPathFragments(`${libsDir}/${options.projectDirectory}/src/index.ts`),
    ];

    return json;
  });
}
