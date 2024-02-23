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
import type { Task } from './Task';

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
  const activeTask: Task | undefined = tasks[activeIndex];

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

  useSubscribeAction(
    Actions.Toggle,
    () => {
      changeStatus(
        activeTask.id,
        activeTask.status === 'done' ? 'pending' : 'done',
      );
    },
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    [activeTask?.id],
  );

  useSubscribeAction(
    Actions.GoToNormalMode,
    () => {
      revert();
      close();
    },
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    [activeTask?.id],
  );

  return (
    <div className="fc p-8 gap-4">
      <h1 className="text-title">Tasks</h1>
      {isEmpty(tasks) ? (
        <TaskEmptyState />
      ) : (
        <TaskList
          onSubmit={callAll(editTask, close)}
          editIndex={editIndex}
          activeIndex={activeIndex}
          tasks={tasks}
        />
      )}
    </div>
  );
};
