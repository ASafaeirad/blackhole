import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { config } from './config';

export const firebaseApp = initializeApp(config.getAll());
export const firestore = getFirestore(firebaseApp);
