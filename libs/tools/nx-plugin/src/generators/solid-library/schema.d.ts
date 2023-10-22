import type { NormalizedProjectSchema, ProjectSchema } from '../shared/schema';

export interface SolidLibrarySchema extends ProjectSchema {}

export interface NormalizedSchema
  extends SolidLibrarySchema,
    NormalizedProjectSchema {
  projectRoot: string;
  projectDirectory: string;
  fileName: string;
  parsedTags: string[];
  importPath: string;
  inSourceTests: boolean;
}
