import { Actions } from '@blackhole/actions';
import { iMap, KeyBindingProvider, nMap } from '@blackhole/keybinding-manager';
import { StoreProvider } from '@blackhole/store';

import { Routes } from './Routes';

const actions = {
  [Actions.MoveNextBlock]: nMap('j'),
  [Actions.MovePrevBlock]: nMap('k'),
  [Actions.GoToEditMode]: nMap('i'),
  [Actions.GoToNormalMode]: iMap('escape'),
  [Actions.CreateTask]: nMap('c'),
  [Actions.SaveTask]: iMap('enter'),
  [Actions.CloseModal]: iMap('escape'),
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
