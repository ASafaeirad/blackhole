import { useAtom, useSetAtom } from 'jotai';
import { useMemo } from 'react';

import { projectsAtom, setProjectsAtom, unSetProjectAtom } from './taskAtom';

export const useProjects = () => {
  return useAtom(projectsAtom)[0];
};

export const useSetProjects = () => {
  const setProject = useSetAtom(setProjectsAtom);
  const unSetProject = useSetAtom(unSetProjectAtom);
  return useMemo(
    () => ({ setProject, unSetProject }),
    [setProject, unSetProject],
  );
};
