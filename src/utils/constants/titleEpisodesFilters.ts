export const topRated = {
  types: [
    { name: 'Ascending', val: 'asc' },
    { name: 'Descending', val: 'desc' },
  ],
  key: 'topRated',
} as const;
export const keys = ['season', 'year', topRated.key];