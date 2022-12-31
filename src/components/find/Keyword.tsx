import { Keywords } from '../../interfaces/shared/search';
import Link from 'next/link';

import styles from '../../styles/modules/components/find/keyword.module.scss';

type Props = {
  keyword: Keywords[0];
};

const Keyword = ({ keyword }: Props) => {
  return (
    <li className={styles.keyword}>
      <Link href={`name/${keyword.id}`}>
        <a className={`heading ${styles.heading}`}>{keyword.text}</a>
      </Link>
      {keyword.numTitles && <p>{keyword.numTitles} titles</p>}
    </li>
  );
};

export default Keyword;
