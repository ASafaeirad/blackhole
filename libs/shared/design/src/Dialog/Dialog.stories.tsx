import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import type { DialogProps } from './Dialog';
import { Dialog } from './Dialog';

export default {
  component: Dialog,
} as Meta<DialogProps>;

type Story = StoryObj<DialogProps>;

export const Default: Story = {
  render() {
    return (
      <Dialog>
        <Dialog.Trigger asChild>
          <Button>Edit profile</Button>
        </Dialog.Trigger>
        <Dialog.Content className="fc absolute-center px-7 py-6 bg-elevated border rounded-md gap-5 fixed">
          <Dialog.Title className="text-title">Edit profile</Dialog.Title>
          <Dialog.Description className="color-muted">
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <div className="flex justify-end">
            <Dialog.Close asChild>
              <Button>Save changes</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog>
    );
  },
};
