import { Logo } from '@blackhole/design';

import { SideNavItem } from './SideNavItem';

export const SideNavigation = () => {
  return (
    <div className="fc px-6 py-7 border-r-1 border-idle border-solid gap-8 h-screen w-[276px]">
      <Logo className="self-center" />
      <div className="fc f1 gap-3">
        <SideNavItem icon="home" to="/">
          Dashboard
        </SideNavItem>
        <SideNavItem icon="box" to="/projects">
          Projects
        </SideNavItem>
      </div>
      <SideNavItem icon="user" to="/settings">
        Profile
      </SideNavItem>
    </div>
  );
};
