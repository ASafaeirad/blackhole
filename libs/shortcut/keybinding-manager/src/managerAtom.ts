import type { KeyMap } from '@blackhole/keyflow';
import { KeyFlow } from '@blackhole/keyflow';
import { atom, useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

export const managerAtom = atom<KeyFlow<any> | null>(null);

export const useInitManager = (keyMaps: KeyMap) => {
  useHydrateAtoms([[managerAtom, new KeyFlow(keyMaps)]]);
};

export const useManager = () => {
  const [manager] = useAtom(managerAtom);
  if (!manager) throw Error('Keybinding manager not initialized');

  return manager;
};

export const useKeyFlowContext = (
  actions: Parameters<KeyFlow<any>['createContext']>[0],
) => {
  const manager = useManager();
  return manager.createContext(actions);
};
