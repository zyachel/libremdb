import { AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import { RawReviews, RawReview } from 'src/interfaces/misc/rawReviews';
import axiosInstance, { isSaneError } from 'src/utils/axiosInstance';
import { AppError } from 'src/utils/helpers';

const reviews = async (titleId: string, queryStr = '') => {
  try {
    // https://www.imdb.com/title/tt0364343/reviews?spoiler=hide&sort=curated&dir=desc&ratingFilter=0
    const res = await axiosInstance(`/title/${titleId}/reviews?${queryStr}`);
    const $ = cheerio.load(res.data);

    const rawData = $("script#__NEXT_DATA__").text();
    const rawReviews: RawReviews = JSON.parse(rawData);

    const reviewsData = rawReviews.props.pageProps.contentData.entityMetadata;
    const meta = {
      title: reviewsData.titleText.text,
      year: reviewsData.releaseYear.year,
      image: reviewsData.primaryImage.url,
      numReviews: reviewsData.ratingsSummary.voteCount,
      titleId,
    };

    const list = cleanReviewsList(rawReviews.props.pageProps.contentData.reviews);
    return { meta, list };
  } catch (err) {
    if (isSaneError(err) && err.response?.status === 404)
      throw new AppError('not found', 404, err);

    if (err instanceof AppError) throw err;

    throw new AppError('something went wrong', 500, err);
  }
};

export default reviews;

const cleanReviewsList = (reviews: RawReview[]) => {
  return reviews
    .map(review => {
      return {
        summary: review.review.reviewSummary,
        reviewId: review.review.reviewId,
        rating: review.review.authorRating ?? null,
        by: {
          name: review.review.author.username.text,
          link: `/user/${review.review.author.userId}`,
        },
        date: review.review.submissionDate,
        isSpoiler: review.review.spoiler,
        reviewHtml: review.review.reviewText,
        responses: {
          upVotes: review.review.helpfulnessVotes.upVotes,
          downVotes: review.review.helpfulnessVotes.downVotes,
        },
      };
    })
};
