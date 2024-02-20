import { createClient } from '@supabase/supabase-js';

import type { Database } from './Database';
import { config } from './supabase.config';

export const supabaseClient = createClient<Database>(
  config.get('url'),
  config.get('anonKey'),
);
