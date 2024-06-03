import type { CommandProps } from '@blackhole/design';
import { Command } from '@blackhole/design';
import type { Keybinding } from '@blackhole/keyflow';

interface Props {
  title: string;
  children: React.ReactNode;
}

const HelpItem = ({ title, children }: Props) => {
  return (
    <div className="fc gap-3">
      <span>{title}</span>
      <div className="fc gap-2">{children}</div>
    </div>
  );
};

const HelpCommand = (props: CommandProps) => {
  return <Command {...props} className="justify-between" />;
};

const toKeyName = (key: string) => {
  if (key === ' ') return 'Space';
  return key;
};

export const HelpGroup = ({
  title,
  items,
}: {
  title: string;
  items: Keybinding[];
}) => (
  <HelpItem title={title} key={title}>
    {items.map(item => (
      <HelpCommand
        keybinding={item.key.map(k => toKeyName(k))}
        key={item.mode + item.key.join(',')}
      >
        {item.description}
      </HelpCommand>
    ))}
  </HelpItem>
);
