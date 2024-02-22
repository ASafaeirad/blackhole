import { Actions } from '@blackhole/actions';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { callAll, isEmpty, randomInt } from '@fullstacksjs/toolbox';
import { useState } from 'react';

import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';
import { useActiveIndex, useTask } from './data/useTask';
import type { Task } from './Task';

export const TaskPage = () => {
  const { tasks, createTask, editTask, changeStatus, deleteTask } = useTask();
  const { activeIndex, focusNext, focusPrev } = useActiveIndex();
  const [editIndex, setEditIndex] = useState(-1);
  const setMode = useSetMode();

  const close = () => {
    setEditIndex(-1);
    setMode(Mode.Normal);
  };

  const revert = (task: Task) => {
    if (!task.name) deleteTask(task.id);
  };

  useSubscribeAction(
    Actions.CreateTask,
    () => {
      const id = randomInt().toString();
      createTask({ id, name: '', status: 'pending' });
      setEditIndex(tasks.length);
      setMode(Mode.Insert);
    },
    [tasks],
  );

  useSubscribeAction(
    Actions.DeleteTask,
    () => deleteTask(tasks[activeIndex].id),
    [activeIndex, tasks],
  );

  useSubscribeAction(Actions.MoveNextBlock, focusNext, [tasks.length]);
  useSubscribeAction(Actions.MovePrevBlock, focusPrev, [tasks.length]);

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
          activeIndex={activeIndex}
          tasks={tasks}
        />
      )}
    </div>
  );
};
