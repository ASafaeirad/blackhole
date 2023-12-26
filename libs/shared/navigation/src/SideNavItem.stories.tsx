import type { Meta, StoryObj } from '@storybook/react';

import { SideNavItem } from './SideNavItem';

export default {
  component: SideNavItem,
} as Meta<typeof SideNavItem>;

type Story = StoryObj<typeof SideNavItem>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Active: Story = {
  args: {
    children: 'Active',
  },
};

export const Inactive: Story = {
  args: {
    children: 'Inactive',
    to: '/projects',
  },
};
