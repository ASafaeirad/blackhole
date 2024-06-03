import { Actions, keyMaps } from '@blackhole/actions';
import { Button, Dialog } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { useAtom } from 'jotai';

import { HelpGroup } from './components/HelpGroup';
import { helpAtom } from './data/helpAtom';

const helpGroups = Object.entries(
  Object.groupBy(Object.values(keyMaps), item => item.group),
);

export const Help = () => {
  const [isOpen, setIsOpen] = useAtom(helpAtom);
  const setMode = useSetMode();

  useSubscribeAction(Actions.ShowHelp, () => {
    setIsOpen(true);
    setMode(Mode.Overlay);
  });

  useSubscribeAction(Actions.CloseModal, () => {
    setIsOpen(false);
    setMode(Mode.Normal);
  });

  return (
    <Dialog open={isOpen}>
      <Dialog.Content position="fixed" className="w-md">
        <Dialog.Title>Help</Dialog.Title>
        <div className="fc gap-5">
          {helpGroups.map(([title, items]) => (
            <HelpGroup title={title} items={items!} key={title} />
          ))}

          <Button onPress={() => setIsOpen(false)}>Close</Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
