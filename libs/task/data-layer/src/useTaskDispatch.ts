import { useSetAtom } from 'jotai';

import { createActionItemAtom } from './atoms/createTaskAtom';
import { openLinksAtom } from './atoms/openLinksAtom';
import {
  closeAtom,
  deleteActionItemAtom,
  editActionItemAtom,
  goToEditModeAtom,
  initiateActionItemAtom,
  revertAtom,
  toggleDoneVisibilityAtom,
  toggleFocusAtom,
  undoAtom,
} from './atoms/taskMutation';
import { toggleDoneAtom } from './atoms/toggleDoneAtom';
import { moveDownAtom, moveUpAtom } from './useTaskListState';

export const useActionItemDispatch = () => {
  const toggleDoneVisibility = useSetAtom(toggleDoneVisibilityAtom);
  const undo = useSetAtom(undoAtom);
  const moveUp = useSetAtom(moveUpAtom);
  const moveDown = useSetAtom(moveDownAtom);
  const createActionItem = useSetAtom(createActionItemAtom);
  const close = useSetAtom(closeAtom);
  const deleteActionItem = useSetAtom(deleteActionItemAtom);
  const revert = useSetAtom(revertAtom);
  const focus = useSetAtom(toggleFocusAtom);
  const toggle = useSetAtom(toggleDoneAtom);
  const initiateActionItem = useSetAtom(initiateActionItemAtom);
  const editActionItem = useSetAtom(editActionItemAtom);
  const goToEditMode = useSetAtom(goToEditModeAtom);
  const openLinks = useSetAtom(openLinksAtom);

  return {
    toggleDoneVisibility,
    initiateActionItem,
    createActionItem,
    editActionItem,
    deleteActionItem,
    revert,
    moveDown,
    moveUp,
    focus,
    toggle,
    close,
    goToEditMode,
    undo,
    openLinks,
  } as const;
};
