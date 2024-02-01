import type { Keybinding } from '@blackhole/keybinding-manager';
import { KeyBindingProvider } from '@blackhole/keybinding-manager';
import { StoreProvider } from '@blackhole/store';

import { Routes } from './Routes';

const actions = {
  MoveNextBlock: 'j',
  MovePrevBlock: 'k',
  GoToEditMode: 'i',
  GoToNormalMode: 'escape',
} as const satisfies Record<string, Keybinding>;

export type Action = keyof typeof actions;

function App() {
  return (
    <StoreProvider>
      <KeyBindingProvider actions={actions}>
        <Routes />
      </KeyBindingProvider>
    </StoreProvider>
  );
}

export default App;
