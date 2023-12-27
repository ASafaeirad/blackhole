import { config } from '@blackhole/config';
import { createClient } from '@supabase/supabase-js';

import type { Database } from './Database';

export const supabaseClient = createClient<Database>(
  config.supabase.url,
  config.supabase.anonKey,
);
