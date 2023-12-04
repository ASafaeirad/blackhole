import type { Tree } from '@nx/devkit';
import { convertNxGenerator, formatFiles } from '@nx/devkit';

import { addImportPath } from '../shared/addImportPath';
import { addLinting } from '../shared/addLinting';
import { addProject } from '../shared/addProject';
import { addSpell } from '../shared/addSpell';
import { addTSC } from '../shared/addTSC';
import { addVitest } from '../shared/addVitest';
import { normalizeOptions } from '../shared/normalizeOptions';
import type { TypeScriptLibrarySchema } from './schema';
import { createFiles } from './utils/createFiles';

export async function tsLibraryGenerator(
  tree: Tree,
  schema: TypeScriptLibrarySchema,
) {
  const options = await normalizeOptions(tree, schema, {
    callingGenerator: '@blackhole/nx:library',
  });
  addProject(tree, options);
  createFiles(tree, options);
  addLinting(tree, options);
  addSpell(tree, options);
  addVitest(tree, options);
  addImportPath(tree, options);
  addTSC(tree, options);

  return formatFiles(tree);
}

export default tsLibraryGenerator;
export const librarySchematic = convertNxGenerator(tsLibraryGenerator);
