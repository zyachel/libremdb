import reviews, { cursoredReviews } from 'src/utils/fetchers/titleReviews';

type TitleReviews = Awaited<ReturnType<typeof reviews>>;
export type { TitleReviews as default };

export type TitleReviewsCursored = Awaited<ReturnType<typeof cursoredReviews>>;
