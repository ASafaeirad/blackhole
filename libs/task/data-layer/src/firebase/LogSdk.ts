import { getCurrentUserId } from '@blackhole/auth/data-layer';
import { FirebaseSdk, fromFirebaseTimestamp } from '@blackhole/firebase';
import { assertNotNull } from '@fullstacksjs/toolbox';
import { getDocs, limit, orderBy, query } from 'firebase/firestore';

import type { Log } from '../models';
import type { LogDto } from './LogDto';

export class LogSDK extends FirebaseSdk<LogDto> {
  public constructor(routineId: string) {
    const userId = getCurrentUserId();
    assertNotNull(userId, 'User not authenticated');

    super('users', userId, 'tasks', routineId, 'logs');
  }

  public async getLogs(options: { limit: number }) {
    const logs: Log[] = [];
    const docs = await getDocs(
      query(this.collection, limit(options.limit), orderBy('date', 'desc')),
    );

    docs.forEach(l => {
      const data = l.data();
      logs.push({ ...data, id: l.id, date: fromFirebaseTimestamp(data.date) });
    });
    return logs;
  }
}
