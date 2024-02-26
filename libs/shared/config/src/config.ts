import { Config } from '@fullstacksjs/config';

export const config = new Config({
  version: Config.string(),
});

config.parse({
  version: import.meta.env['VITE_VERSION'] ?? 'dev',
});
