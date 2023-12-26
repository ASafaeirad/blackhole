import type { NavLinkProps } from '@blackhole/design';
import { NavLink } from '@blackhole/design';

interface Props extends NavLinkProps {
  children: React.ReactNode;
}

export const SideNavItem = ({ children, ...props }: Props) => (
  <NavLink
    {...props}
    className="p-4 block rd text-body transition-colors [&.active]:bg-elevated hover:bg-elevated"
  >
    <div className="fr gap-3 items-center">
      <div className="i-fe-columns" />
      <div className="f1">{children}</div>
      <div className="i-fe-arrow-down" />
    </div>
  </NavLink>
);
