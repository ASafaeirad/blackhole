import { NavLink } from '@blackhole/design';

export const SideNavigation = () => {
  return (
    <div className="p-2 flex gap-2">
      <NavLink to="/">Dashboard</NavLink>{' '}
      <NavLink to="/projects">Projects</NavLink>
    </div>
  );
};
