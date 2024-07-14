import { keyMaps } from '@blackhole/actions';
import { useSubscribeAuthState } from '@blackhole/auth/data-layer';
import {
  KeybindingProvider,
  useInitManager,
} from '@blackhole/keybinding-manager';
import { Help } from '@blackhole/shortcut/help';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  useInitManager(keyMaps);
  useSubscribeAuthState();

  return (
    <KeybindingProvider>
      <Help />
      <Outlet />
    </KeybindingProvider>
  );
}
