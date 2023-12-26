import type { NormalizedProjectSchema, ProjectSchema } from '../shared/schema';

export interface ReactLibrarySchema extends ProjectSchema {}

export interface NormalizedSchema
  extends Omit<ReactLibrarySchema, 'importPath'>,
    NormalizedProjectSchema {}
