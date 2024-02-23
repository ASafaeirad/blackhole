import { Actions } from '@blackhole/actions';
import { Command, Dialog } from '@blackhole/design';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import { useState } from 'react';

export const Help = () => {
  const [isOpen, setIsOpen] = useState(false);

  useSubscribeAction(Actions.ShowHelp, () => {
    setIsOpen(true);
  });

  useSubscribeAction(Actions.CloseModal, () => {
    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen}>
      <Dialog.Content position="fixed">
        <Dialog.Title>Help</Dialog.Title>
        <Dialog.Description className="fc">
          <Command keybinding="h">Show help</Command>
          <Command keybinding="c">Create task</Command>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog>
  );
};
