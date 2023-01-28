import RawFind from 'src/interfaces/misc/rawFind';

const formatSAndE = (
  season: string | undefined,
  episode: string | undefined
) => {
  if (season && season !== 'Unknown' && episode && episode !== 'Unknown')
    return `S${season} E${episode}`;
  return null;
};

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
    people: d.nameResults.results.map(person => ({
      id: person.id,
      name: person.displayNameText,
      aka: person.akaName || null,
      jobCateogry: person.knownForJobCategory || null,
      knownForTitle: person.knownForTitleText || null,
      knownInYear: person.knownForTitleYear || null,
      ...(person.avatarImageModel && {
        image: {
          url: person.avatarImageModel.url,
          caption: person.avatarImageModel.caption,
        },
      }),
    })),
    titles: d.titleResults.results.map(title => ({
      id: title.id,
      name: title.titleNameText,
      type: title.titleTypeText,
      releaseYear: title.titleReleaseText || null,
      credits: title.topCredits,
      ...(title.titlePosterImageModel && {
        image: {
          url: title.titlePosterImageModel.url,
          caption: title.titlePosterImageModel.caption,
        },
      }),
      seriesId: title.seriesId || null,
      seriesName: title.seriesNameText || null,
      seriesType: title.seriesTypeText || null,
      seriesReleaseYear: title.seriesReleaseText || null,
      sAndE: formatSAndE(title.seriesSeasonText, title.seriesEpisodeText),
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
