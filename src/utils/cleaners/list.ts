import RawList from 'src/interfaces/misc/rawList';
import { htmlToText } from 'src/utils/helpers';

const cleanList = (rawList: RawList) => {
  const p = rawList.props.pageProps;
  const d = p.mainColumnData.list;

  const meta = {
    title: d.name?.originalText ?? null,
    description: d.description?.originalText?.plainText || null,
    by: {
      name: d.author.username.text,
      id: d.author.userId,
    },
    id: d.id,
    created: d.createdDate,
    updated: d.lastModifiedDate,
    num: d.items.total,
    views: p.aboveTheFoldData.pageViews,
    cover: d.primaryImage.image.url ?? null,
  };

  const pagination = {
    total: p.totalItems,
    // change later
    cur: 0,
    pageNum: p.initialPageNumber,
  };

  // 1. images list
  if (d.listType.id === 'IMAGES') {
    const data = d.imageItems.edges.map(i => ({
      caption: i.node.listItem.caption?.plainText ?? null,
      image: i.node.listItem.url,
      imageId: i.node.listItem.id,
      names: i.node.listItem.names?.map(n => ({ name: n.nameText.text, nameId: n.id })) ?? [],
      titles: i.node.listItem.titles?.map(t => ({ name: t.titleText.text, titleId: t.id })) ?? [],
      userDescription: i.node.description?.originalText?.plaidHtml ?? null,
    }));

    pagination.cur = data.length;

    return { meta, pagination, data, type: d.listType.id } as const;
  }

  // 2. movies list
  if (d.listType.id === 'TITLES') {
    const data = d.titleListItemSearch.edges.map(title => ({
      userDescription: title.node.description?.originalText?.plaidHtml ?? null,
      titleId: title.listItem.id,
      image: title.listItem.primaryImage?.url ?? null,
      name: title.listItem.titleText.text,
      url: `/title/${title.listItem.id}`,
      year: title.listItem.releaseYear?.year.toString() ?? null,
      certificate: title.listItem.certificate?.rating ?? null,
      runtime: title.listItem.runtime?.seconds ?? null,
      genres: title.listItem.titleGenres?.genres.map(genre => genre.genre.text) ?? [],
      plot: title.listItem.plot?.plotText?.plainText ?? null,
      rating: {
        score: title.listItem.ratingsSummary.aggregateRating,
        voteCount: title.listItem.ratingsSummary.voteCount,
      },
      metascore: title.listItem.metacritic?.metascore.score ?? null,
      otherInfo: title.listItem.principalCreditsV2.map(credit => [
        credit.grouping.text,
        ...credit.credits.map(credit => credit.name.nameText.text),
      ]),
    }));

    pagination.cur = data.length;

    return { meta, pagination, data, type: d.listType.id } as const;
  }

  // 3. actors list
  else if (d.listType.id === 'PEOPLE') {
    const data = d.nameListItemSearch.edges.map(name => ({
      nameId: name.listItem.id,
      userDescription: name.node.description?.originalText?.plaidHtml ?? null,
      image: name.listItem.primaryImage.url,
      name: name.listItem.nameText.text,
      url: `/name/${name.listItem.id}`,
      jobs: name.listItem.professions.map(profession => profession.profession.text),
      knownFor: name.listItem.knownForV2.credits.map(credit => {
        return { title: credit.title.titleText.text, url: `/title/${credit.title.id}` };
      }),
      about:
        // ideally would've first sliced then cleaned up tags, but in v8's perf we trust.
        htmlToText(name.listItem.bio.displayableArticle.body.plaidHtml).slice(0, 400) + '...',
    }));

    pagination.cur = data.length;
    return { meta, pagination, data, type: d.listType.id } as const;
  }

  return { meta, pagination, data: [], type: d.listType.id } as const;
};

export default cleanList;
