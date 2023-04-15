import { CardResult } from 'src/components/card';
import { Keywords } from 'src/interfaces/shared/search';

type Props = { keyword: Keywords[number] };

const Keyword = ({ keyword }: Props) => (
  <CardResult link={`/search/keyword?keywords=${keyword.text}`} name={keyword.text}>
    {keyword.numTitles && <p>{keyword.numTitles} titles</p>}
  </CardResult>
);

export default Keyword;
