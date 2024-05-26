import { isLastIndex } from '@fullstacksjs/toolbox';
import { atom, useAtom, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { visibleActionItemsAtom } from './atoms/filterAtom';
import { actionItemsAtom } from './atoms/taskAtom';
import { ActionItemSDK } from './firebase/ActionItemSDK';
import type { ActionItem } from './models/ActionItem';

export const focusedIdAtom = atomWithStorage('focusedActionItem', '');
export const lastFocusedIdAtom = atom('');
export const lastFocusedIndexAtom = atom(0);

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

export const focusedActionItemAtom = atom(get =>
  get(actionItemsAtom).find(t => t.id === get(focusedIdAtom)),
);

export const focusedIndexAtom = atom(get =>
  get(actionItemsAtom).findIndex(t => t.id === get(focusedIdAtom)),
);

export const saveActionItemIndex = atom(null, (get, set) =>
  set(lastFocusedIndexAtom, get(focusedIndexAtom)),
);

export const moveUpAtom = atom(null, async get => {
  const actionItem = get(focusedActionItemAtom);
  const actionItems = get(actionItemsAtom);
  const focusedIndex = get(focusedIndexAtom);

  if (focusedIndex === 0) return;
  const prevActionItem = actionItems[focusedIndex - 1];

  if (!actionItem || !prevActionItem) return;
  if (actionItem.status !== prevActionItem.status) return;
  const sdk = new ActionItemSDK();

  await sdk.swap(actionItem, prevActionItem, order => order - 0.5);
});

export const moveDownAtom = atom(null, async get => {
  const actionItem = get(focusedActionItemAtom);
  const actionItems = get(actionItemsAtom);
  const focusedIndex = get(focusedIndexAtom);

  if (isLastIndex(actionItems, focusedIndex)) return;
  const nextActionItem = actionItems[focusedIndex + 1];

  if (!actionItem || !nextActionItem) return;
  if (actionItem.status !== nextActionItem.status) return;
  const sdk = new ActionItemSDK();

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

export const useActionItemListState = () => {
  const [newActionItemState] = useAtom(newActionItemStateAtom);
  const [editedActionItem] = useAtom(editedActionItemAtom);
  const [activeActionItem] = useAtom(focusedActionItemAtom);

  return {
    newActionItemState,
    editedActionItem,
    activeActionItem,
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
