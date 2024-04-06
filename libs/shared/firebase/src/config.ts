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
  apiKey: import.meta.env['VITE_API_KEY'],
  authDomain: import.meta.env['VITE_AUTH_DOMAIN'],
  projectId: import.meta.env['VITE_PROJECT_ID'],
  storageBucket: import.meta.env['VITE_STORAGE_BUCKET'],
  messagingSenderId: import.meta.env['VITE_MESSAGING_SENDER_ID'],
  appId: import.meta.env['VITE_APP_ID'],
});
