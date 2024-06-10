import { getCurrentUserId } from '@blackhole/auth/data-layer';
import { firestore } from '@blackhole/firebase';
import type { CollectionReference } from 'firebase/firestore';
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';

import type { Log } from '../models';
import type { LogDto } from './LogDto';

export class LogSDK {
  private _collection: CollectionReference<LogDto>;

  constructor(routineId: string) {
    const userId = getCurrentUserId();
    if (!userId) throw new Error('User not authenticated');

    this._collection = collection(
      firestore,
      'users',
      userId,
      'tasks',
      routineId,
      'logs',
    ) as CollectionReference<LogDto>;
  }

  get collection() {
    return this._collection;
  }

  get(id: string) {
    return doc(this.collection, id);
  }

  async getLogs(options: { limit: number }) {
    const logs: Log[] = [];
    const docs = await getDocs(
      query(this.collection, limit(options.limit), orderBy('date', 'desc')),
    );

    docs.forEach(l => logs.push({ ...l.data(), id: l.id }));
    return logs;
  }
}
