import { GeneratorCallback, Tree, ensurePackage, NX_VERSION } from '@nx/devkit';
import { NormalizedSchema } from '../schema';

export async function addVitest(
  tree: Tree,
  options: NormalizedSchema,
): Promise<GeneratorCallback> {
  const { vitestGenerator } = ensurePackage<typeof import('@nx/vite')>(
    '@nx/vite',
    NX_VERSION,
  );
  return await vitestGenerator(tree, {
    coverageProvider: 'v8',
    project: options.name,
    uiFramework: 'react',
    inSourceTests: false,
    skipFormat: true,
  });
}
