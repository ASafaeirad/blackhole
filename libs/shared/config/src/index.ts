import { Config } from '@fullstacksjs/config';

export const config = new Config({
  supabaseUrl: Config.string().require(),
  supabaseAnonKey: Config.string().require(),
})
  .parse({
    supabaseUrl: import.meta.env['VITE_SUPABASE_URL'],
    supabaseAnonKey: import.meta.env['VITE_SUPABASE_ANON_KEY'],
  })
  .getAll();
