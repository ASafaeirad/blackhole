import { firestore } from '@blackhole/firebase';
import type { User as FirebaseUser } from 'firebase/auth';
import type { CollectionReference } from 'firebase/firestore';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

import type { User } from '../models';
import { authClient } from './authClient';
import type { DbUser } from './UserDto';
import { toUser } from './UserDto';

export class UserSdk {
  private _collection: CollectionReference<DbUser>;
  private _authUser: FirebaseUser;

  constructor(user: FirebaseUser) {
    this._authUser = user;

    this._collection = collection(
      firestore,
      'users',
    ) as CollectionReference<DbUser>;
  }

  static fromAuthClient() {
    const user = authClient.currentUser;
    if (!user) throw new Error('User not authenticated');
    return new UserSdk(user);
  }

  get collection() {
    return this._collection;
  }

  doc() {
    return doc(this.collection, this._authUser.uid);
  }

  async getUser(): Promise<User> {
    const ref = await getDoc(this.doc());
    return toUser({
      id: ref.id,
      ...ref.data()!,
      displayName: this._authUser.displayName,
    });
  }

  async update(user: Partial<DbUser>) {
    return updateDoc(this.doc(), user);
  }

  async addExperience(exp: number) {
    const user = await this.getUser();
    const newExp = Math.max(user.experience + exp, 0);
    return this.update({ experience: newExp });
  }

  async removeExperience(exp: number) {
    return this.addExperience(-exp);
  }

  subscribe(callback: (user: User) => void) {
    return onSnapshot(this.doc(), async () => {
      const user = await this.getUser();
      callback(user);
    });
  }
}
