import { signInWithPopup } from 'firebase/auth';

import { authClient, githubAuthProvider } from './authClient';
import { toUser } from './User';

export async function signIn() {
  const credentials = await signInWithPopup(authClient, githubAuthProvider);
  return toUser(credentials.user);
}
