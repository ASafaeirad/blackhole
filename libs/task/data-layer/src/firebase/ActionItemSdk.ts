import { getCurrentUser } from '@blackhole/auth/data-layer';
import { firestore } from '@blackhole/firebase';
import type { CollectionReference } from 'firebase/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

import type { ActionItem } from '../models';
import { sortActionItems } from '../models';
import type { ActionItemDto, CreateActionItemDto } from './ActionItemDto';
import { toActionItem, toActionItemDto } from './ActionItemDto';

export class ActionItemSdk {
  private _collection: CollectionReference<ActionItemDto>;

  constructor() {
    const user = getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    this._collection = collection(
      firestore,
      'users',
      user.id,
      'tasks',
    ) as CollectionReference<ActionItemDto>;
  }

  get collection() {
    return this._collection;
  }

  changeOrder(item: ActionItem, order: number) {
    const itemRef = this.doc(item.id);
    return updateDoc(itemRef, { order });
  }

  swap(a: ActionItem, b: ActionItem, onConflict: (aId: number) => number) {
    const aDoc = this.doc(a.id);
    const bDoc = this.doc(b.id);

    const nextAOrder = a.order === b.order ? onConflict(a.order) : b.order;
    const nextBOrder = a.order;

    return Promise.all([
      updateDoc(aDoc, { order: nextAOrder }),
      updateDoc(bDoc, { order: nextBOrder }),
    ]);
  }

  add(item: CreateActionItemDto) {
    return addDoc(this.collection, toActionItemDto(item));
  }

  doc(id: string) {
    return doc(this.collection, id);
  }

  async get(id: string) {
    const item = await getDoc(this.doc(id));
    return item.data();
  }

  toggle(_item: ActionItem): Promise<void> {
    throw Error('Not Implemented');
  }

  delete(id: string) {
    return deleteDoc(this.doc(id));
  }

  update(id: string, item: Partial<ActionItem>) {
    return updateDoc(this.doc(id), item);
  }

  subscribe(callback: (item: ActionItem[]) => void) {
    const collectionRef = this.collection;
    return onSnapshot(collectionRef, snapshot => {
      const items: ActionItem[] = [];
      snapshot.forEach(item => {
        const data = item.data();
        items.push(toActionItem(item.id, data));
      });

      sortActionItems(items);

      callback(items);
    });
  }
}
