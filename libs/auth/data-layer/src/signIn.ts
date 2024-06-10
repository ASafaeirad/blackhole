import { signInWithPopup } from 'firebase/auth';

import { authClient, githubAuthProvider } from './firebase/authClient';
import { UserSdk } from './firebase/UserSdk';

export async function signIn() {
  if (authClient.currentUser)
    return new UserSdk(authClient.currentUser).getUser();

  const credentials = await signInWithPopup(authClient, githubAuthProvider);
  return new UserSdk(credentials.user).getUser();
}
