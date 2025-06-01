import { useRouter } from 'next/router';
import Link from 'next/link';
import type { Reviews as TReviews } from 'src/interfaces/shared/title';
import { formatNumber } from 'src/utils/helpers';
import styles from 'src/styles/modules/components/title/reviews.module.scss';

type Props = {
  reviews: TReviews;
};

const Reviews = ({ reviews }: Props) => {
  return (
    <section className={styles.reviews}>
      <h2 className='heading heading__secondary'>Reviews</h2>

      <RatingsDistribution ratings={reviews.ratingsDistribution} />

      <section className={styles.userReviews}>
        <h3 className='heading heading__tertiary'>User Reviews</h3>
        {reviews.featuredReviews ? (
          <ul className={styles.userReviews__list} role='list'>
            {reviews.featuredReviews.map(featuredReview => (
              <li key={featuredReview.id}>
                <details className={styles.review}>
                  <summary className={styles.review__summary}>
                    <strong>{featuredReview.review.summary}</strong>
                  </summary>
                  <div
                    className={styles.review__text}
                    dangerouslySetInnerHTML={{
                      __html: featuredReview.review.html,
                    }}
                  ></div>
                  <footer className={styles.review__metadata}>
                    <p>
                      {featuredReview.rating && <span>Rated {featuredReview.rating}/10</span>}
                      <span>
                        {' '}
                        by{' '}
                        <Link href={`/user/${featuredReview.reviewer.id}`}>
                          <a className='link'>{featuredReview.reviewer.name}</a>
                        </Link>
                      </span>
                    </p>
                  </footer>
                </details>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews yet.</p>
        )}
      </section>

      {reviews.ai?.summary && (
        <details className={styles.reviewAi}>
          <summary className='heading heading__tertiary'>AI Summary</summary>
          <p dangerouslySetInnerHTML={{ __html: reviews.ai.summary }} />
          <ul>
            {reviews.ai.themes.map(theme => (
              <li key={theme.id}>{theme.text}</li>
            ))}
          </ul>
        </details>
      )}

      <ReviewStats reviews={reviews} />
    </section>
  );
};

export default Reviews;

const RatingsDistribution = ({ ratings }: { ratings: Props['reviews']['ratingsDistribution'] }) => {
  const maxRating = Math.max(...ratings.map(r => r.votes));

  return (
    <div className={styles.ratingsDistribution}>
      <h3 className='heading heading__tertiary'>Ratings Distribution</h3>
      {ratings.length ? (
        <ul>
          {ratings.map(rating => (
            <li
              key={rating.rating}
              style={
                {
                  '--bar-height': `${((rating.votes / maxRating) * 100).toFixed(2)}%`,
                } as React.CSSProperties
              }
            >
              <span>
                {rating.rating} <span>({formatNumber(rating.votes)})</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No ratings yet.</p>
      )}
    </div>
  );
};

const ReviewStats = ({ reviews }: { reviews: Props['reviews'] }) => {
  const router = useRouter();
  const { titleId } = router.query;

  return (
    <div className={styles.reviewStats}>
      <p>
        <Link href={`/title/${titleId}/reviews`}>
          <a className='link'>{formatNumber(reviews.numUserReviews)} User reviews</a>
        </Link>
      </p>
      <p>
        <Link href={`/title/${titleId}/externalreviews`}>
          <a className='link'>{formatNumber(reviews.numCriticReviews)} Critic reviews</a>
        </Link>
      </p>
      <p>
        <Link href={`/title/${titleId}/criticreviews`}>
          <a className='link'> {reviews.metacriticScore} Metascore</a>
        </Link>
      </p>
    </div>
  );
};
