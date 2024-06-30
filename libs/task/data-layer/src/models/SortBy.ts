export const allSortBy = ['name', 'status', 'dueDate'] as const;

export type SortBy = (typeof allSortBy)[number];

export const defaultSortBy: SortBy = 'status';
