import { atom } from 'jotai';

import { ActionItemFactory } from '../firebase/ActionItemFactory';
import { actionItemsAtom } from './actionItemAtom';
import { focusedActionItemAtom, focusedIdAtom } from './actionItemListAtom';

export const toggleDoneAtom = atom(null, async (get, set) => {
  const item = get(focusedActionItemAtom);
  if (!item) return;
  const sdk = ActionItemFactory.for(item);
  await sdk.toggle(item);

  const next = get(actionItemsAtom).find(t => t.id === item.id);
  set(focusedIdAtom, next?.id ?? '');
});
