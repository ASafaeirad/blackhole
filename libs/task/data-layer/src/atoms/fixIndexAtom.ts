import { atom } from 'jotai';

import { actionItemsAtom } from './actionItemAtom';
import { focusedIdAtom, lastFocusedIndexAtom } from './actionItemListAtom';
import { visibleActionItemsAtom } from './filterAtom';

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
