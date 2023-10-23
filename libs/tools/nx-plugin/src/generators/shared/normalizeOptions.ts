import type { Tree } from '@nx/devkit';
import { names } from '@nx/devkit';
import { determineProjectNameAndRootOptions } from '@nx/devkit/src/generators/project-name-and-root-utils';

import type { NormalizedProjectSchema, ProjectSchema } from './schema';

export async function normalizeOptions(
  host: Tree,
  schema: ProjectSchema,
  option: { callingGenerator: `@blackhole/nx:${string}` },
): Promise<NormalizedProjectSchema> {
  const {
    projectName,
    names: projectNames,
    projectRoot,
    importPath,
  } = await determineProjectNameAndRootOptions(host, {
    name: schema.name,
    projectType: 'library',
    directory: schema.directory ?? `libs/${schema.scope}`,
    importPath:
      schema.importPath ?? `@blackhole/${schema.scope}/${schema.name}`,
    projectNameAndRootFormat: 'derived',
    ...option,
  });
  const name = names(schema.name).fileName;
  const projectDirectory = schema.directory
    ? `${names(schema.directory).fileName}/${name}`
    : `${schema.scope}/${name}`;

  return {
    ...schema,
    inSourceTests: false,
    name: projectName,
    projectRoot,
    parsedTags: [`type:${schema.type}`, `scope:${schema.scope}`],
    fileName: projectNames.projectSimpleName,
    projectDirectory,
    importPath: importPath!,
  };
}
