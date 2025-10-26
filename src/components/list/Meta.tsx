import Link from 'next/link';
import { formatDate, formatNumber } from 'src/utils/helpers';
import List, { type DataKind } from 'src/interfaces/shared/list';
import styles from 'src/styles/modules/components/list/meta.module.scss';

type Props = {
  meta: List['meta'];
  kind: DataKind;
};
const Meta = ({ meta, kind }: Props) => {
  const by = meta.by.id ? (
    <Link href={`/user/${meta.by.id}`}>
      <a className='link'>{meta.by.name}</a>
    </Link>
  ) : (
    meta.by.name
  );

  return (
    <header className={styles.container}>
      <h1 className='heading heading__secondary'>{meta.title}</h1>
      <ul className={styles.list}>
        <li>
          List of {meta.num} {kind.toLowerCase()} created by {by} on {meta.created}
          {meta.updated && <span> Last updated on {meta.updated}</span>}
        </li>

        <li>
          Viewed {formatNumber(meta.views.totalPageViews)} times in total (
          {formatNumber(meta.views.weekPageViews)} this week)
        </li>
      </ul>

      {meta.description && <p>{meta.description}</p>}
    </header>
  );
};
export default Meta;
