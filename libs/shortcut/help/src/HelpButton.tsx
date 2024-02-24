import type { ButtonProps } from '@blackhole/design';
import { Button, Key } from '@blackhole/design';
import { useSetAtom } from 'jotai';

import { helpAtom } from './data/helpAtom';

export const HelpButton = (props: ButtonProps) => {
  const setOpen = useSetAtom(helpAtom);

  const openHelp = () => {
    setOpen(true);
  };

  return (
    <Button onPress={openHelp} {...props}>
      Show Help <Key>h</Key>
    </Button>
  );
};
