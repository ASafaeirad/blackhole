export const allSortBy = ['name', 'status', 'dueDate'] as const;

export type SortBy = (typeof allSortBy)[number];
