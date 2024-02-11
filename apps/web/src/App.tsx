import { Actions } from '@blackhole/actions';
import { KeyBindingProvider } from '@blackhole/keybinding-manager';
import { StoreProvider } from '@blackhole/store';

import { Routes } from './Routes';

const actions = {
  [Actions.MoveNextBlock]: 'j',
  [Actions.MovePrevBlock]: 'k',
  [Actions.GoToEditMode]: 'i',
  [Actions.GoToNormalMode]: 'escape',
  [Actions.CreateProject]: 'c',
} as const;

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
