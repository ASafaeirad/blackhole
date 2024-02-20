import { Config } from '@fullstacksjs/config';

export const config = new Config({
  url: Config.string().required(),
  anonKey: Config.string().required(),
});

config.parse({
  url: import.meta.env['VITE_SUPABASE_URL'],
  anonKey: import.meta.env['VITE_SUPABASE_ANON_KEY'],
});
