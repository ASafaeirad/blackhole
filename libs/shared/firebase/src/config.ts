import { Config } from '@fullstacksjs/config';

export const config = new Config({
  apiKey: Config.string().required(),
  authDomain: Config.string().required(),
  projectId: Config.string().required(),
  storageBucket: Config.string().required(),
  messagingSenderId: Config.string().required(),
  appId: Config.string().required(),
});

config.parse({
  apiKey: import.meta.env['VITE_FIREBASE_API_KEY'],
  authDomain: import.meta.env['VITE_FIREBASE_AUTH_DOMAIN'],
  projectId: import.meta.env['VITE_FIREBASE_PROJECT_ID'],
  storageBucket: import.meta.env['VITE_FIREBASE_STORAGE_BUCKET'],
  messagingSenderId: import.meta.env['VITE_FIREBASE_MESSAGING_SENDER_ID'],
  appId: import.meta.env['VITE_FIREBASE_APP_ID'],
});
