import { differenceInDays } from 'date-fns';

import type { Node } from './Node';

export type ActionItemStatus = 'done' | 'focus' | 'pending';
export type RepeatType = 'daily' | 'once';

interface BaseActionItem {
  id: string;
  order: number;
  name: string;
  status: ActionItemStatus;
  createdAt: number | undefined;
  lastCompletedDate: number | undefined;
  nodes: Node[];
}

export interface Task extends BaseActionItem {
  type: 'task';
  repeat: RepeatType;
}

export interface Routine extends BaseActionItem {
  type: 'routine';
  repeat: RepeatType;
  streak: number;
  maxStreak: number;
}

export type ActionItem = Routine | Task;

export type ActionItemType = ActionItem['type'];

export const getRepeat = (name: string) => {
  if (name.includes('everyday')) return 'daily';
  return 'once';
};

export function hasStreak(routine: Routine) {
  if (!routine.lastCompletedDate) return false;
  return differenceInDays(Date.now(), routine.lastCompletedDate) < 2;
}
