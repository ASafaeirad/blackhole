import { useAtom, useSetAtom } from 'jotai';

import { setSortByAtom, viewAtom } from './atoms/viewAtom';

export const useSetSortBy = () => {
  return useSetAtom(setSortByAtom);
};

export const useView = () => {
  return useAtom(viewAtom)[0];
};
