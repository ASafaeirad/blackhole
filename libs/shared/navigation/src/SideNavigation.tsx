import { Logo } from '@blackhole/design';

import { SideNavItem } from './SideNavItem';

export const SideNavigation = () => {
  return (
    <div className="fc p-7 border-r-1 border-idle border-solid gap-8 h-screen w-[240px]">
      <Logo />
      <div className="fc gap-3">
        <SideNavItem to="/">Dashboard</SideNavItem>
        <SideNavItem to="/projects">Projects</SideNavItem>
      </div>
    </div>
  );
};
