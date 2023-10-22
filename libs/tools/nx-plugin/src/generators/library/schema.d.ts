import type { NormalizedProjectSchema, ProjectSchema } from '../shared/schema';

export interface TypeScriptLibrarySchema extends ProjectSchema {}

export interface NormalizedSchema
  extends Omit<TypeScriptLibrarySchema, 'importPath'>,
    NormalizedProjectSchema {}
