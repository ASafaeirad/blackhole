import type { Meta, StoryObj } from '@storybook/react';

import { Key } from '../Key';
import type { ButtonProps } from './Button';
import { Button } from './Button';
import { PointerButton } from './PointerButton';

export default {
  component: Button,
  render() {
    return <Button>Edit profile</Button>;
  },
} as Meta<ButtonProps>;

type Story = StoryObj<ButtonProps>;

export const Default: Story = {};

export const WithKey: Story = {
  render() {
    return (
      <Button>
        Edit profile <Key>e</Key>
      </Button>
    );
  },
};

export const PointerOnly: Story = {
  render() {
    return <PointerButton>Edit profile</PointerButton>;
  },
};
