import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useRef, useState } from 'react';

import type { SelectProps, SelectRef } from './Select';
import { Select } from './Select';

export default {
  component: Select,
  parameters: {
    chromatic: { delay: 500 },
  },
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
        <div>
          Selected: <span data-testid="selected">{selected}</span>
        </div>
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

  play: async ({ canvasElement, step }) => {
    const root = within(canvasElement.parentElement!);
    const dialog = await root.findByRole('dialog');

    await step('Open dialog', async () => {
      await expect(dialog).toBeInTheDocument();
    });

    await step('Have auto focus', async () => {
      const input = await within(dialog).findByRole('textbox');
      await expect(input).toHaveFocus();
    });

    await step('Have first option selected', async () => {
      const items = await within(dialog).findAllByRole('option');
      await expect(items).toHaveLength(3);
      await expect(items[0]).toHaveAttribute('aria-selected', 'true');
    });

    await step('Focus next with alt+j', async () => {
      const items = await within(dialog).findAllByRole('option');
      await userEvent.keyboard('{Alt>}j{/Alt>}');
      await expect(items[1]).toHaveAttribute('aria-selected', 'true');
    });

    await step('Focus prev with alt+k', async () => {
      const items = await within(dialog).findAllByRole('option');
      await userEvent.keyboard('{Alt>}k{/Alt>}');
      await expect(items[0]).toHaveAttribute('aria-selected', 'true');
    });

    await step('Filter', async () => {
      const input = await within(dialog).findByRole('textbox');
      await userEvent.type(input, '2');
      const filtered = await within(dialog).findAllByRole('option');
      await expect(filtered).toHaveLength(1);
    });
  },
};

export const WithOptionLabel: Story = {
  render: props => {
    const ref = useRef<SelectRef>(null);
    const [selected, setSelected] = useState('');

    return (
      <>
        <div>
          Selected: <span data-testid="selected">{selected}</span>
        </div>
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
    items: ['v-1', 'v-2', 'v-3'],
    getOptionLabel: (option: string) => option.replace('v-', 'Item '),
  },

  play: async ({ canvasElement, step }) => {
    const root = within(canvasElement.parentElement!);
    const dialog = await root.findByRole('dialog');

    await step('Filter', async () => {
      const input = await within(dialog).findByRole('textbox');
      await userEvent.type(input, 'Item 2');
      const filtered = await within(dialog).findAllByRole('option');
      await expect(filtered).toHaveLength(1);
      await expect(filtered[0]).toHaveTextContent('Item 2');
    });
  },
};
