import { Key } from '../Key';

export interface CommandProps {
  keybinding: string;
  children?: React.ReactNode;
}

export const Command = ({ children, keybinding }: CommandProps) => {
  return (
    <code className="color-muted inline-flex gap-2 items-center">
      {children}
      <Key>{keybinding}</Key>
    </code>
  );
};
