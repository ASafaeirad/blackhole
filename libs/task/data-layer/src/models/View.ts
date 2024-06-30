import type { Nullable } from '@fullstacksjs/toolbox';

import type { SortBy } from './SortBy';

export interface View {
  id: string;
  name: string;
  sortBy: Nullable<SortBy>;
}

export const defaultView: View = {
  id: 'default',
  name: 'Default',
  sortBy: 'status',
};
