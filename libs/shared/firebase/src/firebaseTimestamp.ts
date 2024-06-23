import type { Timestamp } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';

export const firebaseTimestamp = () => serverTimestamp() as Timestamp;

export const fromFirebaseTimestamp = (timestamp: Timestamp | null) => {
  if (timestamp?.seconds == null || isNaN(timestamp.seconds)) {
    return new Date();
  }

  return new Date(timestamp.seconds * 1000);
};
