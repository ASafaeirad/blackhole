import { Actions } from '@blackhole/actions';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { callAll, clamp, isEmpty } from '@fullstacksjs/toolbox';
import { useState } from 'react';

import { CreateTaskDialog } from './components/CreateTaskDialog';
import { TaskEmptyState } from './components/TaskEmptyState';
import type { Task } from './components/TaskList';
import { TaskList } from './components/TaskList';

export const useTask = () => {
  const [tasks, setTask] = useState<Task[]>([]);

  const createTask = (task: Task) => {
    setTask(ps => [...ps, task]);
  };

  return [tasks, createTask] as const;
};

export const TaskPage = () => {
  const [tasks, createTask] = useTask();
  const [isOpen, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const setMode = useSetMode();

  useSubscribeAction(Actions.CreateTask, () => {
    setOpen(true);
    setMode(Mode.Insert);
  });

  const close = () => {
    setOpen(false);
    setMode(Mode.Normal);
  };

  useSubscribeAction(
    Actions.MoveNextBlock,
    () => {
      setIndex(i => clamp(i + 1, 0, tasks.length - 1));
    },
    [tasks.length],
  );

  useSubscribeAction(
    Actions.MovePrevBlock,
    () => {
      setIndex(i => clamp(i - 1, 0, tasks.length - 1));
    },
    [tasks.length],
  );

  const focusLast = () => {
    setIndex(tasks.length);
  };

  return (
    <>
      {isEmpty(tasks) && !isOpen ? (
        <TaskEmptyState />
      ) : (
        <TaskList activeIndex={index} tasks={tasks} />
      )}
      {isOpen && (
        <CreateTaskDialog
          open={isOpen}
          onSubmit={callAll(createTask, close, focusLast)}
          onCancel={close}
        />
      )}
    </>
  );
};
