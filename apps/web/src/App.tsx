import { keyMaps } from '@blackhole/actions';
import { useSubscribeAuthState } from '@blackhole/auth';
import {
  KeybindingProvider,
  useInitManager,
} from '@blackhole/keybinding-manager';
import { Help } from '@blackhole/shortcut/help';

import { Routes } from './Routes';

const App = () => {
  useInitManager(keyMaps);
  useSubscribeAuthState();

  return (
    <KeybindingProvider>
      <Help />
      <Routes />
    </KeybindingProvider>
  );
};

export default App;
