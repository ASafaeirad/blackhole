import { atom } from 'jotai';

import { hasRemaining } from '../models/Filter';
import { actionItemsAtom } from './actionItemAtom';
import { viewAtom } from './viewAtom';

export const filterAtom = atom('');
export const filterModeAtom = atom(false);

export const visibleActionItemsAtom = atom(get => {
  const filter = get(filterAtom);

  const actionItems = get(actionItemsAtom);

  if (!filter) return actionItems;

  return actionItems.filter(t =>
    t.name.toLowerCase().includes(filter.toLowerCase()),
  );
});

export const hasHiddenItemAtom = atom(get => {
  const view = get(viewAtom);
  return hasRemaining(view?.filters);
});
