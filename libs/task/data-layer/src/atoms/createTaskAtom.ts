import { atom } from 'jotai';

import type { CreateTaskDto } from '../firebase/taskCollection';
import { taskCollection } from '../firebase/taskCollection';
import { getRepeat } from '../models/Task';
import { focusedIdAtom, newTaskStateAtom } from '../useTaskListState';
import { tasksAtom } from './taskAtom';
import { closeAtom } from './taskMutation';

export const createTaskAtom = atom(null, async (get, set, update: string) => {
  const tasks = get(tasksAtom);

  const lastPendingTaskIndex = tasks.findLastIndex(t => t.status === 'pending');

  const lastOrder = tasks[lastPendingTaskIndex]?.order ?? 0;

  const taskToCreate: CreateTaskDto = {
    name: update,
    repeat: getRepeat(update),
    status: 'pending',
    order: lastOrder + 1,
  };

  set(newTaskStateAtom, {
    mode: 'creating',
    task: taskToCreate,
  });

  const newTask = await taskCollection.add(taskToCreate);

  set(focusedIdAtom, newTask.id);
  set(closeAtom);
});
