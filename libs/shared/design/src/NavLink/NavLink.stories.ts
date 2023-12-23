import type { Meta, StoryObj } from '@storybook/react';

import { NavLink } from './NavLink';

export default {
  component: NavLink,
} as Meta<typeof NavLink>;

type Story = StoryObj<typeof NavLink>;

export const Default: Story = {};
