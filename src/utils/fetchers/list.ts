import axios, { AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import type { Data, DataKind } from 'src/interfaces/shared/list';
import axiosInstance from 'src/utils/axiosInstance';
import { AppError, isIMDbImgPlaceholder } from 'src/utils/helpers';

const list = async (listId: string, _pageNum = '1') => {
  try {
    const res = await axiosInstance(`/list/${listId}/`);
    const $ = cheerio.load(res.data);

    const $main = $('main > .ipc-page-content-container > section');
    const $meta = $main.children('.ipc-page-background');
    const $listContent = $main.find('.ipc-metadata-list > li');

    const title = clean($meta.find('h1'));

    // skip texts like "1 - 250" that indicate how many items are shown while searching the list type
    const numWithtype = clean($main.find('.ipc-inline-list__item').filter((__i, el) => !$(el).text().includes("-")).first()).split(' ');

    if (numWithtype.length < 2) throw new AppError('invalid list', 400);

    const [num, type] = numWithtype as [string, DataKind];

    const $author = $meta.find('div[data-testid="list-author-and-metrics"] > div')
    const meta = {
      by: {
        name: clean($author.find('a')),
        link: $author.find('a').attr('href') ?? null,
      },
      created: clean($author.children('span:nth-child(2)')),
      updated: clean($author.children('span:nth-child(3)')),
      num,
      type,
    };
    const description = clean($meta.find('.list-description'));

    const $imagesContainer = $main.find('.lister-list .media_index_thumb_list');
    let data: Data<typeof type>[] = [];

    // 1. images list
    if (type === 'images') {
      data = $imagesContainer
        .find('a > img')
        .map((_i, el) => $(el).attr('src'))
        .toArray();
    }

    // 2. movies list
    else if (type === 'titles') {
      $listContent.each((_i, el) => {
        let $content = $(el);

        const image = $content.find('img.ipc-image').attr("src") ?? null;
        const $heading = $content.find('.ipc-title a');
        const name = clean($heading);
        const url = $heading.attr('href') ?? null;

        const $itemMeta = $content.find('.dli-title-metadata');
        const year = clean($itemMeta.children('span:nth-child(1)'));
        const runtime = clean($itemMeta.children('span:nth-child(2)'));
        const certificate = clean($itemMeta.children('span:nth-child(3)'));

        const rating = clean($content.find('.ipc-rating-star').first());
        const metascore = clean($content.find('.metacritic-score-box'));
        const plot = clean($content.find('.dli-parent > div:nth-child(2) > div'));

        // eg: [["Director", "Nabwana I.G.G."], ["Stars", "Kakule William", "Sserunya Ernest", "G. Puffs"]]
        const otherInfo = $content
          .find('.dli-parent > div:nth-child(2) > span > span')
          .toArray()
          .map(infoEl => {
            return $(infoEl).children().map((__i, el) => clean($(el))).get();
          });

        data.push({
          image,
          name,
          url,
          year,
          certificate,
          runtime,
          plot,
          rating,
          metascore,
          otherInfo,
        });
      });
    }

    // 3. actors list
    else if (type === 'people') {
      $listContent.each((_i, el) => {
        let $content = $(el);

        const image = $content.find('img.ipc-image').attr("src") ?? null;

        const $heading = $content.find('.ipc-title-link-wrapper');
        const name = clean($heading);
        const url = $heading.attr('href') ?? null;

        const jobs = $content.find('.ipc-inline-list')
          .children()
          .toArray()
          .map(el => clean($(el)));

        const knownFor = clean($content.find('.ipc-link'));
        const knownForLink = $content.find('.ipc-link').attr('href') ?? null;

        const about = clean($content.find('div[data-testid="dli-bio"]').next());

        data.push({
          image,
          name,
          url,
          jobs,
          knownFor,
          knownForLink,
          about,
        });
      });
    }

    return { title, meta, description, data };
  } catch (err: any) {
    if (err instanceof AxiosError && err.response?.status === 404)
      throw new AppError('not found', 404, err.cause);

    if (err instanceof AppError) throw err;

    throw new AppError('something went wrong', 500, err.cause);
  }
};

export default list;

const clean = <T extends cheerio.Cheerio<any>>(item: T) => item.text().trim();
