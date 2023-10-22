export interface ProjectSchema {
  name: string;
  tags?: string;
  unitTest: boolean;
  directory?: string;
  importPath?: string;
}

export interface NormalizedProjectSchema extends ProjectSchema {
  projectRoot: string;
  projectDirectory: string;
  fileName: string;
  parsedTags: string[];
  importPath: string;
  inSourceTests: boolean;
}
