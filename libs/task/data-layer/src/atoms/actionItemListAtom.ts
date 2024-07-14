import { isLastIndex } from '@fullstacksjs/toolbox';
import { atom } from 'jotai';

import { ActionItemSdk } from '../firebase/ActionItemSdk';
import type { ActionItem } from '../models';
import { actionItemsAtom } from './actionItemAtom';

export const selectedActionItemIdAtom = atom('');

export const selectedActionItemAtom = atom(get =>
  get(actionItemsAtom).find(t => t.id === get(selectedActionItemIdAtom)),
);

export const lastFocusedIdAtom = atom('');

export const moveUpAtom = atom(null, async (get, _, actionItem: ActionItem) => {
  const actionItems = get(actionItemsAtom);
  const focusedIndex = actionItems.findIndex(t => t.id === actionItem.id);

  if (focusedIndex === 0) return;
  const prevActionItem = actionItems[focusedIndex - 1];

  if (!prevActionItem) return;
  if (actionItem.status !== prevActionItem.status) return;
  const sdk = new ActionItemSdk();

  await sdk.swap(actionItem, prevActionItem, order => order - 0.5);
});

export const moveToFirstAtom = atom(
  null,
  async (get, set, actionItem: ActionItem) => {
    const actionItems = get(actionItemsAtom);

    const firstActionItem = actionItems.find(
      item => item.status === actionItem.status,
    );

    if (firstActionItem === actionItem) return;
    if (!firstActionItem) return;
    if (actionItem.status !== firstActionItem.status) return;
    const sdk = new ActionItemSdk();

    await sdk.changeOrder(actionItem, firstActionItem.order - 0.1);
  },
);

export const moveToLastAtom = atom(
  null,
  async (get, set, actionItem: ActionItem) => {
    const actionItems = get(actionItemsAtom);

    const lastActionItem = actionItems.findLast(
      item => item.status === actionItem.status,
    );

    if (lastActionItem === actionItem) return;

    if (!lastActionItem) return;
    if (actionItem.status !== lastActionItem.status) return;
    const sdk = new ActionItemSdk();

    await sdk.changeOrder(actionItem, lastActionItem.order + 0.1);
  },
);

export const moveDownAtom = atom(
  null,
  async (get, _, actionItem: ActionItem) => {
    const actionItems = get(actionItemsAtom);
    const focusedIndex = actionItems.findIndex(t => t.id === actionItem.id);

    if (isLastIndex(actionItems, focusedIndex)) return;
    const nextActionItem = actionItems[focusedIndex + 1];

    if (!nextActionItem) return;
    if (actionItem.status !== nextActionItem.status) return;
    const sdk = new ActionItemSdk();

    await sdk.swap(actionItem, nextActionItem, order => order + 0.5);
  },
);

export const editIdAtom = atom('');
export const editedActionItemAtom = atom(get =>
  get(actionItemsAtom).find(t => t.id === get(editIdAtom)),
);
export const newActionItemStateAtom = atom<
  | { mode: 'creating'; actionItem: Pick<ActionItem, 'name' | 'type'> }
  | { mode: 'draft' }
  | undefined
>(undefined);
