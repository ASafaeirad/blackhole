import type { Nullable } from '@fullstacksjs/toolbox';

import type { SortBy } from '../models';
import type { View } from '../models/View';

export interface ViewDto {
  id: string;
  name: string;
  sortBy: Nullable<SortBy>;
}

export const toView = (dto: ViewDto): View => {
  return {
    id: dto.id,
    name: dto.name,
    sortBy: dto.sortBy ?? 'status',
  };
};
