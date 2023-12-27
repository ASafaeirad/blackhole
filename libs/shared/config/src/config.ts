import { Config } from '@fullstacksjs/config';

// TODO: Refactor after improve config API
export const config = new Config({
  supabase: Config.object({
    url: Config.string().require(),
    anonKey: Config.string().require(),
  }),
  debug: Config.object({
    scopes: Config.string(),
    level: Config.string(),
  }),
})
  .parse({
    supabase: {
      url: import.meta.env['VITE_SUPABASE_URL'],
      anonKey: import.meta.env['VITE_SUPABASE_ANON_KEY'],
    },
    debug: {
      scopes: import.meta.env['VITE_DEBUG_SCOPE'],
      level: import.meta.env['VITE_DEBUG_LEVEL'],
    },
  })
  .getAll();
