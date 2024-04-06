import type { KeyMap } from '@blackhole/keyflow';
import { KeyFlow } from '@blackhole/keyflow';
import { atom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

export const managerAtom = atom<KeyFlow<any> | null>(null);

export const useInitManager = (keyMaps: KeyMap) => {
  useHydrateAtoms([[managerAtom, new KeyFlow(keyMaps)]]);
};
