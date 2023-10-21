import type { Tree } from '@nx/devkit';
import {
  convertNxGenerator,
  formatFiles,
  names,
  runTasksInSerial,
} from '@nx/devkit';
import { determineProjectNameAndRootOptions } from '@nx/devkit/src/generators/project-name-and-root-utils';

import type { NormalizedSchema, SolidLibrarySchema } from './schema';
import { addImportPath } from './utils/addImportPath';
import { addLinting } from './utils/addLinting';
import { addProject } from './utils/addProject';
import { addVitest } from './utils/addVitest';
import { createFiles } from './utils/createFiles';
import { initGenerator } from './utils/init';

async function normalizeOptions(
  host: Tree,
  options: SolidLibrarySchema,
): Promise<NormalizedSchema> {
  const {
    projectName,
    names: projectNames,
    projectRoot,
    importPath,
  } = await determineProjectNameAndRootOptions(host, {
    name: options.name,
    projectType: 'library',
    directory: options.directory,
    importPath: options.importPath,
    projectNameAndRootFormat: 'derived',
    callingGenerator: '@nxext/solid:library',
  });
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const parsedTags = options.tags
    ? options.tags.split(',').map(s => s.trim())
    : [];

  return {
    ...options,
    inSourceTests: false,
    name: projectName,
    projectRoot,
    parsedTags,
    fileName: projectNames.projectSimpleName,
    projectDirectory,
    importPath: importPath!,
  };
}

export async function libraryGenerator(host: Tree, schema: SolidLibrarySchema) {
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

export default libraryGenerator;
export const librarySchematic = convertNxGenerator(libraryGenerator);
