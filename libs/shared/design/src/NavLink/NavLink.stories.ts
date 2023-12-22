import type { Meta, StoryObj } from '@storybook/vue3';
import { mockRouter, vueRouter } from 'storybook-vue3-router';

import NavLink from './NavLink.vue';

export default {
  component: NavLink,
  args: {
    to: '/foo',
  },
  render: args => ({
    components: { NavLink },
    setup: () => ({ args }),
    template: '<NavLink v-bind="args">NavLink</NavLink>',
  }),
} as Meta<typeof NavLink>;

type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
  decorators: [vueRouter(), mockRouter({})],
};
