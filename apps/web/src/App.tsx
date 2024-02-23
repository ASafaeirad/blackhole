import { keyMaps } from '@blackhole/actions';
import { KeyBindingProvider } from '@blackhole/keybinding-manager';
import { Help } from '@blackhole/shortcut/help';

import { Routes } from './Routes';

const App = () => {
  return (
    <KeyBindingProvider keyMaps={keyMaps}>
      <Help />
      <Routes />
    </KeyBindingProvider>
  );
};

export default App;
