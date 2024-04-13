import type { Meta, StoryObj } from '@storybook/react';

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
export const PointerOnly: Story = {
  render() {
    return <PointerButton>Edit profile</PointerButton>;
  },
};
