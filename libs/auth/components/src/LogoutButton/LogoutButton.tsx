import { signOut } from '@blackhole/auth/data-layer';
import { PointerButton } from '@blackhole/design';

export const LogoutButton = () => {
  return <PointerButton onClick={signOut}>Logout</PointerButton>;
};
