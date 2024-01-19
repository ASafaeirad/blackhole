import { KeyBindingProvider } from '@blackhole/keybinding-manager';
import { StoreProvider } from '@blackhole/store';

import { Routes } from './Routes';

function App() {
  return (
    <StoreProvider>
      <KeyBindingProvider>
        <Routes />
      </KeyBindingProvider>
    </StoreProvider>
  );
}

export default App;
