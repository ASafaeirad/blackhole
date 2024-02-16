import { keyMaps } from '@blackhole/actions';
import { KeyBindingProvider } from '@blackhole/keybinding-manager';
import { StoreProvider } from '@blackhole/store';

import { Routes } from './Routes';

function App() {
  return (
    <StoreProvider>
      <KeyBindingProvider keyMaps={keyMaps}>
        <Routes />
      </KeyBindingProvider>
    </StoreProvider>
  );
}

export default App;
