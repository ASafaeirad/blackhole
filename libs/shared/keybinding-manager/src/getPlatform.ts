export enum Platform {
  Mac = 'mac',
  Windows = 'win',
  Linux = 'linux',
  All = 'all',
}

export function getPlatform(): Platform {
  const userAgentData = (navigator as any).userAgentData;
  return userAgentData?.platform ?? Platform.Linux;
}
