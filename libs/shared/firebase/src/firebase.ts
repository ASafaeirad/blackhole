import { initializeApp } from 'firebase/app';

import { config } from './config';

export const firebaseApp = initializeApp(config.getAll());
