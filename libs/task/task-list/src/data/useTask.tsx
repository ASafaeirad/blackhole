import { atom, useAtom } from 'jotai';

import type { Task, TaskStatus } from '../Task';

export const tasksAtom = atom<Task[]>([]);

export const useTask = () => {
  const [tasks, setTask] = useAtom(tasksAtom);

  const createTask = (task: Task) => {
    setTask(ps => [...ps, task]);
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
  };

  return { tasks, createTask, editTask, changeStatus, deleteTask } as const;
};
