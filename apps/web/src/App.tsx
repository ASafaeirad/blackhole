import { keyMaps } from '@blackhole/actions';
import { KeyBindingProvider } from '@blackhole/keybinding-manager';
import { Help } from '@blackhole/shortcut/help';
import { DevTools } from 'jotai-devtools';

import { Routes } from './Routes';

const App = () => {
  return (
    <KeyBindingProvider keyMaps={keyMaps}>
      <DevTools />
      <Help />
      <Routes />
    </KeyBindingProvider>
  );
};

export default App;
