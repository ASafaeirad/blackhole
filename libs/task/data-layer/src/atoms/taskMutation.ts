import { Mode, setModeAtom } from '@blackhole/keybinding-manager';
import { isEmpty } from '@fullstacksjs/toolbox';
import { atom } from 'jotai';

import { taskCollection } from '../firebase/taskCollection';
import type { Task } from '../models/Task';
import {
  editIdAtom,
  focusedIdAtom,
  focusedTaskAtom,
  isCreatingAtom,
  lastFocusedIdAtom,
} from '../useTaskListState';
import { doneTasksVisibilityAtom, visibleTasksAtom } from './filterAtom';
import { historyTaskAtom, internalTasksAtom, tasksAtom } from './taskAtom';

export const toggleFocusAtom = atom(null, async get => {
  const focusedTask = get(focusedTaskAtom);
  const tasks = get(tasksAtom);
  if (!focusedTask) return;
  const currentTask = tasks.find(t => t.status === 'focus');

  if (currentTask)
    await taskCollection.update(currentTask.id, { status: 'pending' });

  if (currentTask !== focusedTask)
    await taskCollection.update(focusedTask.id, { status: 'focus' });
});

export const initiateTaskAtom = atom(null, (get, set) => {
  const focusedId = get(focusedIdAtom);
  set(isCreatingAtom, true);
  set(focusedIdAtom, '');
  set(lastFocusedIdAtom, focusedId);
  set(setModeAtom, Mode.Insert);
});

export const closeAtom = atom(null, (_, set) => {
  set(editIdAtom, '');
  set(isCreatingAtom, false);
  set(setModeAtom, Mode.Normal);
});

export const revertAtom = atom(null, (get, set) => {
  set(focusedIdAtom, get(lastFocusedIdAtom));
  set(closeAtom);
});

export const fixIndexAtom = atom(null, (get, set) => {
  const focusedId = get(focusedIdAtom);
  const tasks = get(tasksAtom);
  const focusedTask = get(visibleTasksAtom).find(t => t.id === focusedId);

  if (focusedTask) return;
  set(focusedIdAtom, tasks[0]?.id ?? '');
});

export const toggleAtom = atom(null, async (get, set) => {
  const focusedTask = get(focusedTaskAtom);
  if (!focusedTask) return;

  await taskCollection.update(focusedTask.id, {
    status: focusedTask.status === 'done' ? 'pending' : 'done',
  });

  const next = get(tasksAtom).find(t => t.id === focusedTask.id);
  set(focusedIdAtom, next?.id ?? '');
});

export const deleteTaskAtom = atom(null, async (get, set) => {
  const activeTask = get(focusedTaskAtom);
  if (!activeTask) return;
  await taskCollection.delete(activeTask.id);
  set(fixIndexAtom);
});

export const createTaskAtom = atom(null, async (get, set, update: string) => {
  const tasks = get(tasksAtom);

  const lastPendingTaskIndex = tasks.findLastIndex(t => t.status === 'pending');
  console.log('lastPendingTaskIndex', lastPendingTaskIndex);

  const lastOrder = tasks[lastPendingTaskIndex]?.order ?? 0;

  const newTask = await taskCollection.add({
    name: update,
    repeat: 'once',
    status: 'pending',
    order: lastOrder + 1,
  });

  set(focusedIdAtom, newTask.id);
  set(editIdAtom, '');
  set(closeAtom);
});

export const goToEditModeAtom = atom(null, (get, set) => {
  const focusedId = get(focusedIdAtom);
  set(lastFocusedIdAtom, focusedId);
  set(editIdAtom, focusedId);
  set(setModeAtom, Mode.Insert);
});

export const editTaskAtom = atom(null, async (_, set, task: Task) => {
  await taskCollection.update(task.id, { name: task.name });
  set(closeAtom);
});

export const undoAtom = atom(
  get => !isEmpty(get(historyTaskAtom)),
  (get, set) => {
    const history = get(historyTaskAtom);
    if (isEmpty(history)) return;

    const [last, ...rest] = history;
    if (!last) return;

    set(internalTasksAtom, last);
    set(historyTaskAtom, rest);
    set(fixIndexAtom);
  },
);

export const toggleDoneVisibilityAtom = atom(null, (get, set) => {
  set(doneTasksVisibilityAtom, v => !v);
  set(fixIndexAtom);
});
