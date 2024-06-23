import { useCurrentUser } from '@blackhole/auth/data-layer';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { actionItemsAtom } from './atoms/taskAtom';
import { newActionItemStateAtom } from './atoms/taskListAtom';
import { ActionItemSdk } from './firebase/ActionItemSdk';

export function useSubscribeActionItems() {
  const user = useCurrentUser();
  const setActionItems = useSetAtom(actionItemsAtom);
  const setActionItemState = useSetAtom(newActionItemStateAtom);

  useEffect(() => {
    if (!user) return;
    const sdk = new ActionItemSdk();
    return sdk.subscribe(items => {
      setActionItemState(undefined);
      setActionItems(items);
    });
  }, [setActionItemState, setActionItems, user]);
}
