import { HelpButton } from '@blackhole/shortcut/help';
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
  <div className="fc p-8 relative h-screen">
    <div className="f1">
      <Outlet />
    </div>
    <footer className="fr justify-end">
      <HelpButton />
    </footer>
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
