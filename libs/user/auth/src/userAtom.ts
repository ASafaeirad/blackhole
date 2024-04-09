import type { Nullable } from '@fullstacksjs/toolbox';
import { bind } from '@fullstacksjs/toolbox';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { authClient } from './authClient';
import type { AuthState } from './AuthState';
import type { User } from './User';
import { toUser } from './User';

export const userAtom = atom<Nullable<User>>(undefined);
export const authStateAtom = atom<AuthState>('loading');

export function useSubscribeAuthState() {
  const setUser = useSetAtom(userAtom);
  const setAuthState = useSetAtom(authStateAtom);

  useEffect(() => {
    void authClient.authStateReady().then(() => {
      setAuthState('ready');
    });
  }, [setAuthState]);

  useEffect(() => {
    return authClient.onAuthStateChanged(user => {
      setUser(bind(user, toUser));
    });
  }, [setUser]);
}

export function useCurrentUser() {
  const [user] = useAtom(userAtom);
  return user;
}

export const getCurrentUser = () => {
  return bind(authClient.currentUser, toUser);
};

export const useAuthState = () => {
  const [state] = useAtom(authStateAtom);
  return { isReady: state === 'ready', isLoading: state === 'loading' };
};
