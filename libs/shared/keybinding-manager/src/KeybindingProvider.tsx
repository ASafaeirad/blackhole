import { ensureArray, isNull } from '@fullstacksjs/toolbox';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { Keybinding, KeySequence } from './Keybinding';
import { findKeybindingIndex, getPlatformKeys } from './Keybinding';
import { useSetKeyBindings } from './useSetKeyBindings';

export interface KeyBindProviderProps {
  children?: React.ReactNode;
  initialKeyBindings?: Keybinding[];
  debounce?: number;
}

export interface KeyBindingDispatch {
  register: (kb: Keybinding[]) => void;
  getPlatformKeys: (kb: Keybinding) => KeySequence | undefined;
}

const KeyBindingContext = createContext<Keybinding[] | undefined>(undefined);
const KeyBindingDispatcherContext = createContext<
  KeyBindingDispatch | undefined
>(undefined);

export const KeyBindingProvider = ({
  children,
  initialKeyBindings = [],
  debounce,
}: KeyBindProviderProps) => {
  const [keybindings, setKeyBindings] = useState(() => initialKeyBindings);

  const register = useCallback(
    (kbs: Keybinding[]) => {
      setKeyBindings(prev => {
        return kbs.reduce((acc, kb) => {
          const keys = getPlatformKeys(kb);
          if (!keys) return acc;

          const index = findKeybindingIndex(prev, keys);

          if (!isNull(index)) {
            acc[index] = kb;
          } else {
            acc.push(kb);
          }

          return acc;
        }, prev.slice());
      });
    },
    [keybindings],
  );

  useSetKeyBindings(keybindings, debounce);

  const dispatcher = useMemo<KeyBindingDispatch>(
    () => ({ register, getPlatformKeys }),
    [register, getPlatformKeys],
  );

  return (
    <KeyBindingDispatcherContext.Provider value={dispatcher}>
      <KeyBindingContext.Provider value={keybindings}>
        {children}
      </KeyBindingContext.Provider>
    </KeyBindingDispatcherContext.Provider>
  );
};

export const useKeyBindings = () => {
  const context = useContext(KeyBindingContext);

  if (!context)
    throw new Error('useKeyBind hook must be used with KeyBindProvider');

  return context;
};

export const useKeybindingDispatcher = () => {
  const context = useContext(KeyBindingDispatcherContext);

  if (!context)
    throw new Error('useKeyBind hook must be used with KeyBindProvider');

  return context;
};

export const useRegisterKeybinding = (
  keyBindings: Keybinding | Keybinding[],
) => {
  const { register } = useKeybindingDispatcher();

  useEffect(() => {
    register(ensureArray(keyBindings));
  }, [keyBindings]);
};
