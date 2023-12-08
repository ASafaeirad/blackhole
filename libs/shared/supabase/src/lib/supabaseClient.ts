import { config } from '@blackhole/config';
import { createClient } from '@supabase/supabase-js';

export const supabaseClient = createClient(
  config.supabaseUrl,
  config.supabaseAnonKey,
);
