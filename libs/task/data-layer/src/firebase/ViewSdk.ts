import { getCurrentUserId } from '@blackhole/auth/data-layer';
import { FirebaseSdk } from '@blackhole/firebase';
import { assertNotNull } from '@fullstacksjs/toolbox';
import { onSnapshot, query, where } from 'firebase/firestore';

import type { View } from '../models';
import { defaultView } from '../models';
import type { ViewDto } from './ViewDto';
import { toView } from './ViewDto';

export class ViewSdk extends FirebaseSdk<ViewDto> {
  constructor() {
    const userId = getCurrentUserId();
    assertNotNull(userId, 'User not authenticated');

    super('users', userId, 'views');
  }

  public async getDefaultView(): Promise<View> {
    const ref = await this.get('default');

    if (!ref.exists()) {
      await this.set('default', defaultView);
      return defaultView;
    }

    return toView(ref.data());
  }

  public subscribe(callback: (item: View[]) => void) {
    const collectionRef = query(this.collection, where('status', '!=', 'done'));
    return onSnapshot(collectionRef, snapshot => {
      const items: View[] = [];

      snapshot.forEach(item => {
        const data = item.data();
        items.push(toView(data));
      });

      callback(items);
    });
  }
}
