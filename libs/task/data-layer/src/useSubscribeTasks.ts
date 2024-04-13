import { useCurrentUser } from '@blackhole/auth/data-layer';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { tasksAtom } from './atoms/taskAtom';
import { taskCollection } from './firebase/taskCollection';

export const useSubscribeTasks = () => {
  const user = useCurrentUser();
  const setTasks = useSetAtom(tasksAtom);

  useEffect(() => {
    if (!user) return;
    return taskCollection.subscribe(tasks => {
      setTasks(tasks);
    });
  }, [setTasks, user]);
};
