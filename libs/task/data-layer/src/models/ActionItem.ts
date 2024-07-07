import type { Nullable } from '@fullstacksjs/toolbox';

import type { Node } from './Node';
import type { Routine } from './Routine';
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
  dueDate: Nullable<Date>;
}

export type ActionItem = Routine | Task;

export type ActionItemType = ActionItem['type'];

export const getRepeat = (name: string) => {
  if (name.includes('everyday')) return 'daily';
  return 'once';
};
