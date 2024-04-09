import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { managerAtom } from './managerAtom';

export const KeybindingProvider = ({ children }: React.PropsWithChildren) => {
  const [manager] = useAtom(managerAtom);
  useEffect(() => manager?.register(document), [manager]);

  return children;
};
