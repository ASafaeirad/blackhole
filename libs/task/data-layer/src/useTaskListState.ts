import { useAtom, useSetAtom } from 'jotai';

import {
  confirmDeleteActionItemIdAtom,
  isDeletingAtom,
} from './atoms/deleteActionItemAtom';
import {
  editedActionItemAtom,
  focusedActionItemAtom,
  focusedIdAtom,
  focusedIndexAtom,
  focusFirstAtom,
  focusLastAtomAtom,
  focusNextAtom,
  focusPrevAtom,
  newActionItemStateAtom,
} from './atoms/taskListAtom';

export const useActionItemListState = () => {
  const [newActionItemState] = useAtom(newActionItemStateAtom);
  const [editedActionItem] = useAtom(editedActionItemAtom);
  const [activeActionItem] = useAtom(focusedActionItemAtom);
  const [confirmDeleteActionItemId] = useAtom(confirmDeleteActionItemIdAtom);

  const [isDeleting] = useAtom(isDeletingAtom);
  return {
    newActionItemState,
    editedActionItem,
    activeActionItem,
    confirmDeleteActionItemId,
    isDeleting,
  } as const;
};

export const useActiveIndex = () => {
  const [activeIndex] = useAtom(focusedIndexAtom);
  const [activeId] = useAtom(focusedIdAtom);

  const focusNext = useSetAtom(focusNextAtom);
  const focusPrev = useSetAtom(focusPrevAtom);
  const focusLast = useSetAtom(focusLastAtomAtom);
  const focusFirst = useSetAtom(focusFirstAtom);

  return {
    activeIndex,
    activeId,
    focusNext,
    focusPrev,
    focusLast,
    focusFirst,
  } as const;
};
