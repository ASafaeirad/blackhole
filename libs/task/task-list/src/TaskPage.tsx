import { Actions } from '@blackhole/actions';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { callAll, clamp, isEmpty, randomInt } from '@fullstacksjs/toolbox';
import { useState } from 'react';

import type { Task } from './components/Task';
import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';

export const useTask = () => {
  const [tasks, setTask] = useState<Task[]>([
    { id: '1', name: 'Task 1', status: 'done' },
    { id: '2', name: 'Task 2', status: 'pending' },
    { id: '3', name: 'Task 3', status: 'pending' },
  ]);

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

  const changeStatus = (id: string, status: Task['status']) => {
    setTask(ps => {
      const newTasks = [...ps];
      const index = newTasks.find(t => t.id === id);
      if (index) index.status = status;

      return newTasks;
    });
  };

  return { tasks, createTask, editTask, changeStatus } as const;
};

export const TaskPage = () => {
  const { tasks, createTask, editTask, changeStatus } = useTask();
  const [index, setIndex] = useState(0);
  const [editIndex, setEditIndex] = useState(-1);
  const setMode = useSetMode();

  useSubscribeAction(
    Actions.CreateTask,
    () => {
      const id = randomInt().toString();
      createTask({ id, name: '', status: 'pending' });
      setIndex(tasks.length);
      setEditIndex(tasks.length);
      setMode(Mode.Insert);
    },
    [tasks],
  );

  const close = () => {
    setEditIndex(-1);
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

  return (
    <div className="p-4">
      <h1 className="text-title">Tasks</h1>
      {isEmpty(tasks) ? (
        <TaskEmptyState />
      ) : (
        <TaskList
          onToggle={(i, status) => changeStatus(tasks[i].id, status)}
          onSubmit={callAll(editTask, close)}
          onCancel={close}
          editIndex={editIndex}
          activeIndex={index}
          tasks={tasks}
        />
      )}
    </div>
  );
};
