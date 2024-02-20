import type { Meta, StoryObj } from '@storybook/react';

import type { InputProps } from './Input';
import { Input } from './Input';

export default {
  component: Input,
} as Meta<InputProps>;

type Story = StoryObj<InputProps>;

export const Default: Story = {};
