export type TaskStatus = 'done' | 'focus' | 'pending';

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
}
