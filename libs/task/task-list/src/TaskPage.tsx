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
  const { newTaskState, activeTask } = useTaskListState();
  const setMode = useSetMode();
  const { focusNext, focusPrev, focusFirst, focusLast, activeId } =
    useActiveIndex();

  useSubscribeTasks();
  useSubscribeAction(
    Actions.Open,
    () => {
      const links = (activeTask?.nodes.filter(n => n.type === 'link') ??
        []) as LinkNode[];
      links.forEach(link => window.open(link.href, '_blank'));
    },
    [tasks, activeId],
  );
  useSubscribeAction(Actions.CreateTask, initiateTask, [tasks]);
  useSubscribeAction(Actions.Insert, goToEditMode, [tasks, activeId]);
  useSubscribeAction(Actions.GoToEditMode, goToEditMode, [activeId, tasks]);
  useSubscribeAction(Actions.DeleteTask, deleteTask, [activeId, tasks]);
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
  useSubscribeAction(Actions.MoveDown, moveDown, [tasks, activeId]);
  useSubscribeAction(Actions.MoveUp, moveUp, [tasks, activeId]);
  useSubscribeAction(Actions.Toggle, toggle, [tasks, activeId]);
  useSubscribeAction(Actions.Focus, focus, [tasks, activeId]);
  useSubscribeAction(Actions.GoToNormalMode, revert, [tasks, activeId]);
  useSubscribeAction(Actions.ToggleDoneVisibility, toggleDoneVisibility, []);
  useSubscribeAction(Actions.Undo, undo, []);

  const [open, setOpen] = useState(false);

  useSubscribeAction(Actions.ShowSelectProject, () => {
    setOpen(true);
    setMode(Mode.Overlay);
  });

  const close = () => {
    setOpen(false);
  };

  return (
    <div className="fc gap-8 h-full overflow-auto">
      <Heading className="layout text-large">Tasks</Heading>
      {isEmpty(tasks) && !newTaskState ? <TaskEmptyState /> : <TaskList />}
      {open ? <SelectProjectDialog onClose={close} /> : null}
    </div>
  );
};
