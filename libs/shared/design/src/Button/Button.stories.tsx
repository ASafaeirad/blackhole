import type { Meta, StoryObj } from '@storybook/html';

import { Button } from './Button';

export default {
  component: Button,
  args: {
    children: 'Button',
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
