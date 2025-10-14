import list from 'src/utils/fetchers/list';

// for full title
type List = Awaited<ReturnType<typeof list>>;
export type { List as default };

type DataTitle = {
  image: string | null;
  name: string;
  url: string | null;
  year: string;
  certificate: string | null;
  runtime: number;
  genres: string[];
  plot: string;
  rating: {score: number, voteCount: number};
  metascore: number | null;
  otherInfo: string[][];
};

type DataName = {
  image: string | null;
  name: string;
  url: string | null;
  jobs: string[];
  knownFor: {title: string, url: string}[];
  about: string;
};

type DataImage = string;

export type DataKind = 'images' | 'titles' | 'names';

export type Data<T extends DataKind> = T extends 'images'
  ? DataImage
  : T extends 'names'
  ? DataName
  : DataTitle;
