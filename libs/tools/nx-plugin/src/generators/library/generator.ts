import type { Tree } from '@nx/devkit';
import { convertNxGenerator, formatFiles, runTasksInSerial } from '@nx/devkit';

import { addImportPath } from '../shared/addImportPath';
import { addLinting } from '../shared/addLinting';
import { addProject } from '../shared/addProject';
import { addVitest } from '../shared/addVitest';
import { normalizeOptions } from '../shared/normalizeOptions';
import type { TypeScriptLibrarySchema } from './schema';
import { createFiles } from './utils/createFiles';
import { initGenerator } from './utils/init';

export async function tsLibraryGenerator(
  tree: Tree,
  schema: TypeScriptLibrarySchema,
) {
  const options = await normalizeOptions(tree, schema, {
    callingGenerator: '@blackhole/nx:library',
  });
  const initTask = await initGenerator(tree);
  addProject(tree, options);
  createFiles(tree, options);
  addLinting(tree, options);
  addVitest(tree, options);
  addImportPath(tree, options);

  await formatFiles(tree);
  return runTasksInSerial(initTask);
}

export default tsLibraryGenerator;
export const librarySchematic = convertNxGenerator(tsLibraryGenerator);
