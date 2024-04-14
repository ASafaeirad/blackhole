import type { Meta, StoryObj } from '@storybook/react';

import type { LoadingProps } from './Loading';
import { Loading } from './Loading';

export default {
  component: Loading,
} as Meta<LoadingProps>;

type Story = StoryObj<LoadingProps>;

export const Default: Story = {};
