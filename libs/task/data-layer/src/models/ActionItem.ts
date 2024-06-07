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
  createdAt: number | undefined;
  lastCompletedDate: number | undefined;
  repeat: RepeatType;
  nodes: Node[];
}

export type ActionItem = Routine | Task;

export type ActionItemType = ActionItem['type'];

export const getRepeat = (name: string) => {
  if (name.includes('everyday')) return 'daily';
  return 'once';
};

const statusWeight: Record<ActionItemStatus, number> = {
  focus: -10,
  pending: 10,
  done: 10000,
};

export function sortActionItems(items: ActionItem[]) {
  items.sort(
    (a, b) =>
      a.order * statusWeight[a.status] - b.order * statusWeight[b.status],
  );
}
