import { signInWithPopup } from 'firebase/auth';

import { authClient, githubAuthProvider } from './authClient';
import { toUser } from './User';

export async function signIn() {
  if (authClient.currentUser) return toUser(authClient.currentUser);

  const credentials = await signInWithPopup(authClient, githubAuthProvider);
  return toUser(credentials.user);
}
