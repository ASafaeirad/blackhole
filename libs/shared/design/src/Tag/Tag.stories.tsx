import type { Meta, StoryObj } from '@storybook/react';

import type { TagProps } from './Tag';
import { Tag } from './Tag';

export default {
  component: Tag,
} as Meta<TagProps>;

type Story = StoryObj<TagProps>;

export const Default: Story = {};
