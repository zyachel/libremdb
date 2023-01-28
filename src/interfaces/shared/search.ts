import cleanFind from 'src/utils/cleaners/find';
import { resultTitleTypes, resultTypes } from 'src/utils/constants/find';

type BasicSearch = ReturnType<typeof cleanFind>;
export type { BasicSearch as default };

export type Titles = BasicSearch['titles'];
export type People = BasicSearch['people'];
export type Companies = BasicSearch['companies'];
export type Keywords = BasicSearch['keywords'];

// q=babylon&s=tt&ttype=ft&exact=true
export type FindQueryParams = {
  q: string;
  exact?: 'true';
  s?: QueryTypes;
  ttype?: QueryTitleTypes;
};

export type ResultMetaTypes = typeof resultTypes.types[number]['id'] | null;

export type ResultMetaTitleTypes =
  | typeof resultTitleTypes.types[number]['id']
  | null;

export type QueryTypes = typeof resultTypes.types[number]['val'];

export type QueryTitleTypes = typeof resultTitleTypes.types[number]['val'];
