import list from 'src/utils/fetchers/list';

// for full title
type List = Awaited<ReturnType<typeof list>>;
export type { List as default };

export type DataTitle = Extract<List, { type: 'TITLES' }>['data'][number];

export type DataName = Extract<List, { type: 'PEOPLE' }>['data'][number];

export type DataImage = Extract<List, { type: 'IMAGES' }>['data'][number];

export type DataKind = List['type'];
