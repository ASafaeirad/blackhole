import { Actions } from '@blackhole/actions';
import { AuthGuard } from '@blackhole/auth/components';
import { signIn, useCurrentUser } from '@blackhole/auth/data-layer';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import { Outlet } from '@tanstack/react-router';

import { Footer } from './Footer';
import { FullscreenLoading } from './FullscreenLoading';

export const Layout = () => {
  useSubscribeAction(Actions.SignIn, signIn);
  const user = useCurrentUser();

  return (
    <div className="fc px-16 py-8 relative h-screen md:(px-32 py-12)">
      <AuthGuard fallback={<FullscreenLoading />}>
        <Outlet />
      </AuthGuard>
      <Footer user={user} />
    </div>
  );
};
