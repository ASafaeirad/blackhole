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

export const visibleActionItemsAtom = atom(get =>
  get(doneActionItemsVisibilityAtom)
    ? get(actionItemsAtom)
    : get(remainingActionItemsAtom),
);
