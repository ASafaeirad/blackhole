import { TaskPage } from '@blackhole/task/task-list';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';

const Layout = () => (
  <div className="relative h-screen">
    <Outlet />
  </div>
);

const root = createRootRoute({
  component: Layout,
  notFoundComponent: () => <Navigate to="/" />,
});

const index = createRoute({
  getParentRoute: () => root,
  path: '/',
  component: TaskPage,
});

const routeTree = root.addChildren([index]);

export const router = createRouter({ routeTree });

export const Routes = () => <RouterProvider router={router} />;
