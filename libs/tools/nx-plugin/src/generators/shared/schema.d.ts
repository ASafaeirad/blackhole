export type LibraryScope =
  | 'analytics'
  | 'focus'
  | 'notification'
  | 'shared'
  | 'task'
  | 'user';

export type LibraryType = 'app' | 'data' | 'e2e' | 'feature' | 'ui' | 'util';

export type Tag = `scope:${LibraryScope}` | `type:${LibraryType}`;

export interface ProjectSchema {
  name: string;
  scope: LibraryScope;
  type: LibraryType;
  unitTest: boolean;
  directory?: string;
  importPath?: string;
}

export interface NormalizedProjectSchema extends ProjectSchema {
  projectRoot: string;
  projectDirectory: string;
  fileName: string;
  parsedTags: Tag[];
  importPath: string;
  inSourceTests: boolean;
}
