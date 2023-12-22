import type { Meta, StoryObj } from '@storybook/vue3';
import { mockRouter, vueRouter } from 'storybook-vue3-router';

import RouterLink from './RouterLink.vue';

export default {
  component: RouterLink,
  args: { to: '/' },
  render: args => ({
    components: { RouterLink },
    setup: () => ({ args }),
    template: `<RouterLink v-bind="args">Link</RouterLink>`,
  }),
} as Meta<typeof RouterLink>;

type Story = StoryObj<typeof RouterLink>;

export const Default: Story = {
  decorators: [vueRouter(), mockRouter({})],
};
