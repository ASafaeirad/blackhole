import { atom } from 'jotai';

import type { SortBy } from '../models/Sort';

export const sortByAtom = atom<SortBy | null>(null);
