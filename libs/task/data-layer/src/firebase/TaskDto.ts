import { firebaseTimestamp, fromFirebaseTimestamp } from '@blackhole/firebase';
import { bind } from '@fullstacksjs/toolbox';

import type { Task } from '../models';
import { parseNodes } from '../models';
import type { BaseActionItemDto, CreateActionItemDto } from './ActionItemDto';

export interface TaskDto extends BaseActionItemDto {
  type: 'task';
}

export const toTaskDto = (
  task: CreateActionItemDto,
  userId: string,
): TaskDto => {
  return {
    ...task,
    type: 'task',
    userId,
    createdAt: firebaseTimestamp(),
  };
};

export function toTask(id: string, data: TaskDto): Task {
  const lastCompletedDate = bind(data.lastCompletedDate, fromFirebaseTimestamp);
  const createdAt = fromFirebaseTimestamp(data.createdAt);

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
    experience: data.experience ?? 1,
    dueDate: bind(data.dueDate, fromFirebaseTimestamp),
  };
}
