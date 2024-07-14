import { Actions } from '@blackhole/actions';
import { Input } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
  useSubscribeActionOnMode,
} from '@blackhole/keybinding-manager';
import {
  useActionItemDispatch,
  useFilterMode,
} from '@blackhole/task/data-layer';
import { useCallback, useEffect, useRef } from 'react';
import { useFocusManager } from 'react-aria';

interface Props {
  className?: string;
}

export const FilterInput = ({ className }: Props) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { setFilterMode, setFilter } = useActionItemDispatch();
  const setMode = useSetMode();
  const filterMode = useFilterMode();
  const focusManager = useFocusManager();

  useSubscribeAction(Actions.Search, () => {
    setFilterMode(true);
    setMode(Mode.Command);
  });

  useSubscribeActionOnMode(Actions.ClearSearch, Mode.Normal, () => {
    if (!searchRef.current) return;
    setFilter('');
    searchRef.current.value = '';
  });

  useSubscribeActionOnMode(Actions.CancelSearch, Mode.Command, () => {
    setMode(Mode.Normal);
    setFilterMode(false);
    setFilter('');
    if (!searchRef.current) return;
    searchRef.current.value = '';
    searchRef.current.blur();
    focusManager?.focusFirst();
  });

  const saveFilter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setMode(Mode.Normal);
        setFilterMode(false);
        focusManager?.focusFirst();
      }
    },
    [focusManager, setFilterMode, setMode],
  );
  useEffect(() => {
    searchRef.current?.focus();
  }, [filterMode]);

  return (
    <Input
      ref={searchRef}
      onChange={e => setFilter(e.target.value)}
      onKeyDown={saveFilter}
      className={className}
      disabled={!filterMode}
    />
  );
};
