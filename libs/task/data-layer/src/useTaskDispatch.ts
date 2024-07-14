import { useSetAtom } from 'jotai';

import {
  moveDownAtom,
  moveToFirstAtom,
  moveToLastAtom,
  moveUpAtom,
  selectedActionItemIdAtom,
} from './atoms/actionItemListAtom';
import {
  closeAtom,
  editActionItemAtom,
  goToEditModeAtom,
  initiateActionItemAtom,
  revertAtom,
  setDueDateAtom,
  toggleDoneVisibilityAtom,
  toggleFocusAtom,
  undoAtom,
} from './atoms/actionItemMutation';
import { createActionItemAtom } from './atoms/createActionItemAtom';
import {
  deleteActionItemAtom,
  discardDeletingAtom,
  showDeleteActionItemDialogAtom,
} from './atoms/deleteActionItemAtom';
import { filterAtom, filterModeAtom } from './atoms/filterAtom';
import { openLinksAtom } from './atoms/openLinksAtom';
import { toggleDoneAtom } from './atoms/toggleDoneAtom';

export const useActionItemDispatch = () => {
  const toggleDoneVisibility = useSetAtom(toggleDoneVisibilityAtom);
  const undo = useSetAtom(undoAtom);
  const moveUp = useSetAtom(moveUpAtom);
  const moveDown = useSetAtom(moveDownAtom);
  const moveToLast = useSetAtom(moveToLastAtom);
  const moveToFirst = useSetAtom(moveToFirstAtom);
  const createActionItem = useSetAtom(createActionItemAtom);
  const close = useSetAtom(closeAtom);
  const deleteActionItem = useSetAtom(deleteActionItemAtom);
  const showDeleteActionItemDialog = useSetAtom(showDeleteActionItemDialogAtom);
  const revert = useSetAtom(revertAtom);
  const focus = useSetAtom(toggleFocusAtom);
  const toggle = useSetAtom(toggleDoneAtom);
  const initiateActionItem = useSetAtom(initiateActionItemAtom);
  const editActionItem = useSetAtom(editActionItemAtom);
  const goToEditMode = useSetAtom(goToEditModeAtom);
  const openLinks = useSetAtom(openLinksAtom);
  const setFilter = useSetAtom(filterAtom);
  const setFilterMode = useSetAtom(filterModeAtom);
  const discardDeleting = useSetAtom(discardDeletingAtom);
  const setDueDate = useSetAtom(setDueDateAtom);
  const selectedActionItem = useSetAtom(selectedActionItemIdAtom);

  return {
    toggleDoneVisibility,
    initiateActionItem,
    createActionItem,
    editActionItem,
    deleteActionItem,
    revert,
    moveDown,
    moveUp,
    moveToFirst,
    moveToLast,
    focus,
    toggle,
    close,
    goToEditMode,
    undo,
    openLinks,
    setFilter,
    setFilterMode,
    discardDeleting,
    setDueDate,
    showDeleteActionItemDialog,
    selectedActionItem,
  } as const;
};
