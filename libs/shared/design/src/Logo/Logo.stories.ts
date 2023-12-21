import type { Meta, StoryObj } from '@storybook/vue3';

import Logo from './Logo.vue';

export default {
  component: Logo,
  render: args => ({
    components: { Logo },
    setup: () => ({ args }),
    template: '<Logo v-bind="args" />',
  }),
} as Meta<typeof Logo>;

type Story = StoryObj<typeof Logo>;

export const Template: Story = {};
