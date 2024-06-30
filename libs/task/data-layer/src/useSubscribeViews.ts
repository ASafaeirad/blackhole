import { useCurrentUser } from '@blackhole/auth/data-layer';
import { debug } from '@blackhole/debug';
import { useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { viewAtom } from './atoms/viewAtom';
import { ViewSdk } from './firebase/ViewSdk';

export function useSubscribeView() {
  const user = useCurrentUser();
  const setView = useSetAtom(viewAtom);

  useEffect(() => {
    if (!user?.id) return;
    const sdk = new ViewSdk();

    // return sdk.subscribe(items => {
    //   setView(items[0] ?? defaultView);
    // });
    sdk
      .getDefaultView()
      .then(view => {
        setView(view);
      })
      .catch(debug.error);
  }, [setView, user?.id]);
}
