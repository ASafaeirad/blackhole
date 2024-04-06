import type { Mode } from '@blackhole/keyflow';
import { atom, useAtom, useSetAtom } from 'jotai';

import { managerAtom } from './managerAtom';

const modeAtom = atom<Mode | undefined>(get => get(managerAtom)?.mode);

export const setModeAtom = atom(null, (get, set, update: Mode) => {
  const manager = get(managerAtom);
  if (manager) manager.mode = update;
});

export const useMode = () => {
  return useAtom(modeAtom)[0];
};

export const useSetMode = () => {
  return useSetAtom(setModeAtom);
};
