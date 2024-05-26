import { Mode, setModeAtom } from '@blackhole/keybinding-manager';
import { isEmpty } from '@fullstacksjs/toolbox';
import { atom } from 'jotai';

import { ActionItemSDK } from '../firebase/ActionItemSDK';
import type { ActionItem } from '../models/ActionItem';
import {
  editIdAtom,
  focusedActionItemAtom,
  focusedIdAtom,
  lastFocusedIdAtom,
  lastFocusedIndexAtom,
  newActionItemStateAtom,
  saveActionItemIndex,
} from '../useTaskListState';
import {
  doneActionItemsVisibilityAtom,
  visibleActionItemsAtom,
} from './filterAtom';
import {
  actionItemsAtom,
  historyActionItemAtom,
  internalActionItemsAtom,
} from './taskAtom';

export const toggleFocusAtom = atom(null, async get => {
  const focusedActionItem = get(focusedActionItemAtom);
  const actionItems = get(actionItemsAtom);
  if (!focusedActionItem) return;
  const currentActionItem = actionItems.find(t => t.status === 'focus');
  const sdk = new ActionItemSDK();

  if (currentActionItem)
    await sdk.update(currentActionItem.id, {
      status: 'pending',
    });

  if (currentActionItem !== focusedActionItem)
    await sdk.update(focusedActionItem.id, {
      status: 'focus',
    });
});

export const initiateActionItemAtom = atom(null, (get, set) => {
  const focusedId = get(focusedIdAtom);
  set(newActionItemStateAtom, { mode: 'draft' });
  set(focusedIdAtom, '');
  set(lastFocusedIdAtom, focusedId);
  set(setModeAtom, Mode.Insert);
});

export const closeAtom = atom(null, (_, set) => {
  set(editIdAtom, '');
  set(newActionItemStateAtom, undefined);
  set(setModeAtom, Mode.Normal);
});

export const revertAtom = atom(null, (get, set) => {
  set(focusedIdAtom, get(lastFocusedIdAtom));
  set(closeAtom);
});

export const fixIndexAtom = atom(null, (get, set) => {
  const focusedId = get(focusedIdAtom);
  const lastIndex = get(lastFocusedIndexAtom);

  const actionItems = get(actionItemsAtom);
  const focusedActionItem = get(visibleActionItemsAtom).find(
    t => t.id === focusedId,
  );

  if (focusedActionItem) return;
  const actionItemToFocus = actionItems[lastIndex - 1] ?? actionItems[0];
  set(focusedIdAtom, actionItemToFocus?.id ?? '');
});

export const deleteActionItemAtom = atom(null, async (get, set) => {
  const sdk = new ActionItemSDK();
  const activeActionItem = get(focusedActionItemAtom);
  if (!activeActionItem) return;
  set(saveActionItemIndex);

  await sdk.delete(activeActionItem.id);
  set(fixIndexAtom);
});

export const goToEditModeAtom = atom(null, (get, set) => {
  const focusedId = get(focusedIdAtom);
  set(lastFocusedIdAtom, focusedId);
  set(editIdAtom, focusedId);
  set(setModeAtom, Mode.Insert);
});

export const editActionItemAtom = atom(
  null,
  async (_, set, actionItem: ActionItem) => {
    const sdk = new ActionItemSDK();
    await sdk.update(actionItem.id, { name: actionItem.name });
    set(closeAtom);
  },
);

export const undoAtom = atom(
  get => !isEmpty(get(historyActionItemAtom)),
  (get, set) => {
    const history = get(historyActionItemAtom);
    if (isEmpty(history)) return;

    const [last, ...rest] = history;
    if (!last) return;

    set(internalActionItemsAtom, last);
    set(historyActionItemAtom, rest);
    set(fixIndexAtom);
  },
);

export const toggleDoneVisibilityAtom = atom(null, (get, set) => {
  set(doneActionItemsVisibilityAtom, v => !v);
  set(fixIndexAtom);
});
