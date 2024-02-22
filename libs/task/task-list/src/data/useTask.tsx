import { clamp, randomInt } from '@fullstacksjs/toolbox';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import type { Task, TaskStatus } from '../Task';

export const tasksAtom = atomWithStorage<Task[]>('tasks', []);
export const focusedTaskAtom = atomWithStorage('focusedTask', 0);
export const editIndexAtom = atom(-1);

export const useTask = () => {
  const [tasks, setTask] = useAtom(tasksAtom);
  const [focusedIndex, setFocusedTask] = useAtom(focusedTaskAtom);
  const setEditIndex = useSetAtom(editIndexAtom);

  const createTask = () => {
    const id = randomInt().toString();
    const task: Task = { id, name: '', status: 'pending' };
    setTask(ps => [...ps, task]);
    setFocusedTask(tasks.length);
    setEditIndex(tasks.length);
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

      return newTasks;
    });
  };

  const deleteTask = () => {
    const id = tasks[focusedIndex].id;
    setTask(ps => ps.filter(t => t.id !== id));
    setFocusedTask(i => clamp(i, 0, tasks.length - 2));
  };

  const revert = () => {
    const task = tasks[focusedIndex];
    if (!task.name) deleteTask();
  };

  const moveUp = () => {
    const task = tasks[focusedIndex];
    if (focusedIndex === 0) return;
    setTask(ps => {
      const newTasks = [...ps];
      newTasks[focusedIndex] = newTasks[focusedIndex - 1];
      newTasks[focusedIndex - 1] = task;

      return newTasks;
    });
    setFocusedTask(focusedIndex - 1);
  };

  const moveDown = () => {
    const task = tasks[focusedIndex];
    if (focusedIndex === tasks.length - 1) return;
    setTask(ps => {
      const newTasks = [...ps];
      newTasks[focusedIndex] = newTasks[focusedIndex + 1];
      newTasks[focusedIndex + 1] = task;

      return newTasks;
    });
    setFocusedTask(focusedIndex + 1);
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
  } as const;
};

export const useActiveIndex = () => {
  const [activeIndex, setIndex] = useAtom(focusedTaskAtom);
  const [tasks] = useAtom(tasksAtom);
  const focusNext = () => setIndex(i => clamp(i + 1, 0, tasks.length - 1));
  const focusPrev = () => setIndex(i => clamp(i - 1, 0, tasks.length - 1));

  return { activeIndex, setIndex, focusNext, focusPrev } as const;
};
