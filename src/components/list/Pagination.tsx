import OptionalLink from './OptionalLink';
import type List from 'src/interfaces/shared/list';
import styles from 'src/styles/modules/components/list/pagination.module.scss';

type Props = {
  pagination: List['pagination'];
  listId: string;
};
const Pagination = ({ listId, pagination }: Props) => {
  const total = pagination.total;
  const current = pagination.cur;
  const pageNumber = pagination.pageNum;
  const hasPrev = pageNumber > 1;
  const hasNext = pageNumber * current < total;

  if (current >= total) return null;

  return (
    <nav aria-label='pagination'>
      <ul className={styles.nav}>
        <li aria-hidden={!hasPrev}>
          <OptionalLink
            href={hasPrev ? `/list/${listId}/?page=${pageNumber - 1}` : null}
            className='link'
          >
            Prev
          </OptionalLink>
        </li>
        <li>
          {current} out of {total} shown
        </li>
        <li aria-hidden={!hasNext}>
          <OptionalLink
            href={hasNext ? `/list/${listId}/?page=${pageNumber + 1}` : null}
            className='link'
          >
            Next
          </OptionalLink>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
