import { firestore } from '@blackhole/firebase';
import { deleteField, doc, runTransaction } from 'firebase/firestore';

import type { Routine } from '../models/ActionItem';
import { hasStreak } from '../models/ActionItem';
import { ActionItemSDK } from './ActionItemSDK';
import { LogSDK } from './LogSDK';

export interface LogDto {
  id: string;
  routineId: string;
  date: number;
  streak: number;
  maxStreak: number;
}

export type CreateLogDto = Omit<LogDto, 'id'>;

export class RoutineSDK extends ActionItemSDK {
  public override toggle(routine: Routine) {
    return routine.status === 'done'
      ? this.revert(routine)
      : this.markDone(routine);
  }

  private markDone(routine: Routine) {
    const item = this.doc(routine.id);
    const logSdk = new LogSDK(routine.id);

    return runTransaction(firestore, transaction => {
      const lastCompletedDate = Date.now();
      const streak = hasStreak(routine) ? routine.streak + 1 : 1;
      const maxStreak = Math.max(streak, routine.maxStreak);

      transaction.update(item, { streak, maxStreak, lastCompletedDate });
      const log: CreateLogDto = {
        routineId: routine.id,
        date: lastCompletedDate,
        maxStreak,
        streak,
      };

      transaction.set(doc(logSdk.collection), log);
      return Promise.resolve();
    });
  }

  private revert(routine: Routine) {
    const item = this.doc(routine.id);
    const logSdk = new LogSDK(routine.id);

    return runTransaction(firestore, async transaction => {
      const [current, prev] = await logSdk.getLogs({ limit: 2 });
      if (!current) return Promise.reject(Error('No logs found'));

      const body = prev
        ? {
            lastCompletedDate: prev.date,
            streak: prev.streak,
            maxStreak: prev.maxStreak,
          }
        : { lastCompletedDate: deleteField(), streak: 0, maxStreak: 0 };

      transaction.update(item, body);
      transaction.delete(logSdk.get(current.id));
      return Promise.resolve();
    });
  }
}
