import { signOut as firebaseSignOut } from 'firebase/auth';

import { authClient } from './authClient';

export function signOut() {
  return firebaseSignOut(authClient);
}
