import { atom } from 'jotai';

import { focusedActionItemAtom } from '../useTaskListState';

export const openLinksAtom = atom(null, get => {
  const item = get(focusedActionItemAtom);
  if (!item) return;

  const links = item.nodes.filter(n => n.type === 'link');
  links.forEach(link => window.open(link.href, '_blank'));
});
