import { SideNavigation } from '@blackhole/navigation';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
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

const rootRoute = createRootRoute({ component: Layout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/projects',
  component: ProjectsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: ProjectsPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  settingsRoute,
]);

export const router = createRouter({ routeTree });

export const Routes = () => <RouterProvider router={router} />;
