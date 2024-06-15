import { firebaseTimestamp, fromFirebaseTimestamp } from '@blackhole/firebase';
import { bind } from '@fullstacksjs/toolbox';

import type { BaseActionItem } from '../models';
import { hasGap, isDone, parseNodes } from '../models';
import type { BaseActionItemDto, CreateActionItemDto } from './ActionItemDto';

export interface RoutineDto extends BaseActionItemDto {
  type: 'routine';
  streak: number;
  maxStreak?: number;
}

export const toRoutineDto = (
  routine: CreateActionItemDto,
  userId: string,
): RoutineDto => {
  return {
    ...routine,
    type: 'routine',
    userId,
    createdAt: firebaseTimestamp(),
    streak: 0,
    maxStreak: 0,
  };
};

export function toRoutine(id: string, data: RoutineDto): Routine {
  const lastCompletedDate = bind(data.lastCompletedDate, fromFirebaseTimestamp);
  const createdAt = fromFirebaseTimestamp(data.createdAt);

  return {
    type: 'routine',
    id,
    name: data.name,
    order: data.order,
    repeat: data.repeat,
    status: isDone({ lastCompletedDate }) ? 'done' : data.status,
    lastCompletedDate,
    createdAt,
    maxStreak: data.maxStreak ?? 0,
    streak: !hasGap({ lastCompletedDate }) ? data.streak : 0,
    nodes: parseNodes(data.name),
    experience: data.experience ?? 1,
  };
}

export interface Routine extends BaseActionItem {
  type: 'routine';
  streak: number;
  maxStreak: number;
}
