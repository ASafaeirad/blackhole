import type { Meta, StoryObj } from '@storybook/react';

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
        <Dialog.Trigger>Edit profile</Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title className="text-title">Edit profile</Dialog.Title>
          <div>Make changes to your profile here. Click save.</div>
          <div className="flex justify-end">
            <Dialog.Close>Save changes</Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog>
    );
  },
};
