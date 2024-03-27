import { Actions } from '@blackhole/actions';
import { Heading } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
  useSubscribeActionOnMode,
} from '@blackhole/keybinding-manager';
import { isEmpty } from '@fullstacksjs/toolbox';
import { useAtom } from 'jotai';
import { useState } from 'react';

import { SelectProjectDialog } from './components/SelectProjectDialog';
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
  const setMode = useSetMode();
  const { activeIndex, focusNext, focusPrev, focusFirst, focusLast } =
    useActiveIndex();

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
