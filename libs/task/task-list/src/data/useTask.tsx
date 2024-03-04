import { Mode, useSetMode } from '@blackhole/keybinding-manager';
import { clamp, randomInt } from '@fullstacksjs/toolbox';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import type { Task, TaskStatus } from './Task';

export const tasksAtom = atomWithStorage<Task[]>('tasks', []);
export const focusedTaskAtom = atomWithStorage('focusedTask', 0);
export const editIndexAtom = atom(-1);
export const activeTaskAtom = atom(get => get(tasksAtom)[get(focusedTaskAtom)]);
export const doneTasksAtom = atom(get =>
  get(tasksAtom).filter(t => t.status === 'done'),
);
export const pendingTasksAtom = atom(get =>
  get(tasksAtom).filter(t => t.status === 'pending'),
);
export const focusTasksAtom = atom(get =>
  get(tasksAtom).filter(t => t.status === 'focus'),
);
export const editTaskAtom = atom(get => get(tasksAtom)[get(editIndexAtom)]);

export const useTask = () => {
  const [tasks, setTask] = useAtom(tasksAtom);
  const [focusedIndex, setFocusedTask] = useAtom(focusedTaskAtom);
  const setEditIndex = useSetAtom(editIndexAtom);
  const setMode = useSetMode();

  const close = () => {
    setEditIndex(-1);
    setMode(Mode.Normal);
  };

  const createTask = () => {
    const id = randomInt().toString();
    const task: Task = { id, name: '', status: 'pending', repeat: 'once' };
    const lastPendingTaskIndex = tasks.findLastIndex(
      t => t.status === 'pending',
    );
    setTask(ps => [
      ...ps.slice(0, lastPendingTaskIndex + 1),
      task,
      ...ps.slice(lastPendingTaskIndex + 1),
    ]);
    setFocusedTask(lastPendingTaskIndex + 1);
    setEditIndex(lastPendingTaskIndex + 1);
    setMode(Mode.Insert);
  };

  const edit = () => {
    setEditIndex(focusedIndex);
    setMode(Mode.Insert);
  };

  const editTask = (task: Task) => {
    setTask(ps => {
      const newTasks = [...ps];
      const index = newTasks.find(t => t.id === task.id);
      if (index) index.name = task.name;

      return newTasks;
    });
  };

  const changeStatus = (id: string, status: TaskStatus) => {
    setTask(ps => {
      const newTasks = [...ps];
      const index = newTasks.find(t => t.id === id);
      if (index) index.status = status;
      newTasks.sort((a, b) => {
        if (a.status === 'focus') return -1;
        if (b.status === 'focus') return 1;
        if (a.status === 'done') return 1;
        if (b.status === 'done') return -1;
        return 0;
      });

      const nextIndex = newTasks.findIndex(t => t.id === id);
      setFocusedTask(nextIndex);
      return newTasks;
    });
  };

  const deleteTask = () => {
    const id = tasks[focusedIndex]?.id;
    if (!id) return;
    setTask(ps => ps.filter(t => t.id !== id));
    setFocusedTask(i => clamp(i, 0, tasks.length - 2));
  };

  const revert = () => {
    const task = tasks[focusedIndex];
    if (!task?.name) deleteTask();
    close();
  };

  const moveUp = () => {
    const task = tasks[focusedIndex];
    if (focusedIndex === 0) return;
    if (task?.status !== tasks[focusedIndex - 1]?.status) return;

    setTask(ps => {
      const newTasks = [...ps];
      newTasks[focusedIndex] = newTasks[focusedIndex - 1]!;
      newTasks[focusedIndex - 1] = task!;

      return newTasks;
    });
    setFocusedTask(focusedIndex - 1);
  };

  const moveDown = () => {
    const task = tasks[focusedIndex];
    if (focusedIndex === tasks.length - 1) return;
    if (task?.status !== tasks[focusedIndex + 1]?.status) return;
    setTask(ps => {
      const newTasks = [...ps];
      newTasks[focusedIndex] = newTasks[focusedIndex + 1]!;
      newTasks[focusedIndex + 1] = task!;

      return newTasks;
    });
    setFocusedTask(focusedIndex + 1);
  };

  const focus = () => {
    const activeTask = tasks[focusedIndex];
    if (!activeTask) return;

    tasks.forEach(task => {
      if (task.status === 'focus') changeStatus(task.id, 'pending');
      else if (activeTask.id === task.id) changeStatus(task.id, 'focus');
    });
  };

  const toggle = () => {
    const activeTask = tasks[focusedIndex];
    if (!activeTask) return;

    changeStatus(
      activeTask.id,
      activeTask.status === 'done' ? 'pending' : 'done',
    );
  };

  return {
    tasks,
    createTask,
    editTask,
    changeStatus,
    deleteTask,
    revert,
    moveDown,
    moveUp,
    focus,
    toggle,
    close,
    edit,
  } as const;
};

export const useActiveIndex = () => {
  const [activeIndex, setIndex] = useAtom(focusedTaskAtom);
  const [tasks] = useAtom(tasksAtom);
  const focusNext = () => setIndex(i => clamp(i + 1, 0, tasks.length - 1));
  const focusPrev = () => setIndex(i => clamp(i - 1, 0, tasks.length - 1));
  const focusLast = () => setIndex(tasks.length - 1);
  const focusFirst = () => setIndex(0);

  return {
    activeIndex,
    setIndex,
    focusNext,
    focusPrev,
    focusLast,
    focusFirst,
  } as const;
};
