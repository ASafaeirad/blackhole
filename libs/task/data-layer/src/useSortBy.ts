import { useAtom, useSetAtom } from 'jotai';

import { sortByAtom } from './atoms/sortByAtom';

export const useSortBy = () => {
  const [sortBy] = useAtom(sortByAtom);
  return sortBy;
};

export const useSetSortBy = () => {
  return useSetAtom(sortByAtom);
};
