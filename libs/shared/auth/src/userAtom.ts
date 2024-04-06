import type { Nullable } from '@fullstacksjs/toolbox';
import { bind } from '@fullstacksjs/toolbox';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { authClient } from './authClient';
import type { User } from './User';
import { toUser } from './User';

export const userAtom = atom<Nullable<User>>(undefined);

export function useSubscribeAuthState() {
  const setUser = useSetAtom(userAtom);

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
