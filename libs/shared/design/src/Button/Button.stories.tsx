import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

export default {
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Template: Story = {};
