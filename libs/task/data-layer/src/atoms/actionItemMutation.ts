import { toFirebaseTimestamp } from '@blackhole/firebase';
import { Mode, setModeAtom } from '@blackhole/keybinding-manager';
import { isEmpty } from '@fullstacksjs/toolbox';
import { atom } from 'jotai';

import { ActionItemSdk } from '../firebase/ActionItemSdk';
import type { ActionItem } from '../models/ActionItem';
import {
  actionItemsAtom,
  historyActionItemAtom,
  internalActionItemsAtom,
} from './actionItemAtom';
import {
  editIdAtom,
  focusedActionItemAtom,
  focusedIdAtom,
  lastFocusedIdAtom,
  newActionItemStateAtom,
} from './actionItemListAtom';
import { doneActionItemsVisibilityAtom } from './filterAtom';
import { fixIndexAtom } from './fixIndexAtom';

export const toggleFocusAtom = atom(null, async get => {
  const focusedActionItem = get(focusedActionItemAtom);
  const actionItems = get(actionItemsAtom);
  if (!focusedActionItem) return;
  const currentActionItem = actionItems.find(t => t.status === 'focus');
  const sdk = new ActionItemSdk();

  if (currentActionItem)
    await sdk.update(currentActionItem.id, {
      status: 'pending',
    });

  if (currentActionItem !== focusedActionItem)
    await sdk.update(focusedActionItem.id, {
      status: 'focus',
    });
});

export const setDueDateAtom = atom(null, async (get, _, date: Date) => {
  const sdk = new ActionItemSdk();
  const item = get(focusedIdAtom);

  return sdk.update(item, { dueDate: toFirebaseTimestamp(date) });
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

export const goToEditModeAtom = atom(null, (get, set) => {
  const focusedId = get(focusedIdAtom);
  set(lastFocusedIdAtom, focusedId);
  set(editIdAtom, focusedId);
  set(setModeAtom, Mode.Insert);
});

export const editActionItemAtom = atom(
  null,
  async (_, set, actionItem: ActionItem) => {
    const sdk = new ActionItemSdk();
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
