import type { DebugScopes, LogLevel } from './Debug';
import { Debug } from './Debug';
import { config } from './Debug.config';

export * from './Debug';
export const debug = new Debug(
  console,
  config.get('level') as LogLevel | undefined,
  config.get('scopes') as DebugScopes[],
  'background-color: #4c6ef5; padding: 4px 8px; color: white;',
);
