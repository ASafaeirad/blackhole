import { useAtom } from 'jotai';

import { hasHiddenItemAtom, visibleActionItemsAtom } from './atoms/filterAtom';
import { actionItemsAtom } from './atoms/taskAtom';

export const useActionItems = () => {
  const [actionItems] = useAtom(visibleActionItemsAtom);
  return actionItems;
};

export const useAllActionItems = () => {
  const [actionItems] = useAtom(actionItemsAtom);
  return actionItems;
};

export const useHasHiddenItems = () => {
  const [hasHiddenItem] = useAtom(hasHiddenItemAtom);
  return hasHiddenItem;
};
