import { isToday } from 'date-fns';
import { serverTimestamp } from 'firebase/firestore';

import type { BaseActionItem } from '../models';
import { parseNodes } from '../models';
import type { BaseActionItemDto, CreateActionItemDto } from './ActionItemDto';

export interface RoutineDto extends BaseActionItemDto {
  type: 'routine';
  streak?: number;
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
    createdAt: Number(serverTimestamp()) * 1000,
    streak: 0,
    maxStreak: 0,
  };
};

export function toRoutine(id: string, data: RoutineDto): Routine {
  const lastCompletedDate = Number(data.lastCompletedDate);
  const createdAt = Number(data.createdAt);
  const isDone = isToday(lastCompletedDate);

  return {
    type: 'routine',
    id,
    name: data.name,
    order: data.order,
    repeat: data.repeat,
    status: isDone ? 'done' : data.status,
    lastCompletedDate,
    createdAt,
    maxStreak: data.maxStreak ?? 0,
    streak: data.streak ?? 0,
    nodes: parseNodes(data.name),
    experience: data.experience ?? 1,
  };
}

export interface Routine extends BaseActionItem {
  type: 'routine';
  streak: number;
  maxStreak: number;
}
