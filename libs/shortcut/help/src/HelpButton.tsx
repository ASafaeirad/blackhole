import { Key, PointerButton } from '@blackhole/design';
import { useSetAtom } from 'jotai';

import { helpAtom } from './data/helpAtom';

export const HelpButton = () => {
  const setOpen = useSetAtom(helpAtom);

  const openHelp = () => {
    setOpen(true);
  };

  return (
    <PointerButton onClick={openHelp}>
      Show Help <Key>h</Key>
    </PointerButton>
  );
};
