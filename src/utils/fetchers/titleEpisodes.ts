import * as cheerio from 'cheerio';
import axiosInstance, { isSaneError } from 'src/utils/axiosInstance';
import { AppError } from 'src/utils/helpers';

const episodes = async (titleId: string, queryStr = '') => {
  try {
    // https://www.imdb.com/title/tt2861424/episodes?season=1
    const res = await axiosInstance(`/title/${titleId}/episodes?${queryStr}`);
    const $ = cheerio.load(res.data);

    const $main = $('main section');

    const meta = {
      title: clean($main.find('h2')),
      image: $main.find('img').attr('src') ?? null,
      titleId,
    };

    const episodes = getEpisodesList($main.find('article.episode-item-wrapper'), $);
    const hasMoreEpisodes = $main.find('.ipc-see-more').attr('class') !== undefined;

    return { meta, episodes, has_more_episodes: hasMoreEpisodes };
  } catch (err) {
    if (isSaneError(err) && err.response?.status === 404)
      throw new AppError('not found', 404, err.cause);

    if (err instanceof AppError) throw err;

    throw new AppError('something went wrong', 500, err instanceof Error ? err.cause : undefined);
  }
};

export default episodes;

const clean = <T extends cheerio.Cheerio<any>>(item: T) => item.text().trim();

const getEpisodesList = ($listItems: cheerio.Cheerio<cheerio.Element>, $: cheerio.CheerioAPI) => {
  return $listItems
    .map((_i, el) => {
      const title = clean($(el).find('h4'));
      const description = clean($(el).find('div[role="presentation"]'));
      const rating = clean($(el).find('div > .ipc-rating-star'));
      const date = clean($(el).find('span.sc-ccd6e31b-10'));
      const image = $(el).find('img').attr('src');

      return {
        title,
        description,
        rating,
        date,
        image,
      };
    })
    .toArray();
};
