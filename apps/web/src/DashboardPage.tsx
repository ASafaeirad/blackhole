import { useSubscribeAction } from '@blackhole/keybinding-manager';
import { useState } from 'react';

import type { Action } from './App';

interface Block {
  id: string;
  text: string;
}

export const DashboardPage = () => {
  const [block, setBlock] = useState<Block>({ id: '1', text: 'hello' });
  const [editMode, setEditMode] = useState(true);

  useSubscribeAction<Action>('GoToEditMode', () => setEditMode(true));
  useSubscribeAction<Action>('GoToNormalMode', () => setEditMode(false));

  return !editMode ? (
    <div key={block.id}>{block.text}</div>
  ) : (
    <input
      value={block.text}
      onChange={e => setBlock(b => ({ ...b, text: e.target.value }))}
    ></input>
  );
};
