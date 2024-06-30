import { getCurrentUserId } from '@blackhole/auth/data-layer';
import { FirebaseSdk } from '@blackhole/firebase';
import { assertNotNull } from '@fullstacksjs/toolbox';
import {
  addDoc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import type { ActionItem } from '../models';
import type { ActionItemDto, CreateActionItemDto } from './ActionItemDto';
import { toActionItem, toActionItemDto } from './ActionItemDto';

export class ActionItemSdk extends FirebaseSdk<ActionItemDto> {
  constructor() {
    const userId = getCurrentUserId();
    assertNotNull(userId, 'User not authenticated');

    super('users', userId, 'tasks');
  }

  public changeOrder(item: ActionItem, order: number) {
    const itemRef = this.doc(item.id);
    return updateDoc(itemRef, { order });
  }

  public swap(
    a: ActionItem,
    b: ActionItem,
    onConflict: (aId: number) => number,
  ) {
    const aDoc = this.doc(a.id);
    const bDoc = this.doc(b.id);

    const nextAOrder = a.order === b.order ? onConflict(a.order) : b.order;
    const nextBOrder = a.order;

    return Promise.all([
      updateDoc(aDoc, { order: nextAOrder }),
      updateDoc(bDoc, { order: nextBOrder }),
    ]);
  }

  public add(item: CreateActionItemDto) {
    return addDoc(this.collection, toActionItemDto(item));
  }

  public toggle(_item: ActionItem): Promise<void> {
    throw Error('Not Implemented');
  }

  public subscribe(callback: (item: ActionItem[]) => void) {
    const collectionRef = query(this.collection, where('status', '!=', 'done'));
    return onSnapshot(collectionRef, snapshot => {
      const items: ActionItem[] = [];
      snapshot.forEach(item => {
        const data = item.data();
        items.push(toActionItem(item.id, data));
      });

      callback(items);
    });
  }
}
