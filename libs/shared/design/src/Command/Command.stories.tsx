import type { Meta, StoryObj } from '@storybook/react';

import type { CommandProps } from './Command';
import { Command } from './Command';

export default {
  component: Command,
  args: {
    keybinding: 'A',
    children: 'Command:',
  },
} as Meta<CommandProps>;

type Story = StoryObj<CommandProps>;

export const Default: Story = {};
