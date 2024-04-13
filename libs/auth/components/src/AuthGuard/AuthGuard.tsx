import {
  signIn,
  useAuthState,
  useCurrentUser,
} from '@blackhole/auth/data-layer';
import { Key, PointerButton } from '@blackhole/design';

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

export const AuthGuard = ({ children, fallback }: Props) => {
  const { isLoading } = useAuthState();
  const user = useCurrentUser();

  if (isLoading) return fallback;
  if (!user)
    return (
      <div className="fr center gap-4 h-full">
        <PointerButton onClick={signIn}>
          Login <Key>ctrl+shift+l</Key>
        </PointerButton>
      </div>
    );

  return children;
};
