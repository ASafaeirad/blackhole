import { Actions } from '@blackhole/actions';
import { AuthGuard } from '@blackhole/auth/components';
import { signIn, useCurrentUser } from '@blackhole/auth/data-layer';
import { useSubscribeAction } from '@blackhole/keybinding-manager';

import { Footer } from './Footer';
import { FullscreenLoading } from './FullscreenLoading';

export const Layout = ({ children }: React.PropsWithChildren) => {
  useSubscribeAction(Actions.SignIn, signIn);
  const user = useCurrentUser();

  return (
    <div className="fc py-8 relative h-screen overflow-auto md:py-12">
      <AuthGuard fallback={<FullscreenLoading />}>{children}</AuthGuard>
      <Footer user={user} />
    </div>
  );
};
