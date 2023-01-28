import Link from 'next/link';
import { Keywords } from 'src/interfaces/shared/search';
import styles from 'src/styles/modules/components/find/keyword.module.scss';

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
