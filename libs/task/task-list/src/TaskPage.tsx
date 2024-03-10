import { Actions } from '@blackhole/actions';
import { Heading } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import { isEmpty } from '@fullstacksjs/toolbox';
import { useAtom } from 'jotai';

import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';
import { isCreatingAtom } from './data/taskAtom';
import { useActiveIndex, useTaskDispatch, useTasks } from './data/useTask';

export const TaskPage = () => {
  const {
    deleteTask,
    revert,
    moveDown,
    moveUp,
    focus,
    toggle,
    goToEditMode,
    toggleDoneVisibility,
    undo,
    initiateTask,
  } = useTaskDispatch();
  const tasks = useTasks();
  const [isCreating] = useAtom(isCreatingAtom);
  const { activeIndex, focusNext, focusPrev, focusFirst, focusLast } =
    useActiveIndex();

  useSubscribeAction(Actions.CreateTask, initiateTask, [tasks]);
  useSubscribeAction(Actions.GoToEditMode, goToEditMode, [activeIndex, tasks]);
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
  useSubscribeAction(Actions.Undo, undo, []);

  return (
    <div className="fc gap-8 h-full">
      <Heading className="text-large">Tasks</Heading>
      {isEmpty(tasks) && !isCreating ? <TaskEmptyState /> : <TaskList />}
    </div>
  );
};
