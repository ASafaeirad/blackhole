import type { NavLinkProps } from '@blackhole/design';
import { NavLink } from '@blackhole/design';
import type { IconName } from '@blackhole/icons';
import { Icon } from '@blackhole/icons';

interface Props extends NavLinkProps {
  children: React.ReactNode;
  icon: IconName;
}

export const SideNavItem = ({ children, icon, ...props }: Props) => (
  <NavLink
    {...props}
    className="p-4 block text-body transition-colors [&.active]:bg-elevated hover:bg-elevated rd"
  >
    <div className="fr gap-3 items-center">
      <Icon icon={icon} />
      <div className="f1">{children}</div>
      <div className="i-fe-arrow-down" />
    </div>
  </NavLink>
);
