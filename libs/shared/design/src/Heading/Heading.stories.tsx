import type { Meta, StoryObj } from '@storybook/react';

import type { HeadingProps } from './Heading';
import { Heading } from './Heading';

export default {
  component: Heading,
  args: {
    children: 'Hello, World!',
  },
} as Meta<HeadingProps>;

type Story = StoryObj<HeadingProps>;

export const Default: Story = {};
