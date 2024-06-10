import type { Nullable } from '@fullstacksjs/toolbox';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { authClient } from '../firebase/authClient';
import { UserSdk } from '../firebase/UserSdk';
import type { AuthState } from '../models/AuthState';
import type { User } from '../models/User';

export const userAtom = atom<Nullable<User>>(undefined);
export const authStateAtom = atom<AuthState>('loading');

export function useSubscribeAuthState() {
  const [user, setUser] = useAtom(userAtom);
  const setAuthState = useSetAtom(authStateAtom);

  useEffect(() => {
    void authClient.authStateReady().then(() => {
      setAuthState('ready');
    });
  }, [setAuthState]);

  useEffect(() => {
    return authClient.onAuthStateChanged(async authUser => {
      if (!authUser) {
        setUser(null);
        return;
      }

      const sdk = new UserSdk(authUser);
      const newUser = await sdk.getUser();
      setUser(newUser);
    });
  }, [setUser]);

  useEffect(() => {
    const userSdk = UserSdk.fromAuthClient();
    return userSdk.subscribe(setUser);
  }, [setUser, user]);
}

export function useCurrentUser() {
  const [user] = useAtom(userAtom);
  return user;
}

export const getCurrentUser = () => {
  if (!authClient.currentUser) return undefined;
  const sdk = UserSdk.fromAuthClient();
  return sdk.getUser();
};

export const getCurrentUserId = () => {
  return authClient.currentUser?.uid;
};

export const useAuthState = () => {
  const [state] = useAtom(authStateAtom);
  return { isReady: state === 'ready', isLoading: state === 'loading' };
};
