import { UserSdk } from '@blackhole/auth/data-layer';
import { firebaseTimestamp, firestore } from '@blackhole/firebase';
import { deleteField, doc, runTransaction } from 'firebase/firestore';

import type { Routine } from '../models';
import { hasStreak } from '../models';
import { ActionItemSdk } from './ActionItemSdk';
import type { CreateLogDto } from './LogDto';
import { LogSDK } from './LogSdk';

export class RoutineSdk extends ActionItemSdk {
  public override toggle(routine: Routine) {
    return routine.status === 'done'
      ? this.revert(routine)
      : this.markDone(routine);
  }

  private async markDone(routine: Routine) {
    const item = this.doc(routine.id);
    const logSdk = new LogSDK(routine.id);
    const userSdk = UserSdk.fromAuthClient();
    const user = await userSdk.getUser();

    return runTransaction(firestore, transaction => {
      const lastCompletedDate = firebaseTimestamp();
      const streak = hasStreak(routine) ? routine.streak + 1 : 1;
      const maxStreak = Math.max(streak, routine.maxStreak);

      transaction.update(item, {
        streak,
        maxStreak,
        lastCompletedDate,
        status: 'pending',
      });
      const log: CreateLogDto = {
        routineId: routine.id,
        date: lastCompletedDate,
        maxStreak,
        streak,
      };

      transaction.update(userSdk.currentUserDoc(), {
        experience: user.experience + routine.experience,
      });

      transaction.set(doc(logSdk.collection), log);
      return Promise.resolve();
    });
  }

  private async revert(routine: Routine) {
    const item = this.doc(routine.id);
    const logSdk = new LogSDK(routine.id);
    const userSdk = UserSdk.fromAuthClient();
    const user = await userSdk.getUser();

    return runTransaction(firestore, async transaction => {
      const [current, prev] = await logSdk.getLogs({ limit: 2 });
      if (!current) return Promise.reject(Error('No logs found'));

      const body = prev
        ? {
            lastCompletedDate: prev.date,
            streak: prev.streak,
            maxStreak: prev.maxStreak,
            status: 'pending',
          }
        : {
            lastCompletedDate: deleteField(),
            streak: 0,
            maxStreak: 0,
            status: 'pending',
          };

      transaction.update(item, body);
      transaction.update(userSdk.currentUserDoc(), {
        experience: Math.min(user.experience - routine.experience, 0),
      });
      transaction.delete(logSdk.get(current.id));
      return Promise.resolve();
    });
  }
}
