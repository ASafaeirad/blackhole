import { Actions } from '@blackhole/actions';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { callAll, clamp, isEmpty, randomInt } from '@fullstacksjs/toolbox';
import { useState } from 'react';

import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';
import { useTask } from './data/useTask';
import type { Task } from './Task';

export const TaskPage = () => {
  const { tasks, createTask, editTask, changeStatus, deleteTask } = useTask();
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

  useSubscribeAction(
    Actions.DeleteTask,
    () => {
      deleteTask(tasks[index].id);
      setIndex(i => clamp(i, 0, tasks.length - 2));
    },
    [index, tasks],
  );

  const close = () => {
    setEditIndex(-1);
    setMode(Mode.Normal);
  };

  const revert = (task: Task) => {
    if (!task.name) deleteTask(task.id);
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
    <div className="fc p-8 gap-4">
      <h1 className="text-title">Tasks</h1>
      {isEmpty(tasks) ? (
        <TaskEmptyState />
      ) : (
        <TaskList
          onToggle={(i, status) => changeStatus(tasks[i].id, status)}
          onSubmit={callAll(editTask, close)}
          onCancel={callAll(revert, close)}
          editIndex={editIndex}
          activeIndex={index}
          tasks={tasks}
        />
      )}
    </div>
  );
};
