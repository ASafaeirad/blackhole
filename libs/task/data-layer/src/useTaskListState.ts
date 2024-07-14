import { useAtom } from 'jotai';

import {
  editedActionItemAtom,
  newActionItemStateAtom,
  selectedActionItemAtom,
} from './atoms/actionItemListAtom';
import {
  confirmDeleteActionItemIdAtom,
  isDeletingAtom,
} from './atoms/deleteActionItemAtom';

export const useActionItemListState = () => {
  const [newActionItemState] = useAtom(newActionItemStateAtom);
  const [editedActionItem] = useAtom(editedActionItemAtom);
  const [activeActionItem] = useAtom(selectedActionItemAtom);
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
