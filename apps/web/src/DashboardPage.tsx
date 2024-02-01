import { cn } from '@blackhole/cn';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import { useRef, useState } from 'react';

import type { Action } from './App';

interface Block {
  id: string;
  text: string;
}

export const DashboardPage = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    { id: '1', text: 'hello' },
    { id: '2', text: 'hello' },
    { id: '3', text: 'hello' },
  ]);
  const [editMode, setEditMode] = useState(0);
  const [index, setIndex] = useState(-1);
  const ref = useRef<HTMLInputElement>(null);

  useSubscribeAction<Action>(
    'GoToEditMode',
    () => {
      setEditMode(index);
      setTimeout(() => {
        ref.current?.focus();
      }, 100);
    },
    [index],
  );
  useSubscribeAction<Action>('GoToNormalMode', () => setEditMode(-1));
  useSubscribeAction<Action>('MoveNextBlock', () => setIndex(i => i + 1));
  useSubscribeAction<Action>('MovePrevBlock', () => setIndex(i => i - 1));

  return (
    <div className="fc gap-2 items-start">
      {blocks.map((block, i) =>
        editMode !== i ? (
          <div
            className={cn({
              'border-solid border-green border': i === index,
            })}
            key={block.id}
          >
            {block.text}
          </div>
        ) : (
          <input
            ref={ref}
            value={block.text}
            onChange={e => {
              const newBlocks = [...blocks];
              newBlocks[i] = { ...newBlocks[i], text: e.target.value };
              setBlocks(newBlocks);
            }}
          ></input>
        ),
      )}
    </div>
  );
};
