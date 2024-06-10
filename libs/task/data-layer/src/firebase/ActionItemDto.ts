import { getCurrentUserId } from '@blackhole/auth/data-layer';
import type { RequiredBy } from '@fullstacksjs/toolbox';
import type { FieldValue } from 'firebase/firestore';

import type { ActionItemStatus, RepeatType } from '../models';
import type { RoutineDto } from './RoutineDto';
import { toRoutine, toRoutineDto } from './RoutineDto';
import type { TaskDto } from './TaskDto';
import { toTask, toTaskDto } from './TaskDto';

export interface BaseActionItemDto {
  type: 'routine' | 'task';
  order: number;
  name: string;
  status: ActionItemStatus;
  createdAt: number;
  lastCompletedDate?: FieldValue;
  repeat: RepeatType;
  userId: string;
  experience?: number;
}

export const toActionItemDto = (
  actionItem: CreateActionItemDto,
): ActionItemDto => {
  const userId = getCurrentUserId();
  if (!userId) throw new Error('User not authenticated');

  return actionItem.type === 'task'
    ? toTaskDto(actionItem, userId)
    : toRoutineDto(actionItem, userId);
};

export type ActionItemDto = RoutineDto | TaskDto;

export type CreateActionItemDto = RequiredBy<
  Pick<
    BaseActionItemDto,
    'experience' | 'name' | 'order' | 'repeat' | 'status' | 'type'
  >,
  'experience'
>;

export function toActionItem(id: string, data: ActionItemDto) {
  if (data.type === 'routine') return toRoutine(id, data);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (data.type === 'task') return toTask(id, data);
  throw new Error('Invalid type');
}
