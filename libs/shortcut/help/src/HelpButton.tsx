/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Key } from '@blackhole/design';
import { useSetAtom } from 'jotai';

import { helpAtom } from './data/helpAtom';

export const HelpButton = () => {
  const setOpen = useSetAtom(helpAtom);

  const openHelp = () => {
    setOpen(true);
  };

  return (
    <span className="color-muted" onClick={openHelp}>
      [ Show Help <Key>h</Key> ]
    </span>
  );
};
