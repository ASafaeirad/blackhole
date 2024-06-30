import { useCurrentUser } from '@blackhole/auth/data-layer';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { actionItemsAtom } from './atoms/actionItemAtom';
import { newActionItemStateAtom } from './atoms/actionItemListAtom';
import { ActionItemSdk } from './firebase/ActionItemSdk';
import { defaultView } from './models/View';
import { useView } from './useView';

export function useSubscribeActionItems() {
  const user = useCurrentUser();
  const setActionItems = useSetAtom(actionItemsAtom);
  const setActionItemState = useSetAtom(newActionItemStateAtom);
  const view = useView();

  useEffect(() => {
    if (!user) return;
    const sdk = new ActionItemSdk();
    const filters = view?.filters ?? defaultView.filters;
    return sdk.subscribe(items => {
      setActionItemState(undefined);
      setActionItems(items);
    }, filters);
  }, [setActionItemState, setActionItems, user, view?.filters]);
}
