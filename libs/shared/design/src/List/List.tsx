import { Actions } from '@blackhole/actions';
import { cn } from '@blackhole/cn';
import { useKeyFlowContext } from '@blackhole/keybinding-manager';
import type { MaybePromise } from '@fullstacksjs/toolbox';
import { clamp, isFunction } from '@fullstacksjs/toolbox';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useFocusManager } from 'react-aria';

import { Transition } from '../Transition';

export type ListProps<T> = Omit<
  React.ComponentProps<'ol'>,
  'className' | 'onFocus'
> & {
  items: T[];
  getKey: (item: T) => number | string;
  renderItem: (props: {
    item: T;
    ref: HTMLLIElement | undefined;
  }) => React.ReactNode;
  children?: React.ReactNode;
  onMoveUp?: (item: T) => MaybePromise<void>;
  onMoveDown?: (item: T) => MaybePromise<void>;
  onMoveToFirst?: (item: T) => MaybePromise<void>;
  onMoveToLast?: (item: T) => MaybePromise<void>;
  onFocus?: (e: React.FocusEvent<HTMLLIElement>, item: T) => void;
  className?: string;
  itemClassName?: string | ((item: T) => string);
};

const ListItem = ({ className, ...props }: ListItemProps) => (
  <li
    {...props}
    className={cn(
      'fr text-body gap-3 items-start focus:color-primary color-muted outline-none',
      className,
    )}
  />
);

export const List = <T,>({
  items,
  getKey,
  renderItem,
  children,
  onMoveDown,
  onMoveUp,
  onMoveToFirst,
  onMoveToLast,
  onFocus,
  itemClassName,
  ...props
}: ListProps<T>) => {
  const focusManager = useFocusManager();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const ref = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    if (props.autoFocus) focusManager?.focusNext();
  }, [focusManager, props.autoFocus]);

  const selectedItem = items[currentItemIndex] as T;

  const { keyHandler } = useKeyFlowContext({
    [Actions.FocusPrevBlock]: () => focusManager?.focusPrevious({ wrap: true }),
    [Actions.FocusNextBlock]: () => focusManager?.focusNext({ wrap: true }),
    [Actions.FocusFirstBlock]: () => focusManager?.focusFirst(),
    [Actions.FocusLastBlock]: () => focusManager?.focusLast(),
    [Actions.MoveDown]: async () => {
      setCurrentItemIndex(prev => clamp(prev + 1, 0, items.length - 1));
      await onMoveDown?.(selectedItem);
    },

    [Actions.MoveUp]: async () => {
      setCurrentItemIndex(prev => clamp(prev - 1, 0, items.length - 1));
      await onMoveUp?.(selectedItem);
    },
    [Actions.MoveToFirstBlock]: () => onMoveToFirst?.(selectedItem),
    [Actions.MoveToLastBlock]: () => onMoveToLast?.(selectedItem),
  });

  return (
    <div onKeyDown={keyHandler}>
      <ol
        {...props}
        data-type="list"
        className={cn(
          'fc scrollbar flex-1 gap-6 overflow-x-auto',
          props.className,
        )}
      >
        <AnimatePresence>
          {items.map((item, index) => (
            <Transition key={getKey(item)}>
              <ListItem
                className={
                  isFunction(itemClassName)
                    ? itemClassName(item)
                    : itemClassName
                }
                tabIndex={0}
                ref={e => {
                  ref.current[index] = e!;
                }}
                onFocus={e => {
                  setCurrentItemIndex(index);
                  onFocus?.(e, item);
                }}
              >
                {renderItem({ ref: ref.current[index], item })}
              </ListItem>
            </Transition>
          ))}
        </AnimatePresence>
        {children}
      </ol>
    </div>
  );
};

export type ListItemProps = React.ComponentProps<'li'> & {
  selected?: boolean;
};

List.Item = ListItem;
