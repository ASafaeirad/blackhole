import { parseDate } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';

import type { CalendarProps } from './Calendar';
import { Calendar } from './Calendar';

export default {
  component: Calendar,
} as Meta<CalendarProps>;

type Story = StoryObj<CalendarProps>;

export const Default: Story = {
  args: {
    defaultValue: parseDate('2000-01-01'),
  },
  play: async ({ canvasElement, step }) => {
    const selected = await within(canvasElement).findByRole('gridcell', {
      selected: true,
    });

    await step('Default value', async () => {
      await expect(selected).toHaveTextContent('1');
      const focused = within(canvasElement).getByLabelText(
        'Saturday, January 1, 2000 selected',
      );
      await expect(focused).toHaveAttribute('tabindex', '0');
    });
  },
};
