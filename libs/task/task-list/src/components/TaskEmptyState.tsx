import { Command } from '@blackhole/design';

export const TaskEmptyState = () => {
  return (
    <div className="fc center gap-4 h-screen">
      <Command keybinding="c">Create Project</Command>
    </div>
  );
};
