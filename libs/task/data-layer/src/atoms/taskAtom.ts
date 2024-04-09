import { clone } from '@fullstacksjs/toolbox';
import type { SetStateAction } from 'jotai';
import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

import type { Task } from '../models/Task';

export type TaskAtomValue = Task[];
export const internalTasksAtom = atom<TaskAtomValue>([]);

export const historyTaskAtom = atomWithDefault<TaskAtomValue[]>(get => [
  get(internalTasksAtom),
]);

export const saveHistoryAtom = atom(null, (get, set) => {
  const tasks = get(internalTasksAtom);
  set(historyTaskAtom, hs => [clone(tasks), ...hs]);
});

export const tasksAtom = atom(
  get => get(internalTasksAtom),
  (_, set, update: SetStateAction<TaskAtomValue>) => {
    set(saveHistoryAtom);
    set(internalTasksAtom, update);
  },
);
