import type { Meta, StoryObj } from '@storybook/react';

import type { KeyProps } from './Key';
import { Key } from './Key';

export default {
  component: Key,
  args: {
    children: 'A',
  },
} as Meta<KeyProps>;

type Story = StoryObj<KeyProps>;

export const Default: Story = {};
