import { atom } from 'jotai';

import type { ActionItem } from '../models';

export const openLinksAtom = atom(null, (get, set, item: ActionItem) => {
  const links = item.nodes.filter(n => n.type === 'link');
  links.forEach(link => window.open(link.href, '_blank'));
});
