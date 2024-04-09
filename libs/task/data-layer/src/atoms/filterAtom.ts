import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { tasksAtom } from './taskAtom';

export const doneTasksVisibilityAtom = atomWithStorage('visibility', true);

export const remainingTasksAtom = atom(get =>
  get(tasksAtom).filter(t => t.status !== 'done'),
);

export const visibleTasksAtom = atom(get =>
  get(doneTasksVisibilityAtom) ? get(tasksAtom) : get(remainingTasksAtom),
);
