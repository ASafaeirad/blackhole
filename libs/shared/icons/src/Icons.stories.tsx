import type { Meta, StoryObj } from '@storybook/react';

import type { IconName, IconProps } from './Icon';
import { Icon, icons } from './Icon';

const names = Object.keys(icons) as IconName[];

export default {
  component: Icon,
  render(args) {
    return (
      <div className="fr px-4 py-3 gap-4">
        {names.map(name => (
          <div
            key={name}
            className="fc center border border-idle rounded border-dotted gap-3 h-[70px] w-[70px] cursor-pointer hover:bg-elevated"
          >
            <Icon {...args} icon={name} />
            <span className="text-small color-muted">{name}</span>
          </div>
        ))}
      </div>
    );
  },
} as Meta<IconProps>;

type Story = StoryObj<IconProps>;

export const Default: Story = {};
