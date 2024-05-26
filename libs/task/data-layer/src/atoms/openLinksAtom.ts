import { atom } from 'jotai';

import type { LinkNode } from '../models/Node';
import { focusedActionItemAtom } from '../useTaskListState';

export const openLinksAtom = atom(null, get => {
  const item = get(focusedActionItemAtom);
  if (!item) return;

  const links = item.nodes.filter(n => n.type === 'link') as LinkNode[];
  links.forEach(link => window.open(link.href, '_blank'));
});
