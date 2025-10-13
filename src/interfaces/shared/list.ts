import list from 'src/utils/fetchers/list';

// for full title
type List = Awaited<ReturnType<typeof list>>;
export type { List as default };

type DataTitle = {
  image: string | null;
  name: string;
  url: string | null;
  year: string;
  certificate: string;
  runtime: string;
  plot: string;
  rating: string;
  metascore: string;
  otherInfo: string[][];
};

type DataName = {
  image: string | null;
  name: string;
  url: string | null;
  jobs: string[] | null;
  knownFor: string | null;
  knownForLink: string | null;
  about: string;
};

type DataImage = string;

export type DataKind = 'images' | 'titles' | 'names' | 'people';

export type Data<T extends DataKind> = T extends 'images'
  ? DataImage
  : T extends 'names'
  ? DataName
  : T extends 'people'
  ? DataName
  : DataTitle;
