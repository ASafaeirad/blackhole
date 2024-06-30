import type { Nullable } from '@fullstacksjs/toolbox';

import type { Filter } from './Filter';
import type { SortBy } from './SortBy';

export interface View {
  id: string;
  name: string;
  sortBy: Nullable<SortBy>;
  filters: Filter[];
}

export const defaultView: View = {
  id: 'default',
  name: 'Default',
  sortBy: 'status',
  filters: ['remaining'],
};
