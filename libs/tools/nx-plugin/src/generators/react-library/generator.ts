import type { Tree } from '@nx/devkit';
import { convertNxGenerator, formatFiles } from '@nx/devkit';

import { addImportPath } from '../shared/addImportPath';
import { addLinting } from '../shared/addLinting';
import { addProject } from '../shared/addProject';
import { addSpell } from '../shared/addSpell';
import { addTSC } from '../shared/addTSC';
import { normalizeOptions } from '../shared/normalizeOptions';
import type { ReactLibrarySchema } from './schema';
import { createFiles } from './utils/createFiles';

export async function reactLibraryGenerator(
  tree: Tree,
  schema: ReactLibrarySchema,
) {
  const options = await normalizeOptions(tree, schema, {
    callingGenerator: '@blackhole/nx:react-library',
  });
  addProject(tree, options);
  createFiles(tree, options);
  addLinting(tree, options);
  addSpell(tree, options);
  addTSC(tree, options);
  addImportPath(tree, options);

  return formatFiles(tree);
}

export default reactLibraryGenerator;
export const librarySchematic = convertNxGenerator(reactLibraryGenerator);
