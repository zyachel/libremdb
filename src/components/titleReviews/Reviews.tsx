import TitleReviews from 'src/interfaces/shared/titleReviews';
import styles from 'src/styles/modules/components/titleReviews/reviews.module.scss';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  list: TitleReviews['list'];
  className?: string;
  children?: ReactNode;
};

const Results = ({ list, className, children }: Props) => {
  return (
    <section className={className}>
      <section className={styles.reviews}>
        {list.map(review => (
          <Review {...review} key={review.reviewId} />
        ))}
      </section>
      {children}
    </section>
  );
};

const Review = ({
  by,
  date,
  isSpoiler,
  rating,
  responses,
  reviewHtml,
  reviewId,
  summary,
}: TitleReviews['list'][number]) => {
  return (
    <article className={styles.reviews__reviewContainer}>
      <details className={styles.review}>
        <summary className={styles.review__summary}>
          <Link href={by.link ?? '#'}>
            <a className='link'>{by.name}</a>
          </Link>
          <time>{date}</time>
          <p className={styles.review__misc}>
            {isSpoiler && (
              <span className={styles.review__misc_spoilers}>
                <svg className={styles.icon}>
                  <use href='/svg/sprite.svg#icon-alert'></use>
                </svg>
                Spoilers
              </span>
            )}
            {rating && (
              <span>
                <svg className={styles.icon}>
                  <use href='/svg/sprite.svg#icon-rating'></use>
                </svg>
                {rating}
              </span>
            )}
            <svg className={`${styles.icon} ${styles.review__summary_chevron}`}>
              <use href='/svg/sprite.svg#icon-chevron'></use>
            </svg>
          </p>
          <strong>{summary}</strong>
        </summary>
        {reviewHtml && (
          <div
            className={styles.review__text}
            dangerouslySetInnerHTML={{
              __html: reviewHtml,
            }}
          />
        )}
      </details>
      <footer className={styles.review__metadata}>
        <p>{responses.upVotes} upvotes, {responses.downVotes} downvotes</p>
      </footer>
    </article>
  );
};

export default Results;
