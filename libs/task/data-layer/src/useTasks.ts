import { useAtom } from 'jotai';

import { visibleTasksAtom } from './atoms/filterAtom';
import { tasksAtom } from './atoms/taskAtom';

export const useTasks = () => {
  const [tasks] = useAtom(visibleTasksAtom);
  return tasks;
};

export const useAllTasks = () => {
  const [tasks] = useAtom(tasksAtom);
  return tasks;
};
