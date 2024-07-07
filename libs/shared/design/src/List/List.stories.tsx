import type { Meta, StoryObj } from '@storybook/react';

import type { ListProps } from './List';
import { List } from './List';

export default {
  component: List,
  render: () => (
    <List>
      <List.Item selected>Item 1</List.Item>
      <List.Item>Item 2</List.Item>
      <List.Item>Item 3</List.Item>
    </List>
  ),
} as Meta<ListProps>;

type Story = StoryObj<ListProps>;

export const Default: Story = {};
