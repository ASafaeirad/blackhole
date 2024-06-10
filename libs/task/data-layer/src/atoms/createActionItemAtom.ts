import { atom } from 'jotai';

import type { CreateActionItemDto } from '../firebase/ActionItemDto';
import { ActionItemSdk } from '../firebase/ActionItemSdk';
import { getRepeat } from '../models/ActionItem';
import { focusedIdAtom, newActionItemStateAtom } from '../useTaskListState';
import { actionItemsAtom } from './taskAtom';
import { closeAtom } from './taskMutation';

export const createActionItemAtom = atom(
  null,
  async (get, set, name: string) => {
    const actionItems = get(actionItemsAtom);

    const lastPendingActionItemIndex = actionItems.findLastIndex(
      t => t.status === 'pending',
    );

    const lastOrder = actionItems[lastPendingActionItemIndex]?.order ?? 0;

    const repeat = getRepeat(name);
    const actionItem: CreateActionItemDto = {
      type: repeat === 'once' ? 'task' : 'routine',
      name,
      repeat,
      status: 'pending',
      order: lastOrder + 1,
      experience: 1,
    };

    set(newActionItemStateAtom, {
      mode: 'creating',
      actionItem,
    });

    const sdk = new ActionItemSdk();
    const newActionItem = await sdk.add(actionItem);

    set(focusedIdAtom, newActionItem.id);
    set(closeAtom);
  },
);
