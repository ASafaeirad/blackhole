import type { Nullable } from '@fullstacksjs/toolbox';

import type { Filter, SortBy, View } from '../models';

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
