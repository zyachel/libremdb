import { Data } from "src/interfaces/shared/list";
import RawList from "src/interfaces/misc/rawList";

const cleanList = (rawList: RawList, currentPage: number) => {
  const listData = rawList.props.pageProps.mainColumnData.list;
  const meta = {
    title: listData.name?.originalText ?? "",
    description: listData.description?.originalText?.plainText || null,
    by: {
      name: listData.author.username.text,
      link: `/user/${listData.author.userId}`,
    },
    created: listData.createdDate,
    updated: listData.lastModifiedDate,
    num: listData.items.total,
    type: listData.listType.id.toLowerCase(),
  };
  let data: Data<typeof listData.listType.id>[] = [];

  // 1. images list
  if (listData.listType.id === 'IMAGES') {
    for (let image of listData.imageItems!.edges) {
      data.push(image.node.listItem.url)
    }
  }

  // 2. movies list
  else if (listData.listType.id === 'TITLES') {
    for (let title of listData.titleListItemSearch!.edges) {
      data.push({
        image: title.listItem.primaryImage.url,
        name: title.listItem.titleText.text,
        url: `/title/${title.listItem.id}`,
        year: title.listItem.releaseYear.year.toString(),
        certificate: title.listItem.certificate?.rating ?? null,
        runtime: title.listItem.runtime.seconds,
        genres: title.listItem.titleGenres.genres.map(genre => genre.genre.text),
        plot: title.listItem.plot.plotText.plainText,
        rating: { score: title.listItem.ratingsSummary.aggregateRating, voteCount: title.listItem.ratingsSummary.voteCount },
        metascore: title.listItem.metacritic?.metascore.score ?? null,
        otherInfo: title.listItem.principalCreditsV2.map(credit => [credit.grouping.text, ...credit.credits.map(credit => credit.name.nameText.text)]),
      });
    };
  }

  // 3. actors list
  else if (listData.listType.id === 'PEOPLE') {
    for (let name of listData.nameListItemSearch!.edges) {
      data.push({
        image: name.listItem.primaryImage.url,
        name: name.listItem.nameText.text,
        url: `/name/${name.listItem.id}`,
        jobs: name.listItem.professions.map(profession => profession.profession.text),
        knownFor: name.listItem.knownForV2.credits.map(credit => { return { title: credit.title.titleText.text, url: `/title/${credit.title.id}` } }),
        about: name.listItem.bio.displayableArticle.body.plaidHtml,
      });
    };
  }

  let pageInfo = (listData.titleListItemSearch ?? listData.nameListItemSearch ?? listData.imageItems)!.pageInfo;

  let pagination = {
    next: pageInfo.hasNextPage ? `/list/${listData.id}/?page=${currentPage + 1}` : "",
    prev: pageInfo.hasPreviousPage ? `/list/${listData.id}/?page=${currentPage - 1}` : "",
    range: `${(currentPage - 1) * 250 + 1} – ${Math.min(currentPage * 250, listData.items.total)}`
  };
  return { meta, pagination, data };
}

export default cleanList;
