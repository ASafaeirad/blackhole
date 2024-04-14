import { isLastIndex } from '@fullstacksjs/toolbox';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { visibleTasksAtom } from './atoms/filterAtom';
import { tasksAtom } from './atoms/taskAtom';
import { taskCollection } from './firebase/taskCollection';
import type { Task } from './models/Task';

export const focusedIdAtom = atomWithStorage('focusedTask', '');
export const lastFocusedIdAtom = atom('');
export const lastFocusedIndexAtom = atom(0);

export const focusNextAtom = atom(null, (get, set) => {
  const activeTaskId = get(focusedIdAtom);
  const tasks = get(visibleTasksAtom);
  const nextIndex = tasks.findIndex(t => t.id === activeTaskId) + 1;
  const nextTask = tasks[nextIndex];
  if (!nextTask?.status) return;

  set(focusedIdAtom, nextTask.id);
});

export const focusPrevAtom = atom(null, (get, set) => {
  const activeTaskId = get(focusedIdAtom);
  const tasks = get(visibleTasksAtom);
  const prevIndex = tasks.findIndex(t => t.id === activeTaskId) - 1;
  const prevTask = tasks[prevIndex];
  if (!prevTask) return;

  set(focusedIdAtom, prevTask.id);
});

export const focusLastAtomAtom = atom(null, (get, set) => {
  const tasks = get(visibleTasksAtom);
  set(focusedIdAtom, tasks.at(-1)?.id ?? '');
});

export const focusFirstAtom = atom(null, (get, set) => {
  const tasks = get(visibleTasksAtom);
  set(focusedIdAtom, tasks[0]?.id ?? '');
});

export const focusedTaskAtom = atom(get =>
  get(tasksAtom).find(t => t.id === get(focusedIdAtom)),
);

export const focusedIndexAtom = atom(get =>
  get(tasksAtom).findIndex(t => t.id === get(focusedIdAtom)),
);

export const saveTaskIndex = atom(null, (get, set) =>
  set(lastFocusedIndexAtom, get(focusedIndexAtom)),
);

export const moveUpAtom = atom(null, async get => {
  const task = get(focusedTaskAtom);
  const tasks = get(tasksAtom);
  const focusedIndex = get(focusedIndexAtom);

  if (focusedIndex === 0) return;
  const prevTask = tasks[focusedIndex - 1];

  if (!task || !prevTask) return;
  if (task.status !== prevTask.status) return;

  await taskCollection.swap(task, prevTask);
});

export const moveDownAtom = atom(null, async get => {
  const task = get(focusedTaskAtom);
  const tasks = get(tasksAtom);
  const focusedIndex = get(focusedIndexAtom);

  if (isLastIndex(tasks, focusedIndex)) return;
  const nextTask = tasks[focusedIndex + 1];

  if (!task || !nextTask) return;
  if (task.status !== nextTask.status) return;

  await taskCollection.swap(task, nextTask);
});

export const editIdAtom = atom('');
export const editedTaskAtom = atom(get =>
  get(tasksAtom).find(t => t.id === get(editIdAtom)),
);
export const newTaskStateAtom = atom<
  | { mode: 'creating'; task: Pick<Task, 'name' | 'repeat'> }
  | { mode: 'draft' }
  | undefined
>(undefined);

export const useTaskListState = () => {
  const [newTaskState] = useAtom(newTaskStateAtom);
  const [editedTask] = useAtom(editedTaskAtom);
  const [activeTask] = useAtom(focusedTaskAtom);

  return { newTaskState, editedTask, activeTask } as const;
};

export const useActiveIndex = () => {
  const [activeIndex] = useAtom(focusedIndexAtom);
  const [activeId] = useAtom(focusedIdAtom);

  const focusNext = useSetAtom(focusNextAtom);
  const focusPrev = useSetAtom(focusPrevAtom);
  const focusLast = useSetAtom(focusLastAtomAtom);
  const focusFirst = useSetAtom(focusFirstAtom);

  return {
    activeIndex,
    activeId,
    focusNext,
    focusPrev,
    focusLast,
    focusFirst,
  } as const;
};
