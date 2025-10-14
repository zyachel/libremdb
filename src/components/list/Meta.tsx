import Link from 'next/link';
import { formatDate } from 'src/utils/helpers';
import List from 'src/interfaces/shared/list';
import styles from 'src/styles/modules/components/list/meta.module.scss';

type Props = {
  meta: List['meta'];
};
const Meta = ({ meta }: Props) => {
  const by = meta.by.link ? (
    <Link href={meta.by.link}>
      <a className='link'>{meta.by.name}</a>
    </Link>
  ) : (
    meta.by.name
  );

  return (
    <header className={styles.container}>
      <h1 className='heading heading__secondary'>{meta.title}</h1>
      <ul className={styles.list}>
        <li>by {by}</li>
        <li>{formatDate(meta.created)}</li>
        {meta.updated && <li>{formatDate(meta.updated)}</li>}
        <li>
          {meta.num} {meta.type}
        </li>
      </ul>
      {meta.description && <p>{meta.description}</p>}
    </header>
  );
};
export default Meta;
