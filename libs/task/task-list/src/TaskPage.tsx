import { Actions } from '@blackhole/actions';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { callAll, isEmpty } from '@fullstacksjs/toolbox';
import { useAtom } from 'jotai';

import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';
import { editIndexAtom, useActiveIndex, useTask } from './data/useTask';

export const TaskPage = () => {
  const {
    tasks,
    createTask,
    editTask,
    changeStatus,
    deleteTask,
    revert,
    moveDown,
    moveUp,
  } = useTask();
  const { activeIndex, focusNext, focusPrev } = useActiveIndex();
  const [editIndex, setEditIndex] = useAtom(editIndexAtom);
  const setMode = useSetMode();

  const close = () => {
    setEditIndex(-1);
    setMode(Mode.Normal);
  };

  useSubscribeAction(
    Actions.CreateTask,
    () => {
      createTask();
      setMode(Mode.Insert);
    },
    [tasks],
  );
  useSubscribeAction(Actions.DeleteTask, deleteTask, [activeIndex, tasks]);
  useSubscribeAction(Actions.MoveNextBlock, focusNext, [tasks.length]);
  useSubscribeAction(Actions.MovePrevBlock, focusPrev, [tasks.length]);
  useSubscribeAction(Actions.MoveDown, moveDown, [tasks, activeIndex]);
  useSubscribeAction(Actions.MoveUp, moveUp, [tasks, activeIndex]);

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
