import type { Node } from './Node';

export type TaskStatus = 'done' | 'focus' | 'pending';
export type TaskRepeatType = 'daily' | 'once';

export interface Task {
  id: string;
  order: number;
  repeat: TaskRepeatType;
  name: string;
  status: TaskStatus;
  createdAt: number | undefined;
  nodes: Node[];
}
