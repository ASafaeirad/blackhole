import { Actions } from '@blackhole/actions';
import { Heading } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import { callAll, isEmpty } from '@fullstacksjs/toolbox';

import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';
import { useActiveIndex, useTask } from './data/useTask';

export const TaskPage = () => {
  const {
    tasks,
    createTask,
    deleteTask,
    revert,
    moveDown,
    moveUp,
    focus,
    toggle,
    edit,
    editTask,
    close,
    toggleDoneVisibility,
  } = useTask();
  const { activeIndex, focusNext, focusPrev, focusFirst, focusLast } =
    useActiveIndex();

  useSubscribeAction(Actions.CreateTask, createTask, [tasks]);
  useSubscribeAction(Actions.GoToEditMode, edit, [activeIndex, tasks]);
  useSubscribeAction(Actions.DeleteTask, deleteTask, [activeIndex, tasks]);
  useSubscribeAction(Actions.MoveNextBlock, focusNext, [tasks.length]);
  useSubscribeAction(Actions.MovePrevBlock, focusPrev, [tasks.length]);
  useSubscribeAction(Actions.MoveToLastBlock, focusLast, [tasks.length]);
  useSubscribeAction(Actions.MoveToFirstBlock, focusFirst, [tasks.length]);
  useSubscribeAction(Actions.MoveDown, moveDown, [tasks, activeIndex]);
  useSubscribeAction(Actions.MoveUp, moveUp, [tasks, activeIndex]);
  useSubscribeAction(Actions.Toggle, toggle, [tasks, activeIndex]);
  useSubscribeAction(Actions.Focus, focus, [tasks, activeIndex]);
  useSubscribeAction(Actions.GoToNormalMode, revert, [tasks, activeIndex]);
  useSubscribeAction(Actions.ToggleDoneVisibility, toggleDoneVisibility, []);

  return (
    <div className="fc gap-8 h-full">
      <Heading className="text-large">Tasks</Heading>
      {isEmpty(tasks) ? (
        <TaskEmptyState />
      ) : (
        <TaskList onSubmit={callAll(editTask, close)} key={1} tasks={tasks} />
      )}
    </div>
  );
};
