import { atom } from 'jotai';

import { visibleActionItemsAtom } from './filterAtom';
import { actionItemsAtom } from './taskAtom';
import { focusedIdAtom, lastFocusedIndexAtom } from './taskListAtom';

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
