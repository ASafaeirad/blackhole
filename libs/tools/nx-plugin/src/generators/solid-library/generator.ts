import type { Tree } from '@nx/devkit';
import { convertNxGenerator, formatFiles, runTasksInSerial } from '@nx/devkit';

import type { SolidLibrarySchema } from './schema';
import { addImportPath } from './utils/addImportPath';
import { addLinting } from './utils/addLinting';
import { addProject } from './utils/addProject';
import { addVitest } from './utils/addVitest';
import { createFiles } from './utils/createFiles';
import { initGenerator } from './utils/init';
import { normalizeOptions } from './utils/normalizeOptions';

export async function solidLibraryGenerator(
  host: Tree,
  schema: SolidLibrarySchema,
) {
  const options = await normalizeOptions(host, schema);
  const initTask = await initGenerator(host);
  addProject(host, options);
  createFiles(host, options);
  addVitest(host, options);
  addLinting(host, options);
  addImportPath(host, options);

  await formatFiles(host);
  return runTasksInSerial(initTask);
}

export default solidLibraryGenerator;
export const librarySchematic = convertNxGenerator(solidLibraryGenerator);
