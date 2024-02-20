import { Config } from '@fullstacksjs/config';

export const config = new Config({
  scopes: Config.array(Config.string()),
  level: Config.string(),
});

config.parse({
  scopes: import.meta.env['VITE_DEBUG_SCOPE']?.split(',').filter(Boolean) ?? [],
  level: import.meta.env['VITE_DEBUG_LEVEL'],
});
