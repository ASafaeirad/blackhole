import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'react-aria-components';

import type { ModalProps } from './Modal';
import { Modal } from './Modal';

export default {
  component: Modal,
} as Meta<ModalProps>;

type Story = StoryObj<ModalProps>;

export const Default: Story = {
  render() {
    return (
      <Modal.Trigger>
        <Button>Edit profile</Button>
        <Modal>
          {({ close }) => (
            <Modal.Content position="fixed">
              <>
                <Modal.Title className="text-title">Edit profile</Modal.Title>
                <div>Make changes to your profile here. Click save.</div>
                <div className="flex justify-end">
                  <Button onPress={close}>Save changes</Button>
                </div>
              </>
            </Modal.Content>
          )}
        </Modal>
      </Modal.Trigger>
    );
  },
};
