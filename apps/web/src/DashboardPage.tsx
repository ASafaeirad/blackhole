import { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import { useSubscribeAction } from '@blackhole/keybinding-manager';
import { clamp } from '@fullstacksjs/toolbox';
import { useRef, useState } from 'react';

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

  useSubscribeAction(
    Actions.GoToEditMode,
    () => {
      setEditMode(index);
      setTimeout(() => {
        ref.current?.focus();
      }, 100);
    },
    [index],
  );

  useSubscribeAction(Actions.GoToNormalMode, () => {
    setEditMode(-1);
  });

  useSubscribeAction(Actions.MoveNextBlock, () => {
    setIndex(i => clamp(i + 1, 0, 2));
  });

  useSubscribeAction(Actions.MovePrevBlock, () => {
    setIndex(i => clamp(i - 1, 0, 2));
  });

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
