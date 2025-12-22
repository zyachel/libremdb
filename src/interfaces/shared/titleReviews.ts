import reviews from 'src/utils/fetchers/titleReviews';

type TitleReviews = Awaited<ReturnType<typeof reviews>>;
export type { TitleReviews as default };
