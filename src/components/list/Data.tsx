import type List from 'src/interfaces/shared/list';
import type { DataImage, DataKind, DataTitle } from 'src/interfaces/shared/list';
import Images from './Images';
import Names from './Names';
import Titles from './Titles';

type Props = {
  data: List['data'];
  kind: DataKind;
};

const Data = ({ kind, data }: Props) => {
  if (isDataImages(data, kind)) return <Images images={data} />;
  if (isDataNames(data, kind)) return <Names names={data} />;
  if (isDataTitles(data, kind)) return <Titles titles={data} />;

  return null;
};
export default Data;

const isDataImages = (_data: List['data'], kind: DataKind): _data is DataImage[] =>
  kind === 'IMAGES';

const isDataNames = (_data: List['data'], kind: DataKind): _data is DataTitle[] =>
  kind === 'PEOPLE';

const isDataTitles = (_data: List['data'], kind: DataKind): _data is DataTitle[] =>
  kind === 'PEOPLE';
