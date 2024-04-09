import { uniq } from '@fullstacksjs/toolbox';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { useMemo } from 'react';

import { tasksAtom } from './atoms/taskAtom';
import { separator } from './config/config';
import { focusedTaskAtom } from './useTaskListState';

const projectsAtom = atomWithDefault<string[]>(get =>
  uniq(
    get(tasksAtom)
      .filter(t => new RegExp(separator).exec(t.name))
      .map(t => t.name.split(separator)[0]?.trim())
      .filter(Boolean),
  ),
);

const setProjectsAtom = atom(null, (get, set, project: string) => {
  set(tasksAtom, ps => {
    const newTasks = [...ps];
    const focusedTask = get(focusedTaskAtom);
    if (!focusedTask) return newTasks;

    const name = focusedTask.name.split(separator).pop();
    focusedTask.name = `${project}${separator}${name!}`;

    return newTasks;
  });
});

const unSetProjectAtom = atom(null, (get, set) => {
  set(tasksAtom, ps => {
    const newTasks = [...ps];
    const focusedTask = get(focusedTaskAtom);
    if (!focusedTask) return newTasks;

    focusedTask.name = focusedTask.name.split(separator).pop()!;

    return newTasks;
  });
});

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
