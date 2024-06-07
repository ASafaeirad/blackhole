import type { FieldValue } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

import type { ActionItemStatus, RepeatType, Task } from '../models';
import { parseNodes } from '../models';
import type { CreateActionItemDto } from './ActionItemDto';

export interface TaskDto {
  type: 'task';
  repeat: RepeatType;
  order: number;
  name: string;
  status: ActionItemStatus;
  createdAt: number;
  lastCompletedDate?: FieldValue;
  userId: string;
}

export const toTaskDto = (
  task: CreateActionItemDto,
  userId: string,
): TaskDto => {
  return {
    ...task,
    type: 'task',
    userId,
    createdAt: Number(serverTimestamp()) * 1000,
  };
};

export function toTask(id: string, data: TaskDto): Task {
  const lastCompletedDate = Number(data.lastCompletedDate);
  const createdAt = Number(data.createdAt);

  return {
    type: 'task',
    id,
    name: data.name,
    order: data.order,
    repeat: data.repeat,
    status: data.status,
    lastCompletedDate,
    createdAt,
    nodes: parseNodes(data.name),
  };
}
