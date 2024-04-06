import type { Mode } from '@blackhole/keyflow';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { managerAtom } from './managerAtom';

const empty: unknown[] = [];

export const useSubscribeAction = <T extends string>(
  action: T,
  callback: VoidFunction,
  deps: React.DependencyList = empty,
) => {
  const [manager] = useAtom(managerAtom);

  useEffect(
    () => manager?.subscribe(action, callback),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [action, manager, ...deps],
  );
};

export const useSubscribeActionOnMode = <T extends string>(
  action: T,
  mode: Mode,
  callback: VoidFunction,
  deps: React.DependencyList = empty,
) => {
  const [manager] = useAtom(managerAtom);

  useEffect(
    () =>
      manager?.subscribe(action, ({ mode: current }) => {
        if (current === mode) callback();
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [action, manager?.mode, mode, ...deps],
  );
};
