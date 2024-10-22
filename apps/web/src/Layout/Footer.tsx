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
    <footer className="layout fr py-5 justify-between items-center">
      <div className="fr gap-4">
        <Logo className="color-muted w-7" />
        <div className="color-muted">v{config.get('version')}</div>
      </div>
      <div className="fr gap-6">
        <HelpButton />
        {user ? (
          <div className="gap-6 hidden md:flex">
            <span className="color-muted">|</span>
            <Profile name={user.name} experience={user.experience} />
            <LogoutButton />
          </div>
        ) : null}
      </div>
    </footer>
  );
};
