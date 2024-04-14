import { useCurrentUser } from '@blackhole/auth/data-layer';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { tasksAtom } from './atoms/taskAtom';
import { taskCollection } from './firebase/taskCollection';
import { newTaskStateAtom } from './useTaskListState';

export const useSubscribeTasks = () => {
  const user = useCurrentUser();
  const setTasks = useSetAtom(tasksAtom);
  const setTaskState = useSetAtom(newTaskStateAtom);

  useEffect(() => {
    if (!user) return;
    return taskCollection.subscribe(tasks => {
      setTaskState(undefined);
      setTasks(tasks);
    });
  }, [setTaskState, setTasks, user]);
};
