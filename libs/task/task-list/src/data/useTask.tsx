import { clamp } from '@fullstacksjs/toolbox';
import { useAtom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import type { Task, TaskStatus } from '../Task';

export const tasksAtom = atomWithStorage<Task[]>('tasks', []);
export const focusedTaskAtom = atomWithStorage<number>('focusedTask', 0);

export const useTask = () => {
  const [tasks, setTask] = useAtom(tasksAtom);
  const setFocusedTask = useSetAtom(focusedTaskAtom);

  const createTask = (task: Task) => {
    setTask(ps => [...ps, task]);
    setFocusedTask(tasks.length);
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

  const deleteTask = (id: string) => {
    setTask(ps => ps.filter(t => t.id !== id));
    setFocusedTask(i => clamp(i, 0, tasks.length - 2));
  };

  return { tasks, createTask, editTask, changeStatus, deleteTask } as const;
};

export const useActiveIndex = () => {
  const [activeIndex, setIndex] = useAtom(focusedTaskAtom);
  const [tasks] = useAtom(tasksAtom);
  const focusNext = () => setIndex(i => clamp(i + 1, 0, tasks.length - 1));
  const focusPrev = () => setIndex(i => clamp(i - 1, 0, tasks.length - 1));

  return { activeIndex, setIndex, focusNext, focusPrev } as const;
};
