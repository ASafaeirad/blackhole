import { config } from '@blackhole/config';

import type { DebugScopes, LogLevel } from './Debug';
import { Debug } from './Debug';

export * from './Debug';
export const debug = new Debug(
  console,
  config.debugLevel as LogLevel | undefined,
  config.debugScopes?.split(',') as DebugScopes[],
  'background-color: #4c6ef5; padding: 4px 8px; color: white;',
);
