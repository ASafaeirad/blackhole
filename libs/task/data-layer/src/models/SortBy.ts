import { debug } from '@blackhole/debug';
import { assertNotNull, isString } from '@fullstacksjs/toolbox';

import type { ActionItem } from './ActionItem';

export const allSortBy = ['name', 'status', 'dueDate', 'createdAt'] as const;

export type SortBy = (typeof allSortBy)[number];

export const defaultSortBy: SortBy = 'status';

const weightMatrix: Partial<Record<SortBy, Record<any, number>>> = {
  status: {
    focus: -10,
    pending: 10,
    done: 10000,
  },
};

export function sortActionItems(items: ActionItem[], sortBy: SortBy) {
  return items.toSorted((a, b) => {
    const weight = weightMatrix[sortBy];
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortBy === 'dueDate' || sortBy === 'createdAt') {
      if (aValue instanceof Date && bValue instanceof Date) {
        return aValue.getTime() - bValue.getTime();
      }

      return aValue instanceof Date ? -1 : 1;
    }

    if (isString(aValue) && isString(bValue)) {
      if (!weight) return aValue.localeCompare(bValue);
      const aWeight = weight[aValue];
      const bWeight = weight[bValue];
      assertNotNull(aWeight);
      assertNotNull(bWeight);

      return a.order * aWeight - b.order * bWeight;
    }

    debug.warn('Unknown sort type', sortBy, aValue, bValue);
    return 0;
  });
}
