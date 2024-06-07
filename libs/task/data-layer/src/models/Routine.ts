import { differenceInDays } from 'date-fns';

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
