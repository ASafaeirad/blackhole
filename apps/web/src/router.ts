import type { RouteParams, RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import ProjectsView from './ProjectsView.vue';

export type AppRouteNames = 'projects';

export const routes: RouteRecordRaw[] = [
  {
    name: 'projects' as AppRouteNames,
    path: '/',
    component: ProjectsView,
  },
];

export const router = createRouter({ history: createWebHistory(), routes });

export function pushRoute(
  name: AppRouteNames,
  params?: RouteParams,
): ReturnType<typeof router.push> {
  return params == null ? router.push({ name }) : router.push({ name, params });
}
