import { FirebaseSdk } from '@blackhole/firebase';
import type { User as FirebaseUser } from 'firebase/auth';
import { getDoc, onSnapshot } from 'firebase/firestore';

import type { User } from '../models';
import { authClient } from './authClient';
import type { DbUser } from './UserDto';
import { toUser } from './UserDto';

export class UserSdk extends FirebaseSdk<DbUser> {
  private _authUser: FirebaseUser;

  public constructor(user: FirebaseUser) {
    super('users');
    this._authUser = user;
  }

  public static fromAuthClient() {
    const user = authClient.currentUser;
    if (!user) throw new Error('User not authenticated');
    return new UserSdk(user);
  }

  public currentUserDoc() {
    return this.doc(this._authUser.uid);
  }

  public async getUser(): Promise<User> {
    const ref = await getDoc(this.currentUserDoc());
    return toUser({
      id: ref.id,
      ...ref.data()!,
      displayName: this._authUser.displayName,
    });
  }

  public async addExperience(exp: number) {
    const user = await this.getUser();
    const newExp = Math.max(user.experience + exp, 0);
    return this.update(this._authUser.uid, { experience: newExp });
  }

  public async removeExperience(exp: number) {
    return this.addExperience(-exp);
  }

  public subscribe(callback: (user: User) => void) {
    return onSnapshot(this.currentUserDoc(), async () => {
      const user = await this.getUser();
      callback(user);
    });
  }
}
