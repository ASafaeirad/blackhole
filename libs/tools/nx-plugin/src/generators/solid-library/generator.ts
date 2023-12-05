import type { Tree } from '@nx/devkit';
import { convertNxGenerator, formatFiles, runTasksInSerial } from '@nx/devkit';

import { addImportPath } from '../shared/addImportPath';
import { addLinting } from '../shared/addLinting';
import { addProject } from '../shared/addProject';
import { addSpell } from '../shared/addSpell';
import { addTSC } from '../shared/addTSC';
import { addVitest } from '../shared/addVitest';
import { normalizeOptions } from '../shared/normalizeOptions';
import type { SolidLibrarySchema } from './schema';
import { createFiles } from './utils/createFiles';
import { initGenerator } from './utils/init';

export async function solidLibraryGenerator(
  tree: Tree,
  schema: SolidLibrarySchema,
) {
  const options = await normalizeOptions(tree, schema, {
    callingGenerator: '@blackhole/nx:solid-library',
  });
  const initTask = await initGenerator(tree);
  addProject(tree, options);
  createFiles(tree, options);
  addLinting(tree, options);
  addSpell(tree, options);
  addTSC(tree, options);
  addVitest(tree, options);
  addImportPath(tree, options);

  await formatFiles(tree);
  return runTasksInSerial(initTask);
}

export default solidLibraryGenerator;
export const librarySchematic = convertNxGenerator(solidLibraryGenerator);
