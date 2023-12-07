import type { Meta, StoryObj } from '@storybook/vue3';

import Button from './Button.vue';

export default {
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
