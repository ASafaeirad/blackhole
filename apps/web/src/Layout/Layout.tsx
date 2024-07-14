import { Actions } from '@blackhole/actions';
import { AuthGuard } from '@blackhole/auth/components';
import { signIn, useCurrentUser } from '@blackhole/auth/data-layer';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import { useRouter } from '@tanstack/react-router';
import { Heading } from 'react-aria-components';

import { Footer } from './Footer';
import { FullscreenLoading } from './FullscreenLoading';

interface Props {
  children: React.ReactNode;
  title: string;
}

export const Layout = ({ children, title }: Props) => {
  useSubscribeAction(Actions.SignIn, signIn);
  const router = useRouter();
  const user = useCurrentUser();

  useSubscribeAction(Actions.GoToTasks, () => {
    void router.navigate({ to: '/' });
  });
  useSubscribeAction(Actions.GoToValues, () => {
    void router.navigate({ to: '/values' });
  });

  return (
    <div className="fc py-8 relative h-screen overflow-auto md:py-12">
      <div className="fc gap-8 h-full overflow-auto">
        <Heading className="layout text-large case-capital">{title}</Heading>
        <AuthGuard fallback={<FullscreenLoading />}>{children}</AuthGuard>
      </div>
      <Footer user={user} />
    </div>
  );
};
