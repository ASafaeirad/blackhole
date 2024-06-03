import { cn } from '@blackhole/cn';

import { Key } from '../Key';

export interface CommandProps {
  keybinding: string[];
  children?: React.ReactNode;
  className?: string;
}

export const Command = ({ children, keybinding, className }: CommandProps) => {
  return (
    <code
      className={cn('color-muted inline-flex gap-2 items-center', className)}
    >
      {children}
      <div className="fr gap-2">
        {keybinding.map(binding => (
          <Key key={binding}>{binding}</Key>
        ))}
      </div>
    </code>
  );
};
