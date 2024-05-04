import { useSetAtom } from 'jotai';

import { createTaskAtom } from './atoms/createTaskAtom';
import {
  closeAtom,
  deleteTaskAtom,
  editTaskAtom,
  goToEditModeAtom,
  initiateTaskAtom,
  revertAtom,
  toggleDoneVisibilityAtom,
  toggleFocusAtom,
  undoAtom,
} from './atoms/taskMutation';
import { toggleDoneAtom } from './atoms/toggleDoneAtom';
import { moveDownAtom, moveUpAtom } from './useTaskListState';

export const useTaskDispatch = () => {
  const toggleDoneVisibility = useSetAtom(toggleDoneVisibilityAtom);
  const undo = useSetAtom(undoAtom);
  const moveUp = useSetAtom(moveUpAtom);
  const moveDown = useSetAtom(moveDownAtom);
  const createTask = useSetAtom(createTaskAtom);
  const close = useSetAtom(closeAtom);
  const deleteTask = useSetAtom(deleteTaskAtom);
  const revert = useSetAtom(revertAtom);
  const focus = useSetAtom(toggleFocusAtom);
  const toggle = useSetAtom(toggleDoneAtom);
  const initiateTask = useSetAtom(initiateTaskAtom);
  const editTask = useSetAtom(editTaskAtom);
  const goToEditMode = useSetAtom(goToEditModeAtom);

  return {
    toggleDoneVisibility,
    initiateTask,
    createTask,
    editTask,
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
