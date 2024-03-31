export const ratings = {
  types: [
    { name: 'All', val: '0' },
    { name: '1', val: '1' },
    { name: '2', val: '2' },
    { name: '3', val: '3' },
    { name: '4', val: '4' },
    { name: '5', val: '5' },
    { name: '6', val: '6' },
    { name: '7', val: '7' },
    { name: '8', val: '8' },
    { name: '9', val: '9' },
    { name: '10', val: '10' },
  ],
  key: 'ratingFilter',
} as const;

export const sortBy = {
  types: [
    { name: 'Featured', val: 'curated' },
    { name: 'Review Date', val: 'submissionDate' },
    { name: 'Total Votes', val: 'totalVotes' },
    { name: 'Prolific Reviewer', val: 'reviewVolume' },
    { name: 'Review Rating', val: 'userRating' },
  ],
  key: 'sort',
} as const;

export const direction = {
  types: [
    { name: 'Ascending', val: 'asc' },
    { name: 'Descending', val: 'desc' },
  ],
  key: 'dir',
} as const;
export const keys = ['spoiler', direction.key, sortBy.key, ratings.key];