import { clone } from '@fullstacksjs/toolbox';
import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

import type { ActionItem } from '../models/ActionItem';
import { sortActionItems } from '../models/ActionItem';
import { sortByAtom } from './sortByAtom';

export type ActionItemAtomValue = ActionItem[];
export const internalActionItemsAtom = atom<ActionItemAtomValue>([]);

export const historyActionItemAtom = atomWithDefault<ActionItemAtomValue[]>(
  get => [get(internalActionItemsAtom)],
);

export const saveHistoryAtom = atom(null, (get, set) => {
  const actionItems = get(internalActionItemsAtom);
  set(historyActionItemAtom, hs => [clone(actionItems), ...hs]);
});

export const actionItemsAtom = atom(
  get => {
    const items = get(internalActionItemsAtom);
    const sortBy = get(sortByAtom) ?? 'status';
    return sortActionItems(items, sortBy);
  },
  (_, set, update: ActionItemAtomValue) => {
    set(saveHistoryAtom);
    set(internalActionItemsAtom, update);
  },
);
