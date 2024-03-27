import { keyMaps } from '@blackhole/actions';
import {
  KeybindingProvider,
  useInitManager,
} from '@blackhole/keybinding-manager';
import { Help } from '@blackhole/shortcut/help';

import { Routes } from './Routes';

const App = () => {
  useInitManager(keyMaps);

  return (
    <KeybindingProvider>
      <Help />
      <Routes />
    </KeybindingProvider>
  );
};

export default App;
