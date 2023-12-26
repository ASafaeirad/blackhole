import type { Meta, StoryObj } from '@storybook/react';

import { Logo } from './Logo';

export default {
  component: Logo,
} as Meta<typeof Logo>;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {};
