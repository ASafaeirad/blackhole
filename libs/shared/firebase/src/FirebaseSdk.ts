import type { CollectionReference } from 'firebase/firestore';
import { collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';

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

  protected get collection() {
    return this._collection;
  }

  protected doc(id: string) {
    return doc(this.collection, id);
  }

  protected get(id: string) {
    return doc(this.collection, id);
  }

  protected delete(id: string) {
    return deleteDoc(this.doc(id));
  }

  protected update(id: string, item: Partial<T>) {
    return updateDoc(this.doc(id), item);
  }
}
