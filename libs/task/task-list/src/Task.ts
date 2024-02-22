export type TaskStatus = 'done' | 'pending';

export interface Task {
  id: string;
  name: string;
  status: TaskStatus;
}
