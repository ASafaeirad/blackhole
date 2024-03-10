import { clamp } from '@fullstacksjs/toolbox';
import { useAtom, useSetAtom } from 'jotai';

import {
  changeStatusAtom,
  closeAtom,
  createTaskAtom,
  deleteTaskAtom,
  editTaskAtom,
  focusAtom,
  focusedIndexAtom,
  goToEditModeAtom,
  initiateTaskAtom,
  moveDownAtom,
  moveUpAtom,
  revertAtom,
  toggleAtom,
  toggleDoneVisibilityAtom,
  undoAtom,
  visibleTasks,
} from './taskAtom';

export const useTasks = () => {
  const [tasks] = useAtom(visibleTasks);
  return tasks;
};

export const useTaskDispatch = () => {
  const toggleDoneVisibility = useSetAtom(toggleDoneVisibilityAtom);
  const undo = useSetAtom(undoAtom);
  const moveUp = useSetAtom(moveUpAtom);
  const moveDown = useSetAtom(moveDownAtom);
  const createTask = useSetAtom(createTaskAtom);
  const close = useSetAtom(closeAtom);
  const deleteTask = useSetAtom(deleteTaskAtom);
  const revert = useSetAtom(revertAtom);
  const changeStatus = useSetAtom(changeStatusAtom);
  const focus = useSetAtom(focusAtom);
  const toggle = useSetAtom(toggleAtom);
  const initiateTask = useSetAtom(initiateTaskAtom);
  const editTask = useSetAtom(editTaskAtom);
  const goToEditMode = useSetAtom(goToEditModeAtom);

  return {
    toggleDoneVisibility,
    initiateTask,
    createTask,
    editTask,
    changeStatus,
    deleteTask,
    revert,
    moveDown,
    moveUp,
    focus,
    toggle,
    close,
    goToEditMode,
    undo,
  } as const;
};

export const useActiveIndex = () => {
  const [activeIndex, setIndex] = useAtom(focusedIndexAtom);
  const [tasks] = useAtom(visibleTasks);

  const focusNext = () => setIndex(i => clamp(i + 1, 0, tasks.length - 1));
  const focusPrev = () => setIndex(i => clamp(i - 1, 0, tasks.length - 1));
  const focusLast = () => setIndex(tasks.length - 1);
  const focusFirst = () => setIndex(0);

  return {
    activeIndex,
    setIndex,
    focusNext,
    focusPrev,
    focusLast,
    focusFirst,
  } as const;
};
