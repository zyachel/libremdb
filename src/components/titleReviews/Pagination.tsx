import TitleReviews, { TitleReviewsCursored } from 'src/interfaces/shared/titleReviews';
import styles from 'src/styles/modules/components/titleReviews/pagination.module.scss';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { cleanQueryStr } from 'src/utils/helpers';
import { direction, keys, ratings, sortBy } from 'src/utils/constants/titleReviewsFilters';

type Props = {
  meta: TitleReviewsCursored['meta'];
  cursor: string | null;
  onClick?: (queryStr: string) => void;
};

const Pagination = ({ cursor, onClick = () => {}, meta }: Props) => {
  const router = useRouter();

  if (!cursor || !meta.titleId) return null;
  const queryParams = router.query as Record<string, string>;
  const queryStr = cleanQueryStr(queryParams, keys);

  return (
    <>
      <button className={styles.button} onClick={() => onClick(queryStr)}>
        Load More
      </button>
      <Link href={`/title/${meta.titleId}/reviews/${cursor}?${queryStr}&title=${meta.title ?? ''}`}>
        <a className={styles.link}>Load More</a>
      </Link>
    </>
  );
};

export default Pagination;
