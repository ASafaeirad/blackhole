import { bind } from '@fullstacksjs/toolbox';
import {
  differenceInDays,
  isBefore,
  isToday,
  startOfYesterday,
} from 'date-fns';

import type { BaseActionItem } from './ActionItem';

export interface Routine extends BaseActionItem {
  type: 'routine';
  streak: number;
  maxStreak: number;
}

export function hasStreak(routine: Routine) {
  if (!routine.lastCompletedDate) return false;
  return differenceInDays(Date.now(), routine.lastCompletedDate) < 2;
}

export const isDone = (routine: Pick<Routine, 'lastCompletedDate'>) =>
  bind(routine.lastCompletedDate, isToday);

export const hasGap = ({
  lastCompletedDate,
}: Pick<Routine, 'lastCompletedDate'>) =>
  bind(lastCompletedDate, d => isBefore(d, startOfYesterday()));
