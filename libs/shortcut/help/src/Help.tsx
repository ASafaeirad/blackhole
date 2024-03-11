import { Actions } from '@blackhole/actions';
import { Dialog } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
} from '@blackhole/keybinding-manager';
import { useAtom } from 'jotai';

import { HelpGroup } from './components/HelpGroup';
import { helpAtom } from './data/helpAtom';

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
      <Dialog.Content position="fixed" className="w-sm">
        <Dialog.Title>Help</Dialog.Title>
        <div className="fc gap-5">
          <HelpGroup title="Movement">
            <HelpGroup.Command keybinding="k">Go up</HelpGroup.Command>
            <HelpGroup.Command keybinding="j">Go down</HelpGroup.Command>
            <HelpGroup.Command keybinding="gg">
              Go to first item
            </HelpGroup.Command>
            <HelpGroup.Command keybinding="G">
              Go to last item
            </HelpGroup.Command>
            <HelpGroup.Command keybinding="alt+k">
              Move item up
            </HelpGroup.Command>
            <HelpGroup.Command keybinding="alt+j">
              Move item down
            </HelpGroup.Command>
          </HelpGroup>

          <HelpGroup title="Task">
            <HelpGroup.Command keybinding="c">Create task</HelpGroup.Command>
            <HelpGroup.Command keybinding="i">
              Edit task (caret start)
            </HelpGroup.Command>
            <HelpGroup.Command keybinding="a">
              Edit task (caret end)
            </HelpGroup.Command>
            <HelpGroup.Command keybinding="f">Toggle focus</HelpGroup.Command>
            <HelpGroup.Command keybinding=".">
              Toggle done visibility
            </HelpGroup.Command>
            <HelpGroup.Command keybinding="space">
              Toggle done
            </HelpGroup.Command>
            <HelpGroup.Command keybinding="d">Delete item</HelpGroup.Command>
          </HelpGroup>

          <HelpGroup title="Modal">
            <HelpGroup.Command keybinding="escape">
              Close modal
            </HelpGroup.Command>
          </HelpGroup>

          <HelpGroup title="Global">
            <HelpGroup.Command keybinding="h">Show help</HelpGroup.Command>
            <HelpGroup.Command keybinding="u">Undo</HelpGroup.Command>
          </HelpGroup>
        </div>
      </Dialog.Content>
    </Dialog>
  );
};
