import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import type { SelectProps, SelectRef } from './Select';
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
    const ref = useRef<SelectRef>(null);
    const [selected, setSelected] = useState('');

    return (
      <>
        <div>Selected: {selected}</div>
        <Select
          onKeyDown={e => {
            if (e.key === 'j' && e.altKey) ref.current?.selectNext();
            if (e.key === 'k' && e.altKey) ref.current?.selectPrev();
          }}
          onSelect={item => setSelected(item)}
          ref={ref}
          {...props}
        />
      </>
    );
  },
  args: {
    items: ['Item 1', 'Item 2', 'Item 3'],
  },
};
