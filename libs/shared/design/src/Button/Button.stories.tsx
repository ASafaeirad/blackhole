import type { Meta, StoryObj } from '@storybook/vue3';

import Button from './Button.vue';

export default {
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
  render: args => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args">Button</Button>',
  }),
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Template: Story = {};
