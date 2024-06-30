import type { CollectionReference } from 'firebase/firestore';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

import { firestore } from './firebase';

export class FirebaseSdk<T> {
  protected _collection: CollectionReference<T>;

  public constructor(path: string, ...pathSegments: string[]) {
    this._collection = collection(
      firestore,
      path,
      ...pathSegments,
    ) as CollectionReference<T>;
  }

  public get collection() {
    return this._collection;
  }

  public doc(id: string) {
    return doc(this.collection, id);
  }

  public get(id: string) {
    return getDoc(this.doc(id));
  }

  public delete(id: string) {
    return deleteDoc(this.doc(id));
  }

  public set(id: string, item: T) {
    return setDoc(this.doc(id), item);
  }

  public update(id: string, item: Partial<T>) {
    return updateDoc(this.doc(id), item);
  }
}
