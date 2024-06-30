export type Filter = 'all' | 'remaining';

export function hasRemaining(filters: Filter[] = []) {
  return filters.includes('remaining');
}
