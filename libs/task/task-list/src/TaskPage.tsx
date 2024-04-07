import { Actions } from '@blackhole/actions';
import { Heading } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
  useSubscribeActionOnMode,
} from '@blackhole/keybinding-manager';
import type { LinkNode } from '@blackhole/task/data-layer';
import {
  useActiveIndex,
  useSubscribeTasks,
  useTaskDispatch,
  useTaskListState,
  useTasks,
} from '@blackhole/task/data-layer';
import { isEmpty } from '@fullstacksjs/toolbox';
import { useState } from 'react';

import { SelectProjectDialog } from './components/SelectProjectDialog';
import { TaskEmptyState } from './components/TaskEmptyState';
import { TaskList } from './components/TaskList';

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
  const { isCreating } = useTaskListState();
  const setMode = useSetMode();
  const { activeIndex, focusNext, focusPrev, focusFirst, focusLast } =
    useActiveIndex();

  useSubscribeTasks();
  useSubscribeAction(
    Actions.Open,
    () => {
      const links = (tasks[activeIndex]?.nodes.filter(n => n.type === 'link') ??
        []) as LinkNode[];
      links.forEach(link => window.open(link.href, '_blank'));
    },
    [tasks, activeIndex],
  );
  useSubscribeAction(Actions.CreateTask, initiateTask, [tasks]);
  useSubscribeAction(Actions.Insert, goToEditMode, [tasks, activeIndex]);
  useSubscribeAction(Actions.GoToEditMode, goToEditMode, [activeIndex, tasks]);
  useSubscribeAction(Actions.DeleteTask, deleteTask, [activeIndex, tasks]);
  useSubscribeActionOnMode(Actions.MoveNextBlock, Mode.Normal, focusNext, [
    tasks.length,
  ]);
  useSubscribeActionOnMode(Actions.MovePrevBlock, Mode.Normal, focusPrev, [
    tasks.length,
  ]);
  useSubscribeActionOnMode(Actions.MoveToLastBlock, Mode.Normal, focusLast, [
    tasks.length,
  ]);
  useSubscribeActionOnMode(Actions.MoveToFirstBlock, Mode.Normal, focusFirst, [
    tasks.length,
  ]);
  useSubscribeAction(Actions.MoveDown, moveDown, [tasks, activeIndex]);
  useSubscribeAction(Actions.MoveUp, moveUp, [tasks, activeIndex]);
  useSubscribeAction(Actions.Toggle, toggle, [tasks, activeIndex]);
  useSubscribeAction(Actions.Focus, focus, [tasks, activeIndex]);
  useSubscribeAction(Actions.GoToNormalMode, revert, [tasks, activeIndex]);
  useSubscribeAction(Actions.ToggleDoneVisibility, toggleDoneVisibility, []);
  useSubscribeAction(Actions.Undo, undo, []);

  const [open, setOpen] = useState(false);

  useSubscribeAction(Actions.ShowSelectProject, () => {
    setOpen(true);
    setMode(Mode.Overlay);
  });

  return (
    <div className="fc gap-8 h-full">
      <Heading className="text-large">Tasks</Heading>
      {isEmpty(tasks) && !isCreating ? <TaskEmptyState /> : <TaskList />}
      {open ? (
        <SelectProjectDialog
          onClose={() => {
            setOpen(false);
          }}
        />
      ) : null}
    </div>
  );
};
