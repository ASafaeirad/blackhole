import type { Meta, StoryObj } from '@storybook/react';

import { NavLink } from './NavLink';

export default {
  component: NavLink,
  args: {
    children: 'Link',
  },
} as Meta<typeof NavLink>;

type Story = StoryObj<typeof NavLink>;

export const Active: Story = {
  args: {
    to: '',
  },
};

export const Inactive: Story = {
  args: {
    to: '/',
  },
};
