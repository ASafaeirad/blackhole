import { createContext, useContext, useEffect, useMemo } from 'react';

import type { Keybinding } from './Keybinding';
import { KeybindingManager } from './KeybindingManager';

export interface KeyBindProviderProps<TAction extends string> {
  children?: React.ReactNode;
  actions: Record<TAction, Keybinding>;
}

const KeyBindingContext = createContext<KeybindingManager<any> | undefined>(
  undefined,
);

export const KeyBindingProvider = <T extends string>({
  children,
  actions,
}: KeyBindProviderProps<T>) => {
  const manager = useMemo(() => new KeybindingManager(actions), []);

  useEffect(() => manager.register(document), []);

  return (
    <KeyBindingContext.Provider value={manager}>
      {children}
    </KeyBindingContext.Provider>
  );
};

export const useSubscribeAction = <T extends string>(
  action: T,
  callback: VoidFunction,
) => {
  const context = useContext(KeyBindingContext);

  if (!context)
    throw new Error(
      'useSubscribeAction hook must be used with KeyBindingProvider',
    );

  useEffect(() => context.subscribe(action, callback), []);
};
