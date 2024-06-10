import { signOut as firebaseSignOut } from 'firebase/auth';

import { authClient } from './firebase/authClient';

export function signOut() {
  return firebaseSignOut(authClient);
}
