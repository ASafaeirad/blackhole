import type { Nullable } from '@fullstacksjs/toolbox';
import { assertNotNull } from '@fullstacksjs/toolbox';

import type { Node } from './Node';
import type { Routine } from './Routine';
import type { SortBy } from './Sort';
import type { Task } from './Task';

export type ActionItemStatus = 'done' | 'focus' | 'pending';
export type RepeatType = 'daily' | 'once';

export interface BaseActionItem {
  id: string;
  order: number;
  name: string;
  status: ActionItemStatus;
  createdAt: Date;
  lastCompletedDate: Nullable<Date>;
  repeat: RepeatType;
  experience: number;
  nodes: Node[];
}

export type ActionItem = Routine | Task;

export type ActionItemType = ActionItem['type'];

export const getRepeat = (name: string) => {
  if (name.includes('everyday')) return 'daily';
  return 'once';
};

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

    if (!weight) return aValue.localeCompare(bValue);
    const aWeight = weight[aValue];
    const bWeight = weight[bValue];

    assertNotNull(aWeight);
    assertNotNull(bWeight);

    return a.order * aWeight - b.order * bWeight;
  });
}
