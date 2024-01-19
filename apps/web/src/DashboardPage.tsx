import { useRegisterKeybinding } from '@blackhole/keybinding-manager';
import { useState } from 'react';

interface Block {
  id: string;
  text: string;
}

export const DashboardPage = () => {
  const [block, setBlock] = useState<Block>({ id: '1', text: 'hello' });
  const [editMode, setEditMode] = useState(true);

  useRegisterKeybinding({
    keys: ['Escape'],
    label: 'NormalMode',
    command: () => {
      setEditMode(false);
    },
  });

  return !editMode ? (
    <div key={block.id}>{block.text}</div>
  ) : (
    <input
      value={block.text}
      onChange={e => setBlock(b => ({ ...b, text: e.target.value }))}
    ></input>
  );
};
