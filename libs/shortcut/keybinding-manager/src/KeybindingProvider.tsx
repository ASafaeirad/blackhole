import { atom, useAtom, useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
// import { atomEffect } from 'jotai-effect';
import { useEffect } from 'react';

import type { Keybinding } from './Keybinding';
import { KeybindingManager } from './KeybindingManager';
import type { Mode, WithMode } from './keyMapper';

const managerAtom = atom<KeybindingManager<any> | null>(null);
const modeAtom = atom<Mode | undefined>(get => get(managerAtom)?.mode);

export const setModeAtom = atom(null, (get, set, update: Mode) => {
  const manager = get(managerAtom);
  if (manager) manager.mode = update;
});

export const useInitManager = (
  keyMaps: Record<string, WithMode<Keybinding[]>>,
) => {
  useHydrateAtoms([[managerAtom, new KeybindingManager(keyMaps)]]);
};

export const KeybindingProvider = ({ children }: React.PropsWithChildren) => {
  const [manager] = useAtom(managerAtom);
  useEffect(() => manager?.register(document), [manager]);

  return children;
};

const empty: unknown[] = [];

export const useMode = () => {
  return useAtom(modeAtom)[0];
};

export const useSubscribeAction = <T extends string>(
  action: T,
  callback: VoidFunction,
  deps: React.DependencyList = empty,
) => {
  const [manager] = useAtom(managerAtom);

  useEffect(
    () => manager?.subscribe(action, callback),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [action, manager, ...deps],
  );
};

export const useSubscribeActionOnMode = <T extends string>(
  action: T,
  mode: Mode,
  callback: VoidFunction,
  deps: React.DependencyList = empty,
) => {
  const [manager] = useAtom(managerAtom);

  useEffect(
    () =>
      manager?.subscribe(action, ({ mode: current }) => {
        if (current === mode) callback();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [action, manager?.mode, mode, ...deps],
  );
};

export const useSetMode = () => {
  return useSetAtom(setModeAtom);
};
