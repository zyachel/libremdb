import RawFind from 'src/interfaces/misc/rawFind';

const cleanFind = (rawFind: RawFind) => {
  const {
    props: { pageProps: d },
  } = rawFind;

  const cleanData = {
    meta: {
      exact: d.findPageMeta.isExactMatch,
      type: d.findPageMeta.searchType || null,
      titleType: d.findPageMeta.titleSearchType?.[0] || null,
    },
    people: d.nameResults.results.map(({listItem: person}) => ({
      id: person.nameId,
      name: person.nameText,
      bio: person.bio || null,
      professions: person.professions || null,
      knownForTitle: person.knownFor?.titleText || null,
      knownInYear: person.knownFor?.yearRange?.year || null,
      ...(person.primaryImage && {
        image: {
          url: person.primaryImage.url,
          caption: person.primaryImage.caption,
        },
      }),
    })),
    titles: d.titleResults.results.map(({listItem: title}) => ({
      id: title.titleId,
      name: title.titleText,
      type: title.titleType.text,
      plot: title.plot,
      releaseYear: title.releaseDate?.year || null,
      runtime: title.runtime || null,
      certificate: title.certificate || null,
      rating: {
        score: title.ratingSummary.aggregateRating,
        voteCount: title.ratingSummary.voteCount,
      },
      ...(title.primaryImage && {
        image: {
          url: title.primaryImage.url,
          caption: title.primaryImage.caption,
        },
      }),
    })),
    companies: d.companyResults.results.map(company => ({
      id: company.id,
      name: company.companyName,
      type: company.typeText,
      country: company.countryText,
    })),
    keywords: d.keywordResults.results.map(keyword => ({
      id: keyword.id,
      text: keyword.keywordText,
      numTitles: keyword.numTitles,
    })),
  };

  return cleanData;
};

export default cleanFind;
