import type { Meta, StoryObj } from '@storybook/react';

import type { SeparatorProps } from './Separator';
import { Separator } from './Separator';

export default {
  component: Separator,
} as Meta<SeparatorProps>;

type Story = StoryObj<SeparatorProps>;

export const Default: Story = {};

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: args => (
    <div className="flex flex-col gap-2 w-[100px] items-center">
      <div>First</div>
      <Separator {...args} />
      <div>Second</div>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  render: args => (
    <div className="flex gap-2 h-[40px] w-2xl items-center">
      <div>First</div>
      <Separator {...args} />
      <div>Second</div>
    </div>
  ),
};
