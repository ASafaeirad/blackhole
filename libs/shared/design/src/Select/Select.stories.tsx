import { clamp } from '@fullstacksjs/toolbox';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { SelectProps } from './Select';
import { Select } from './Select';

export default {
  component: Select,
  args: {
    title: 'Select Item',
    emptyState: 'No Item',
    items: [],
    open: true,
    selected: 0,
  },
} as Meta<SelectProps>;

type Story = StoryObj<SelectProps>;

export const Default: Story = {};
export const WithItems: Story = {
  render: props => {
    const [selected, setSelected] = useState(0);

    return (
      <Select
        onKeyDown={e => {
          if (e.key === 'j')
            setSelected(s => clamp(s + 1, 0, props.items.length - 1));
          if (e.key === 'k')
            setSelected(s => clamp(s - 1, 0, props.items.length - 1));
        }}
        {...props}
        selected={selected}
      />
    );
  },
  args: {
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
};
