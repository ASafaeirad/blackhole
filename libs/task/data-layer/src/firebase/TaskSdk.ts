import { UserSdk } from '@blackhole/auth/data-layer';
import { firestore } from '@blackhole/firebase';
import { runTransaction } from 'firebase/firestore';

import type { Task } from '../models';
import { ActionItemSdk } from './ActionItemSdk';

export class TaskSdk extends ActionItemSdk {
  public override async toggle(item: Task) {
    const userSdk = UserSdk.fromAuthClient();
    const user = await userSdk.getUser();

    return runTransaction(firestore, async transaction => {
      if (item.status === 'done') {
        transaction.update(this.doc(item.id), { status: 'pending' });
        transaction.update(userSdk.doc(), {
          experience: Math.min(user.experience - item.experience),
        });
      } else {
        transaction.update(this.doc(item.id), { status: 'done' });
        transaction.update(userSdk.doc(), {
          experience: user.experience + item.experience,
        });
      }

      return Promise.resolve();
    });
  }
}
