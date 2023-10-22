import type { Tree } from '@nx/devkit';
import { names } from '@nx/devkit';
import { determineProjectNameAndRootOptions } from '@nx/devkit/src/generators/project-name-and-root-utils';

import type { NormalizedSchema, SolidLibrarySchema } from '../schema';

export async function normalizeOptions(
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
