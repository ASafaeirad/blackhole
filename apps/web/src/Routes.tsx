import { TaskPage } from '@blackhole/task/task-list';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Navigate,
  RouterProvider,
} from '@tanstack/react-router';

import { Layout } from './Layout';

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
