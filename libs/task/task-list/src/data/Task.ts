export type TaskStatus = 'done' | 'focus' | 'pending';
export type TaskRepeatType = 'daily' | 'once';

export interface Task {
  id: string;
  repeat: TaskRepeatType;
  name: string;
  status: TaskStatus;
}
