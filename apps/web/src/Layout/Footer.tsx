import { LogoutButton, Profile } from '@blackhole/auth/components';
import type { User } from '@blackhole/auth/data-layer';
import { config } from '@blackhole/config';
import { HelpButton } from '@blackhole/shortcut/help';
import type { Nullable } from '@fullstacksjs/toolbox';

import { Logo } from './Logo';

interface Props {
  user: Nullable<User>;
}

export const Footer = ({ user }: Props) => {
  return (
    <footer className="fr py-5 justify-between items-center">
      <div className="fr gap-4">
        <Logo className="color-muted w-[32px]" />
        <div className="color-muted">v{config.get('version')}</div>
      </div>
      <div className="fr gap-6">
        <HelpButton />
        {user ? (
          <>
            <span className="color-muted">|</span>
            <Profile name={user.name} />
            <LogoutButton />
          </>
        ) : null}
      </div>
    </footer>
  );
};
