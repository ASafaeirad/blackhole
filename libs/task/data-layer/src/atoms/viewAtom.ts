import type { Nullable } from '@fullstacksjs/toolbox';
import { atom } from 'jotai';

import { ViewSdk } from '../firebase/ViewSdk';
import type { SortBy, View } from '../models';

export const viewAtom = atom<Nullable<View>>(undefined);

export const setSortByAtom = atom(
  null,
  (get, set, sortBy: Nullable<SortBy>) => {
    const view = get(viewAtom);

    if (!view) return;

    const viewSdk = new ViewSdk();
    set(viewAtom, { ...view, sortBy });
    return viewSdk.update(view.id, { ...view, sortBy });
  },
);
