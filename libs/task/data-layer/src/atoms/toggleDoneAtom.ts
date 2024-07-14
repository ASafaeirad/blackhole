import { atom } from 'jotai';

import { ActionItemFactory } from '../firebase/ActionItemFactory';
import type { ActionItem } from '../models';

export const toggleDoneAtom = atom(null, async (get, set, item: ActionItem) => {
  const sdk = ActionItemFactory.for(item);
  await sdk.toggle(item);
});
