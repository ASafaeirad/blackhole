import { uniq } from '@fullstacksjs/toolbox';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';
import { useMemo } from 'react';

import { tasksAtom } from './atoms/taskAtom';
import { separator } from './config/config';
import { taskCollection } from './firebase/taskCollection';
import { focusedTaskAtom } from './useTaskListState';

const projectsAtom = atomWithDefault<string[]>(get =>
  uniq(
    get(tasksAtom)
      .filter(t => new RegExp(separator).exec(t.name))
      .map(t => t.name.split(separator)[0]?.trim())
      .filter(Boolean),
  ),
);

const setProjectsAtom = atom(null, async (get, _, project: string) => {
  const task = get(focusedTaskAtom);

  if (!task) return;

  const name = task.name.split(separator).pop();
  await taskCollection.update(task.id, {
    name: `${project}${separator}${name!}`,
  });
});

const unSetProjectAtom = atom(null, async get => {
  const task = get(focusedTaskAtom);

  if (!task) return;

  const name = task.name.split(separator).pop();
  await taskCollection.update(task.id, { name: name! });
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
