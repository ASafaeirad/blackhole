import { config } from '@blackhole/config';

import type { DebugScopes, LogLevel } from './Debug';
import { Debug } from './Debug';

export * from './Debug';
export const debug = new Debug(
  console,
  config.debug.level as LogLevel | undefined,
  config.debug.scopes?.split(',') as DebugScopes[], // eslint-disable-line @typescript-eslint/no-unnecessary-condition
  'background-color: #4c6ef5; padding: 4px 8px; color: white;',
);
