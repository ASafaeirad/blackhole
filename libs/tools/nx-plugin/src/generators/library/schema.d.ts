import type { NormalizedProjectSchema, ProjectSchema } from '../shared/schema';

export interface TypeScriptLibrarySchema extends ProjectSchema {}

export interface NormalizedSchema
  extends TypeScriptLibrarySchema,
    NormalizedProjectSchema {
  projectRoot: string;
  projectDirectory: string;
  fileName: string;
  parsedTags: string[];
  importPath: string;
  inSourceTests: boolean;
}
