import { Config } from '@fullstacksjs/config';

// TODO: Refactor after improve config API
export const config = new Config({
  supabase: Config.object({
    url: Config.string().required(),
    anonKey: Config.string().required(),
  }),
  debug: Config.object({
    scopes: Config.array(Config.string()),
    level: Config.string(),
  }),
});

/* eslint-disable @typescript-eslint/dot-notation */
config.parse({
  supabase: {
    url: import.meta.env['VITE_SUPABASE_URL'],
    anonKey: import.meta.env['VITE_SUPABASE_ANON_KEY'],
  },
  debug: {
    scopes:
      import.meta.env['VITE_DEBUG_SCOPE']?.split(',').filter(Boolean) ?? [],
    level: import.meta.env['VITE_DEBUG_LEVEL'],
  },
});
