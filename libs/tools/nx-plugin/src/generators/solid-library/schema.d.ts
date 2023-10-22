import type { NormalizedProjectSchema, ProjectSchema } from '../shared/schema';

export interface SolidLibrarySchema extends ProjectSchema {}

export interface NormalizedSchema
  extends Omit<SolidLibrarySchema, 'importPath'>,
    NormalizedProjectSchema {}
