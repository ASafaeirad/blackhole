import { isToday } from 'date-fns';
import type { FieldValue } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

import type { ActionItemStatus, BaseActionItem, RepeatType } from '../models';
import { parseNodes } from '../models';
import type { CreateActionItemDto } from './ActionItemDto';

export interface RoutineDto {
  type: 'routine';
  repeat: RepeatType;
  order: number;
  name: string;
  status: ActionItemStatus;
  createdAt: number;
  userId: string;
  streak?: number;
  lastCompletedDate?: FieldValue;
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

  return {
    type: 'routine',
    id,
    name: data.name,
    order: data.order,
    repeat: data.repeat,
    status: isToday(lastCompletedDate) ? 'done' : 'pending',
    lastCompletedDate,
    createdAt,
    maxStreak: data.maxStreak ?? 0,
    streak: data.streak ?? 0,
    nodes: parseNodes(data.name),
  };
}

export interface Routine extends BaseActionItem {
  type: 'routine';
  streak: number;
  maxStreak: number;
}
