import { SideNavigation } from '@blackhole/navigation';
import {
  Outlet,
  RootRoute,
  Route,
  Router,
  RouterProvider,
} from '@tanstack/react-router';

import { DashboardPage } from './DashboardPage';
import { ProjectsPage } from './ProjectsPage';

const Layout = () => (
  <div className="fr h-screen">
    <SideNavigation />
    <div className="f1">
      <Outlet />
    </div>
  </div>
);

const rootRoute = new RootRoute({ component: Layout });

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: ProjectsPage,
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

export const router = new Router({ routeTree });

export const Routes = () => <RouterProvider router={router} />;
