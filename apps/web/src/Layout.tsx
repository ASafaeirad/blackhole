import { Actions } from '@blackhole/actions';
import { signIn, useCurrentUser } from '@blackhole/auth';
import { config } from '@blackhole/config';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import { HelpButton } from '@blackhole/shortcut/help';
import { Outlet } from '@tanstack/react-router';

export const Layout = () => {
  useSubscribeAction(Actions.SignIn, signIn);
  const user = useCurrentUser();

  return (
    <div className="fc px-16 py-8 relative h-screen md:(px-32 py-12)">
      <div className="f1">
        <Outlet />
      </div>
      <footer className="fr py-5 justify-between items-center">
        <div className="color-muted">v{config.get('version')}</div>
        <div>{user?.name}</div>
        <HelpButton />
      </footer>
    </div>
  );
};
