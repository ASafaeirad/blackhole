export const allSortBy = ['name', 'status'] as const;

export type SortBy = (typeof allSortBy)[number];
