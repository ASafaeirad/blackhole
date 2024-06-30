import type { Nullable } from '@fullstacksjs/toolbox';

import type { SortBy } from '../models';
import type { Filter } from '../models/Filter';
import type { View } from '../models/View';

export interface ViewDto {
  id: string;
  name: string;
  sortBy: Nullable<SortBy>;
  filters: Filter[];
}

export const toView = (dto: ViewDto): View => {
  return {
    id: dto.id,
    name: dto.name,
    sortBy: dto.sortBy ?? 'status',
    filters: dto.filters,
  };
};
