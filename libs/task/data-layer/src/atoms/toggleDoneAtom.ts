import { atom } from 'jotai';

import { taskCollection } from '../firebase/taskCollection';
import type { Task } from '../models/Task';
import { focusedIdAtom, focusedTaskAtom } from '../useTaskListState';
import { tasksAtom } from './taskAtom';

export const toggleDoneAtom = atom(null, async (get, set) => {
  const focusedTask = get(focusedTaskAtom);
  if (!focusedTask) return;
  const update: Partial<Task> =
    focusedTask.status === 'done'
      ? {
          status: 'pending',
          streak: focusedTask.streak - 1,
        }
      : {
          status: 'done',
          streak: focusedTask.streak + 1,
        };

  await taskCollection.update(focusedTask.id, update);

  const next = get(tasksAtom).find(t => t.id === focusedTask.id);
  set(focusedIdAtom, next?.id ?? '');
});
