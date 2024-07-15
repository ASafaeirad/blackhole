import { Actions, keyMaps } from '@blackhole/actions';
import { Button, Modal } from '@blackhole/design';
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
  return (
    <Modal action={Actions.ShowHelp}>
      {({ close }) => (
        <Modal.Content position="fixed" className="w-md">
          <Modal.Title>Help</Modal.Title>
          <div className="fc gap-5">
            {helpGroups.map(([title, items]) => (
              <HelpGroup title={title} items={items!} key={title} />
            ))}

            <Button onPress={() => close()}>Close</Button>
          </div>
        </Modal.Content>
      )}
    </Modal>
  );
};
