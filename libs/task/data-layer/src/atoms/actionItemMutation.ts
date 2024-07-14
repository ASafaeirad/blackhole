import { toFirebaseTimestamp } from '@blackhole/firebase';
import { Mode, setModeAtom } from '@blackhole/keybinding-manager';
import { assertNotNull, isEmpty } from '@fullstacksjs/toolbox';
import { atom } from 'jotai';

import { ActionItemSdk } from '../firebase/ActionItemSdk';
import { ViewSdk } from '../firebase/ViewSdk';
import type { ActionItem, Filter } from '../models';
import { hasRemaining } from '../models';
import {
  actionItemsAtom,
  historyActionItemAtom,
  internalActionItemsAtom,
} from './actionItemAtom';
import {
  editIdAtom,
  lastFocusedIdAtom,
  newActionItemStateAtom,
  selectedActionItemIdAtom,
} from './actionItemListAtom';
import { viewAtom } from './viewAtom';

export const toggleFocusAtom = atom(
  null,
  async (get, set, item: ActionItem) => {
    const actionItems = get(actionItemsAtom);
    const currentActionItem = actionItems.find(t => t.status === 'focus');
    const sdk = new ActionItemSdk();

    if (currentActionItem)
      await sdk.update(currentActionItem.id, {
        status: 'pending',
      });

    if (currentActionItem !== item)
      await sdk.update(item.id, {
        status: 'focus',
      });
  },
);

export const setDueDateAtom = atom(null, async (get, _, date: Date) => {
  const sdk = new ActionItemSdk();
  const item = get(selectedActionItemIdAtom);

  return sdk.update(item, { dueDate: toFirebaseTimestamp(date) });
});

export const initiateActionItemAtom = atom(null, (get, set) => {
  set(newActionItemStateAtom, { mode: 'draft' });
  set(setModeAtom, Mode.Insert);
});

export const closeAtom = atom(null, (_, set) => {
  set(editIdAtom, '');
  set(newActionItemStateAtom, undefined);
  set(setModeAtom, Mode.Normal);
});

export const revertAtom = atom(null, (get, set) => {
  set(closeAtom);
});

export const goToEditModeAtom = atom(null, (get, set, id: string) => {
  set(lastFocusedIdAtom, id);
  set(editIdAtom, id);
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
  },
);

export const toggleDoneVisibilityAtom = atom(null, async (get, set) => {
  const sdk = new ViewSdk();
  const view = get(viewAtom);
  assertNotNull(view, 'View not found');

  const isVisible = hasRemaining(view.filters);
  const newFilter: Filter[] = isVisible
    ? view.filters.filter(f => f !== 'remaining')
    : [...view.filters, 'remaining'];

  await sdk.update(view.id, { filters: newFilter });
  set(viewAtom, { ...view, filters: newFilter });
});
