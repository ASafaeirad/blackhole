import type { CommandProps } from '@blackhole/design';
import { Command } from '@blackhole/design';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const HelpGroup = ({ title, children }: Props) => {
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

HelpGroup.Command = HelpCommand;
