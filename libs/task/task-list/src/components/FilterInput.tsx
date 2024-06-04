import { Actions } from '@blackhole/actions';
import { Input } from '@blackhole/design';
import {
  Mode,
  useSetMode,
  useSubscribeAction,
  useSubscribeActionOnMode,
} from '@blackhole/keybinding-manager';
import { useActionItemDispatch } from '@blackhole/task/data-layer';
import { useCallback, useRef } from 'react';

export const FilterInput = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const { setFilterMode, setFilter } = useActionItemDispatch();
  const setMode = useSetMode();

  useSubscribeAction(Actions.Search, () => {
    setFilterMode(true);
    setMode(Mode.Command);
    if (!searchRef.current) return;
    searchRef.current.focus();
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
  });

  const saveFilter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setMode(Mode.Normal);
        setFilterMode(false);
        e.currentTarget.blur();
      }
    },
    [setFilterMode, setMode],
  );

  return (
    <div className="layout">
      <Input
        ref={searchRef}
        onChange={e => setFilter(e.target.value)}
        onKeyDown={saveFilter}
      />
    </div>
  );
};
