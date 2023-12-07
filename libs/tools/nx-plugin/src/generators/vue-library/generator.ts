import type { Tree } from '@nx/devkit';
import { convertNxGenerator, formatFiles } from '@nx/devkit';

import { addImportPath } from '../shared/addImportPath';
import { addLinting } from '../shared/addLinting';
import { addProject } from '../shared/addProject';
import { addSpell } from '../shared/addSpell';
import { addTSC } from '../shared/addTSC';
import { addVitest } from '../shared/addVitest';
import { normalizeOptions } from '../shared/normalizeOptions';
import type { VueLibrarySchema } from './schema';
import { createFiles } from './utils/createFiles';

export async function vueLibraryGenerator(
  tree: Tree,
  schema: VueLibrarySchema,
) {
  const options = await normalizeOptions(tree, schema, {
    callingGenerator: '@blackhole/nx:vue-library',
  });
  addProject(tree, options);
  createFiles(tree, options);
  addLinting(tree, options);
  addSpell(tree, options);
  addTSC(tree, options);
  addVitest(tree, options);
  addImportPath(tree, options);

  return formatFiles(tree);
}

export default vueLibraryGenerator;
export const librarySchematic = convertNxGenerator(vueLibraryGenerator);
