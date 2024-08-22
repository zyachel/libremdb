import { AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import axiosInstance, { isSaneError } from 'src/utils/axiosInstance';
import { AppError } from 'src/utils/helpers';

const reviews = async (titleId: string, queryStr = '') => {
  try {
    // https://www.imdb.com/title/tt0364343/reviews?spoiler=hide&sort=curated&dir=desc&ratingFilter=0
    const res = await axiosInstance(`/title/${titleId}/reviews?${queryStr}`);
    const $ = cheerio.load(res.data);

    const $main = $('#main > .article');
    const $meta = $main.children('.subpage_title_block');

    const meta = {
      title: clean($meta.find('[itemprop="name"] > a')),
      year: clean($meta.find('[itemprop="name"] > .nobr')),
      image: $meta.find('img[itemprop="image"]').attr('src') ?? null,
      numReviews: clean($main.find('.lister > .header > div')),
      titleId,
    };

    const $listItems = $main.find('.lister-list').children();

    const list = getReviewsList($listItems, $);
    const cursor = $main.find('.lister > .load-more-data').attr('data-key') ?? null;

    return { meta, list, cursor };
  } catch (err) {
    if (isSaneError(err) && err.response?.status === 404)
      throw new AppError('not found', 404, err);

    if (err instanceof AppError) throw err;

    throw new AppError('something went wrong', 500, err);
  }
};

export default reviews;

const clean = <T extends cheerio.Cheerio<any>>(item: T) => item.text().trim();

export const cursoredReviews = async (
  titleId: string,
  paginationKey: string,
  queryStr = '',
  title: string | null = null
) => {
  try {
    // https://www.imdb.com/title/tt0364343/reviews/_ajax?paginationKey=g4w6ddbmqyzdo6ic4oxwjnjqrtt4yaz53iptz6pna7cpyv35pjt6udc2oiyfzmrkb4drv33tz5tbvxqxw25ns6mwx3qym&sort=desc
    const res = await axiosInstance(
      `/title/${titleId}/reviews/_ajax?paginationKey=${paginationKey}&${queryStr}`
    );

    const $ = cheerio.load(res.data);
    const $main = $('body > div');
    const $listItems = $main.children('.lister-list').children();

    const list = getReviewsList($listItems, $);

    const cursor = $main.children('.load-more-data').attr('data-key') ?? null;

    return { meta: { title, titleId }, list, cursor };
  } catch (err) {
    if (isSaneError(err) && err.response?.status === 404)
      throw new AppError('not found', 404, err.cause);

    if (err instanceof AppError) throw err;

    throw new AppError('something went wrong', 500, err);
  }
};

const getReviewsList = ($listItems: cheerio.Cheerio<cheerio.Element>, $: cheerio.CheerioAPI) => {
  return $listItems
    .map((_i, el) => {
      const reviewId = $(el).attr('data-review-id') ?? null;

      const $reviewContainer = $(el).find('.lister-item-content');

      const summary = clean($reviewContainer.children('a.title'));
      const rating = clean($reviewContainer.children('.ipl-ratings-bar'));
      const $by = $reviewContainer.find('.display-name-date .display-name-link a');
      const by = {
        name: clean($by),
        link: $by.attr('href') ?? null,
      };
      const date = clean($reviewContainer.find('.display-name-date .review-date'));
      const isSpoiler = $reviewContainer.children('.spoiler-warning').length > 0;
      const reviewHtml = $reviewContainer.find('.content > .text').html();
      const responses = clean($reviewContainer.find('.content > .actions').contents().first());
      // .contents()
      // .filter(function () {
      //   return this.nodeType === 3;
      // })
      // .map(function () {
      //   return $(this).text();
      // })
      // .get();

      return {
        summary,
        reviewId,
        rating,
        by,
        date,
        isSpoiler,
        reviewHtml,
        responses,
      };
    })
    .toArray();
};
