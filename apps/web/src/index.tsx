import '@blackhole/design/styles';

import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { routeTree } from './routeTree.gen';

export const router = createRouter({ routeTree });

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
