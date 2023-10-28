import OptionalLink from './OptionalLink';
import type List from 'src/interfaces/shared/list';
import styles from 'src/styles/modules/components/list/pagination.module.scss';

type Props = {
  pagination: List['pagination'];
};
const Pagination = ({ pagination }: Props) => {
  const prevLink = pagination.prev && pagination.prev !== '#' ? pagination.prev : null;
  const nextLink = pagination.next && pagination.next !== '#' ? pagination.next : null;

  if (!prevLink && !nextLink) return null;

  return (
    <nav aria-label='pagination'>
      <ul className={styles.nav}>
        <li aria-hidden={!prevLink}>
          <OptionalLink href={prevLink} className='link'>
            Prev
          </OptionalLink>
        </li>
        <li>{pagination.range} shown</li>
        <li aria-hidden={!nextLink}>
          <OptionalLink href={nextLink} className='link'>
            Next
          </OptionalLink>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
