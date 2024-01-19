export * from './getPlatform';

// TODO: move to toolbox
export const arraysAreEqual = (a: any[], b: any[]) => {
  if (a.length !== b.length) return false;

  // eslint-disable-next-line fp/no-loops, fp/no-let
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};
