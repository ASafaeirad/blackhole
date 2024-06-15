import { debug } from '@blackhole/debug';
import type { Timestamp } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

export const firebaseTimestamp = () => serverTimestamp() as Timestamp;

export const fromFirebaseTimestamp = (timestamp: Timestamp) => {
  if (!timestamp.seconds) {
    debug.warn('Invalid timestamp', timestamp);
    return new Date();
  }

  return new Date(timestamp.seconds * 1000);
};
