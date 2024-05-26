import { useAtom } from 'jotai';

import { visibleActionItemsAtom } from './atoms/filterAtom';
import { actionItemsAtom } from './atoms/taskAtom';

export const useActionItems = () => {
  const [actionItems] = useAtom(visibleActionItemsAtom);
  return actionItems;
};

export const useAllActionItems = () => {
  const [actionItems] = useAtom(actionItemsAtom);
  return actionItems;
};
