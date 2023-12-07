import type { NormalizedProjectSchema, ProjectSchema } from '../shared/schema';

export interface VueLibrarySchema extends ProjectSchema {}

export interface NormalizedSchema
  extends Omit<VueLibrarySchema, 'importPath'>,
    NormalizedProjectSchema {}
