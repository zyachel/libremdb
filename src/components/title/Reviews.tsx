import { NextRouter } from 'next/router';
import Link from 'next/link';
import { Reviews } from '../../interfaces/shared/title';
import { formatNumber } from '../../utils/helpers';
import styles from '../../styles/modules/components/title/reviews.module.scss';

type Props = {
  reviews: Reviews;
  router: NextRouter;
};

const Reviews = ({ reviews, router }: Props) => {
  const { titleId } = router.query;

  return (
    <section className={styles.reviews}>
      <h2 className='heading heading__secondary'>Reviews</h2>

      {reviews.featuredReview && (
        <article className={styles.reviews__reviewContainer}>
          <details className={styles.review}>
            <summary className={styles.review__summary}>
              <strong>{reviews.featuredReview.review.summary}</strong>
            </summary>
            <div
              className={styles.review__text}
              dangerouslySetInnerHTML={{
                __html: reviews.featuredReview.review.html,
              }}
            ></div>
          </details>
          <footer className={styles.review__metadata}>
            <p>
              {reviews.featuredReview.rating && (
                <span>Rated {reviews.featuredReview.rating}/10</span>
              )}
              <span>
                {' '}
                by{' '}
                <Link href={`/user/${reviews.featuredReview.reviewer.id}`}>
                  <a className='link'>{reviews.featuredReview.reviewer.name}</a>
                </Link>
              </span>
              <span> on {reviews.featuredReview.date}.</span>
            </p>
            <p>
              <span>
                {formatNumber(reviews.featuredReview.votes.up)} upvotes
              </span>
              <span>
                , {formatNumber(reviews.featuredReview.votes.down)} downvotes
              </span>
            </p>
          </footer>
        </article>
      )}

      <div className={styles.reviews__stats}>
        <p>
          <Link href={`/title/${titleId}/reviews`}>
            <a className='link'>
              {formatNumber(reviews.numUserReviews)} User reviews
            </a>
          </Link>
        </p>
        <p>
          <Link href={`/title/${titleId}/externalreviews`}>
            <a className='link'>
              {formatNumber(reviews.numCriticReviews)} Critic reviews
            </a>
          </Link>
        </p>
        <p>
          <Link href={`/title/${titleId}/criticreviews`}>
            <a className='link'> {reviews.metacriticScore} Metascore</a>
          </Link>
        </p>
      </div>
    </section>
  );
};
export default Reviews;
