import { useAtom } from 'jotai';

import { filterModeAtom } from './atoms/filterAtom';

export const useFilterMode = () => {
  return useAtom(filterModeAtom)[0];
};
