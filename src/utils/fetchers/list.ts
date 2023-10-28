import axios, { AxiosError } from 'axios';
import * as cheerio from 'cheerio';
import type { Data, DataKind } from 'src/interfaces/shared/list';
import axiosInstance from 'src/utils/axiosInstance';
import { AppError, isIMDbImgPlaceholder } from 'src/utils/helpers';

const list = async (listId: string, pageNum = '1') => {
  try {
    const res = await axiosInstance(`/list/${listId}?page=${pageNum}`);
    const $ = cheerio.load(res.data);

    const $main = $('#main > .article');
    const $meta = $main.children('#list-overview-summary');
    const $footer = $main.find('.footer .desc .list-pagination');

    const title = clean($main.children('h1.list-name'));
    const numWithtype = clean($main.find('.sub-list .header .nav .desc')).split(' ');

    if (numWithtype.length < 2) throw new AppError('invalid list', 400);

    const [num, type] = numWithtype as [string, DataKind];

    const meta = {
      by: {
        name: clean($meta.children('a')),
        link: $meta.children('a').attr('href') ?? null,
      },
      created: clean($meta.find('#list-overview-created')),
      updated: clean($meta.find('#list-overview-lastupdated')),
      num,
      type,
    };
    const description = clean($main.children('.list-description'));

    const pagination = {
      prev: $footer.children('a.prev-page').attr('href') ?? null,
      range: clean($footer.children('.pagination-range')),
      next: $footer.children('a.next-page').attr('href') ?? null,
    };

    const $imagesContainer = $main.find('.lister-list .media_index_thumb_list');
    const $listItems = $main.find('.lister-list').children();
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
      $listItems.each((_i, el) => {
        let image = $(el).find('.lister-item-image > a > img.loadlate').attr('loadlate') ?? null;
        if (image && isIMDbImgPlaceholder(image)) image = null;

        const $content = $(el).children('.lister-item-content');
        const $heading = $content.find('h3.lister-item-header > a');
        const name = clean($heading);
        const url = $heading.attr('href') ?? null;
        const year = clean($heading.next('.lister-item-year'));
        const $itemMeta = $content.find('h3.lister-item-header + p');
        const certificate = clean($itemMeta.children('.certificate'));
        const runtime = clean($itemMeta.children('.runtime'));
        const genre = clean($itemMeta.children('.genre'));
        const rating = clean($content.find('.ipl-rating-star__rating').first());
        const metascore = clean($content.find('.metascore'));
        const plot = clean($content.children('p[class=""]'));

        // eg: [["Director", "Nabwana I.G.G."], ["Stars", "Kakule William, Sserunya Ernest, G. Puffs"]]
        const otherInfo = $content
          .children('p.text-muted.text-small')
          .nextAll('p.text-muted.text-small')
          .map((__i, infoEl) => {
            const arr = clean($(infoEl)).replace(/\s+/g, ' ').split('|');

            return arr.map(i => i.split(':'));
          })
          .toArray();

        data.push({
          image,
          name,
          url,
          year,
          certificate,
          runtime,
          genre,
          plot,
          rating,
          metascore,
          otherInfo,
        });
      });
    }

    // 3. actors list
    else if (type === 'names') {
      $listItems.each((_i, el) => {
        let image = $(el).find('.lister-item-image > a > img').attr('src') ?? null;
        if (image && isIMDbImgPlaceholder(image)) image = null;

        const $content = $(el).children('.lister-item-content');
        const $heading = $content.find('h3.lister-item-header > a');
        const name = clean($heading);
        const url = $heading.attr('href') ?? null;
        const $itemMeta = $content.find('h3.lister-item-header + p');
        const jobNKnownForRaw = clean($itemMeta.first()).split('|');
        const job = jobNKnownForRaw.at(0) ?? null;
        const knownFor = jobNKnownForRaw.at(1) ?? null;
        const knownForLink = $itemMeta.children('a').attr('href') ?? null;
        const about = clean($content.children('p:not([class])'));

        data.push({
          image,
          name,
          url,
          job,
          knownFor,
          knownForLink,
          about,
        });
      });
    }

    return { title, meta, description, pagination, data };
  } catch (err: any) {
    if (err instanceof AxiosError && err.response?.status === 404)
      throw new AppError('not found', 404, err.cause);

    if (err instanceof AppError) throw err;

    throw new AppError('something went wrong', 500, err.cause);
  }
};

export default list;

const clean = <T extends cheerio.Cheerio<any>>(item: T) => item.text().trim();
