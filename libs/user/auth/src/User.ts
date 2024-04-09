import type { User as FirebaseUser } from 'firebase/auth';

export interface User {
  id: string;
  name: string;
}

export function toUser(user: FirebaseUser): User {
  return {
    id: user.uid,
    name: user.displayName ?? 'Anonymous',
  };
}
