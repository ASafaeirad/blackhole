import { Mode, setModeAtom } from '@blackhole/keybinding-manager';
import {
  clamp,
  clone,
  isEmpty,
  isInRange,
  isLastIndex,
  randomInt,
} from '@fullstacksjs/toolbox';
import { atom } from 'jotai';
import { atomWithDefault, atomWithStorage } from 'jotai/utils';
import type { SetStateAction } from 'react';

import type { Task, TaskStatus } from './Task';

export type TaskAtomValue = Task[];

const internalTasksAtom = atomWithStorage<TaskAtomValue>('tasks', []);
const historyTaskAtom = atomWithDefault<TaskAtomValue[]>(get => [
  get(internalTasksAtom),
]);

const lastFocusedIndexAtom = atom(0);

const saveHistoryAtom = atom(null, (get, set) => {
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

export const focusedIndexAtom = atomWithStorage('focusedTask', 0);

export const doneTasksVisibilityAtom = atomWithStorage('visibility', true);

export const remainingTasksAtom = atom(get =>
  get(tasksAtom).filter(t => t.status !== 'done'),
);
export const visibleTasks = atom(get =>
  get(doneTasksVisibilityAtom) ? get(tasksAtom) : get(remainingTasksAtom),
);

export const fixIndexAtom = atom(null, (get, set) => {
  const focusedIndex = get(focusedIndexAtom);
  const tasks = get(visibleTasks);

  if (isInRange(focusedIndex, 0, tasks.length - 1)) return;
  set(focusedIndexAtom, clamp(focusedIndex, 0, tasks.length - 1));
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

export const editIndexAtom = atom(-1);

export const focusedTaskAtom = atom(
  get => get(tasksAtom)[get(focusedIndexAtom)],
);
export const editedTaskAtom = atom(get => get(tasksAtom)[get(editIndexAtom)]);

export const moveUpAtom = atom(null, (get, set) => {
  const task = get(focusedTaskAtom);
  const tasks = get(tasksAtom);
  const focusedIndex = get(focusedIndexAtom);

  if (focusedIndex === 0) return;
  if (task?.status !== tasks[focusedIndex - 1]?.status) return;

  set(tasksAtom, ps => {
    const newTasks = [...ps];
    newTasks[focusedIndex] = newTasks[focusedIndex - 1]!;
    newTasks[focusedIndex - 1] = task!;

    return newTasks;
  });
  set(focusedIndexAtom, focusedIndex - 1);
});

export const moveDownAtom = atom(null, (get, set) => {
  const task = get(focusedTaskAtom);
  const tasks = get(tasksAtom);
  const focusedIndex = get(focusedIndexAtom);

  if (isLastIndex(tasks, focusedIndex)) return;
  if (task?.status !== tasks[focusedIndex + 1]?.status) return;

  set(tasksAtom, ps => {
    const newTasks = [...ps];
    newTasks[focusedIndex] = newTasks[focusedIndex + 1]!;
    newTasks[focusedIndex + 1] = task!;

    return newTasks;
  });

  set(focusedIndexAtom, focusedIndex + 1);
});

export const toggleDoneVisibilityAtom = atom(null, (get, set) => {
  set(doneTasksVisibilityAtom, v => !v);

  if (get(focusedIndexAtom) >= get(visibleTasks).length) {
    set(focusedIndexAtom, get(visibleTasks).length - 1);
  }
});

export const changeStatusAtom = atom(
  null,
  (get, set, update: { id: string; status: TaskStatus }) => {
    set(tasksAtom, ps => {
      const newTasks = [...ps];
      const index = newTasks.find(t => t.id === update.id);
      if (index) index.status = update.status;
      newTasks.sort((a, b) => {
        if (a.status === 'focus') return -1;
        if (b.status === 'focus') return 1;
        if (a.status === 'done') return 1;
        if (b.status === 'done') return -1;
        return 0;
      });

      return newTasks;
    });
    const nextIndex = get(tasksAtom).findIndex(t => t.id === update.id);
    set(focusedIndexAtom, nextIndex);
  },
);

export const focusAtom = atom(null, (get, set) => {
  const focusedTask = get(focusedTaskAtom);
  const tasks = get(tasksAtom);
  if (!focusedTask) return;

  tasks.forEach(task => {
    if (task.status === 'focus')
      set(changeStatusAtom, { id: task.id, status: 'pending' });
    else if (focusedTask.id === task.id)
      set(changeStatusAtom, { id: task.id, status: 'focus' });
  });
});

export const isCreatingAtom = atom(false);

export const initiateTaskAtom = atom(null, (get, set) => {
  const focusedIndex = get(focusedIndexAtom);
  set(isCreatingAtom, true);
  set(focusedIndexAtom, -1);
  set(lastFocusedIndexAtom, focusedIndex);
  set(setModeAtom, Mode.Insert);
});

export const closeAtom = atom(null, (_, set) => {
  set(editIndexAtom, -1);
  set(isCreatingAtom, false);
  set(setModeAtom, Mode.Normal);
});

export const toggleAtom = atom(null, (get, set) => {
  const focusedTask = get(focusedTaskAtom);
  if (!focusedTask) return;

  set(changeStatusAtom, {
    id: focusedTask.id,
    status: focusedTask.status === 'done' ? 'pending' : 'done',
  });
});

export const deleteTaskAtom = atom(null, (get, set) => {
  const tasks = get(tasksAtom);
  const focusedIndex = get(focusedIndexAtom);
  const activeTask = get(focusedTaskAtom);
  if (!activeTask) return;
  const newTasks = tasks.filter(task => task !== activeTask);
  set(tasksAtom, newTasks);
  set(focusedIndexAtom, clamp(focusedIndex, 0, newTasks.length - 1));
});

export const revertAtom = atom(null, (get, set) => {
  set(focusedIndexAtom, get(lastFocusedIndexAtom));
  set(closeAtom);
});

export const createTaskAtom = atom(null, (get, set, update: string) => {
  const tasks = get(tasksAtom);
  const id = randomInt().toString();
  const task: Task = {
    id,
    name: update,
    status: 'pending',
    repeat: 'once',
    createdAt: Date.now(),
  };

  const lastPendingTaskIndex = tasks.findLastIndex(t => t.status === 'pending');

  set(tasksAtom, ps => [
    ...ps.slice(0, lastPendingTaskIndex + 1),
    task,
    ...ps.slice(lastPendingTaskIndex + 1),
  ]);
  set(focusedIndexAtom, lastPendingTaskIndex + 1);
  set(editIndexAtom, lastPendingTaskIndex + 1);
  set(closeAtom);
});

export const goToEditModeAtom = atom(null, (get, set) => {
  const focusedIndex = get(focusedIndexAtom);
  set(lastFocusedIndexAtom, focusedIndex);
  set(editIndexAtom, focusedIndex);
  set(setModeAtom, Mode.Insert);
});

export const editTaskAtom = atom(null, (_, set, task: Task) => {
  set(tasksAtom, ps => {
    const newTasks = [...ps];
    const index = newTasks.find(t => t.id === task.id);
    if (index) index.name = task.name;

    return newTasks;
  });
  set(closeAtom);
});
