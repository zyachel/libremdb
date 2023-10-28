import type { DataKind, Data as TData } from 'src/interfaces/shared/list';
import type { ToArray } from 'src/interfaces/shared';
import Images from './Images';
import Names from './Names';
import Titles from './Titles';

type Props = {
  data: ToArray<TData<DataKind>>;
};

const Data = ({ data }: Props) => {
  if (isDataImages(data)) return <Images images={data} />;
  if (isDataNames(data)) return <Names names={data} />;

  return <Titles titles={data} />;
};
export default Data;

const isDataImages = (data: unknown): data is TData<'images'>[] =>
  Array.isArray(data) && typeof data[0] === 'string';

const isDataNames = (data: unknown): data is TData<'names'>[] =>
  Array.isArray(data) && data[0] && typeof data[0] === 'object' && 'about' in data[0];
