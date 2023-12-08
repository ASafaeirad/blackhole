import { Config } from '@fullstacksjs/config';

// TODO: Refactor after improve config API
export const config = new Config({
  supabaseUrl: Config.string().require(),
  supabaseAnonKey: Config.string().require(),
  debugScopes: Config.string(),
  debugLevel: Config.string(),
})
  .parse({
    supabaseUrl: import.meta.env['VITE_SUPABASE_URL'],
    supabaseAnonKey: import.meta.env['VITE_SUPABASE_ANON_KEY'],
    debugScopes: import.meta.env['VITE_DEBUG_SCOPE'],
    debugLevel: import.meta.env['VITE_DEBUG_LEVEL'],
  })
  .getAll();
