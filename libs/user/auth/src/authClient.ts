import { firebaseApp } from '@blackhole/firebase';
import { getAuth, GithubAuthProvider } from 'firebase/auth';

export const authClient = getAuth(firebaseApp);
export const githubAuthProvider = new GithubAuthProvider();
