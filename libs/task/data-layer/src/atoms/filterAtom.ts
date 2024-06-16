import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { actionItemsAtom } from './taskAtom';

export const doneActionItemsVisibilityAtom = atomWithStorage(
  'visibility',
  true,
);

export const remainingActionItemsAtom = atom(get =>
  get(actionItemsAtom).filter(t => t.status !== 'done'),
);

export const filterAtom = atom('');
export const filterModeAtom = atom(false);

export const visibleActionItemsAtom = atom(get => {
  const filter = get(filterAtom);

  const actionItems = get(doneActionItemsVisibilityAtom)
    ? get(actionItemsAtom)
    : get(remainingActionItemsAtom);

  if (!filter) return actionItems;

  return actionItems.filter(t =>
    t.name.toLowerCase().includes(filter.toLowerCase()),
  );
});

export const hasHiddenItemAtom = atom(get => {
  const actionItems = get(actionItemsAtom);
  const visibleActionItems = get(visibleActionItemsAtom);
  return actionItems.length !== visibleActionItems.length;
});
