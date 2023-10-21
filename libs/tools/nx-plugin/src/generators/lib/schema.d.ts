export interface SolidLibrarySchema {
  name: string;
  tags?: string;
  unitTest: boolean;
  directory?: string;
  importPath?: string;
}

export interface NormalizedSchema extends SolidLibrarySchema {
  projectRoot: string;
  projectDirectory: string;
  fileName: string;
  parsedTags: string[];
  importPath: string;
  inSourceTests: boolean;
}
