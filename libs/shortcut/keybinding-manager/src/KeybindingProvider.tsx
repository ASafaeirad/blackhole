import { atom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';

import type { Keybinding } from './Keybinding';
import { KeybindingManager } from './KeybindingManager';
import type { Mode, WithMode } from './keyMapper';

export interface KeyBindProviderProps<TAction extends string> {
  children?: React.ReactNode;
  keyMaps: Record<TAction, WithMode<Keybinding[]>>;
}

const KeyBindingContext = createContext<KeybindingManager<any> | undefined>(
  undefined,
);

const managerAtom = atom<KeybindingManager<any> | null>(null);
export const setModeAtom = atom(null, (get, set, update: Mode) => {
  const manager = get(managerAtom);
  if (manager) manager.mode = update;
});

export const KeyBindingProvider = <T extends string>({
  children,
  keyMaps,
}: KeyBindProviderProps<T>) => {
  const manager = useMemo(() => new KeybindingManager(keyMaps), [keyMaps]);
  useHydrateAtoms([[managerAtom, manager]]);

  useSyncExternalStore(
    notify => manager.subscribeOnModeChange(notify),
    () => manager.mode,
  );

  useEffect(() => manager.register(document), [manager]);

  return (
    <KeyBindingContext.Provider value={manager}>
      {children}
    </KeyBindingContext.Provider>
  );
};

const empty: unknown[] = [];

const useKeybindingManager = () => {
  const context = useContext(KeyBindingContext);

  if (!context)
    throw new Error('useKeybinding hook must be used with KeyBindingProvider');

  return context;
};

export const useMode = () => {
  const manager = useKeybindingManager();
  return manager.mode;
};

export const useSubscribeAction = <T extends string>(
  action: T,
  callback: VoidFunction,
  deps: React.DependencyList = empty,
) => {
  const manager = useKeybindingManager();

  useEffect(
    () => manager.subscribe(action, callback),
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
  const manager = useKeybindingManager();

  useEffect(
    () =>
      manager.subscribe(action, ({ mode: current }) => {
        if (current === mode) callback();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [action, manager.mode, mode, ...deps],
  );
};

export const useSetMode = () => {
  const manager = useKeybindingManager();

  return (mode: Mode) => {
    manager.mode = mode;
  };
};
