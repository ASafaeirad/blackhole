import { clone } from '@fullstacksjs/toolbox';
import type { SetStateAction } from 'jotai';
import { atom } from 'jotai';
import { atomWithDefault } from 'jotai/utils';

import type { ActionItem } from '../models/ActionItem';

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
  get => get(internalActionItemsAtom),
  (_, set, update: SetStateAction<ActionItemAtomValue>) => {
    set(saveHistoryAtom);
    set(internalActionItemsAtom, update);
  },
);
