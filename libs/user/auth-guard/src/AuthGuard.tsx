import { useAuthState, useCurrentUser } from '@blackhole/auth';
import { Key } from '@blackhole/design';

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
        Login please <Key>ctrl+shift+l</Key>
      </div>
    );

  return children;
};
