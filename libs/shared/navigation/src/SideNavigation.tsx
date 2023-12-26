import { Logo } from '@blackhole/design';

import { SideNavItem } from './SideNavItem';

export const SideNavigation = () => {
  return (
    <div className="fc p-7 border-r-1 border-idle border-solid gap-8 h-screen w-[240px]">
      <Logo />
      <div className="fc"></div>
      <div className="fc f1 gap-3">
        <SideNavItem to="/">Dashboard</SideNavItem>
        <SideNavItem to="/projects">Projects</SideNavItem>d
      </div>
    </div>
  );
};
