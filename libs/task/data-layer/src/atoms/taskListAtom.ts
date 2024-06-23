import { isLastIndex } from '@fullstacksjs/toolbox';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { ActionItemSdk } from '../firebase/ActionItemSdk';
import type { ActionItem } from '../models';
import { visibleActionItemsAtom } from './filterAtom';
import { actionItemsAtom } from './taskAtom';

export const focusedIdAtom = atomWithStorage('focusedActionItem', '');

export const focusedIndexAtom = atom(get =>
  get(actionItemsAtom).findIndex(t => t.id === get(focusedIdAtom)),
);

export const lastFocusedIndexAtom = atom(0);

export const focusedActionItemAtom = atom(get =>
  get(actionItemsAtom).find(t => t.id === get(focusedIdAtom)),
);

export const saveActionItemIndex = atom(null, (get, set) =>
  set(lastFocusedIndexAtom, get(focusedIndexAtom)),
);

export const lastFocusedIdAtom = atom('');

export const focusNextAtom = atom(null, (get, set) => {
  const activeActionItemId = get(focusedIdAtom);
  const actionItems = get(visibleActionItemsAtom);
  const nextIndex = actionItems.findIndex(t => t.id === activeActionItemId) + 1;
  const newActionItem = actionItems[nextIndex];
  if (!newActionItem?.status) return;

  set(focusedIdAtom, newActionItem.id);
});

export const focusPrevAtom = atom(null, (get, set) => {
  const activeActionItemId = get(focusedIdAtom);
  const actionItems = get(visibleActionItemsAtom);
  const prevIndex = actionItems.findIndex(t => t.id === activeActionItemId) - 1;
  const prevActionItem = actionItems[prevIndex];
  if (!prevActionItem) return;

  set(focusedIdAtom, prevActionItem.id);
});

export const focusLastAtomAtom = atom(null, (get, set) => {
  const actionItems = get(visibleActionItemsAtom);
  set(focusedIdAtom, actionItems.at(-1)?.id ?? '');
});

export const focusFirstAtom = atom(null, (get, set) => {
  const actionItems = get(visibleActionItemsAtom);
  set(focusedIdAtom, actionItems[0]?.id ?? '');
});

export const moveUpAtom = atom(null, async get => {
  const actionItem = get(focusedActionItemAtom);
  const actionItems = get(actionItemsAtom);
  const focusedIndex = get(focusedIndexAtom);

  if (focusedIndex === 0) return;
  const prevActionItem = actionItems[focusedIndex - 1];

  if (!actionItem || !prevActionItem) return;
  if (actionItem.status !== prevActionItem.status) return;
  const sdk = new ActionItemSdk();

  await sdk.swap(actionItem, prevActionItem, order => order - 0.5);
});

export const moveToFirstAtom = atom(null, async get => {
  const actionItem = get(focusedActionItemAtom);
  const actionItems = get(actionItemsAtom);

  if (!actionItem) return;
  const firstActionItem = actionItems.find(
    item => item.status === actionItem.status,
  );

  if (firstActionItem === actionItem) return;
  if (!firstActionItem) return;
  if (actionItem.status !== firstActionItem.status) return;
  const sdk = new ActionItemSdk();

  await sdk.changeOrder(actionItem, firstActionItem.order - 0.1);
});

export const moveToLastAtom = atom(null, async get => {
  const actionItem = get(focusedActionItemAtom);
  const actionItems = get(actionItemsAtom);

  if (!actionItem) return;
  const lastActionItem = actionItems.findLast(
    item => item.status === actionItem.status,
  );

  if (lastActionItem === actionItem) return;

  if (!lastActionItem) return;
  if (actionItem.status !== lastActionItem.status) return;
  const sdk = new ActionItemSdk();

  await sdk.changeOrder(actionItem, lastActionItem.order + 0.1);
});

export const moveDownAtom = atom(null, async get => {
  const actionItem = get(focusedActionItemAtom);
  const actionItems = get(actionItemsAtom);
  const focusedIndex = get(focusedIndexAtom);

  if (isLastIndex(actionItems, focusedIndex)) return;
  const nextActionItem = actionItems[focusedIndex + 1];

  if (!actionItem || !nextActionItem) return;
  if (actionItem.status !== nextActionItem.status) return;
  const sdk = new ActionItemSdk();

  await sdk.swap(actionItem, nextActionItem, order => order + 0.5);
});

export const editIdAtom = atom('');
export const editedActionItemAtom = atom(get =>
  get(actionItemsAtom).find(t => t.id === get(editIdAtom)),
);
export const newActionItemStateAtom = atom<
  | { mode: 'creating'; actionItem: Pick<ActionItem, 'name' | 'type'> }
  | { mode: 'draft' }
  | undefined
>(undefined);
