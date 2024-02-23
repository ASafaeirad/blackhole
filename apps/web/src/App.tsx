import { keyMaps } from '@blackhole/actions';
import { KeyBindingProvider } from '@blackhole/keybinding-manager';

import { Routes } from './Routes';

const App = () => {
  return (
    <KeyBindingProvider keyMaps={keyMaps}>
      <Routes />
    </KeyBindingProvider>
  );
};

export default App;
