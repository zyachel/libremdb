import RawName from 'src/interfaces/misc/rawName';

const cleanName = (rawData: RawName) => {
  const {
    props: {
      pageProps: { aboveTheFold: main, mainColumnData: misc },
    },
  } = rawData;

  const cleanData = {
    nameId: main.id,
    basic: {
      id: main.id,
      name: main.nameText.text,
      nameSuffix: main.disambiguator?.text ?? null,
      knownFor: {
        title: main.knownFor.edges[0]?.node.title.titleText.text ?? null,
        role: main.knownFor.edges[0]?.node.summary.principalCategory.text ?? null,
      },
      ...(main.primaryImage && {
        poster: {
          url: main.primaryImage.url,
          id: main.primaryImage.id,
          caption: main.primaryImage.caption.plainText,
        },
      }),
      primaryProfessions: main.primaryProfessions.map(profession => profession.category.text),
      bio: {
        full: main.bio.text.plaidHtml,
        short: main.bio.text.plainText.slice(0, 600),
      },
      birthDate: main.birthDate?.displayableProperty.value.plainText ?? null,
      deathStatus: main.deathStatus,
      deathDate: main.deathDate?.displayableProperty.value.plainText ?? null,
      ...(main.meterRanking && {
        ranking: {
          position: main.meterRanking.currentRank,
          change: main.meterRanking.rankChange.difference,
          direction: main.meterRanking.rankChange.changeDirection,
        },
      }),
    },
    media: {
      ...(main.primaryVideos.edges.length && {
        trailer: {
          id: main.primaryVideos.edges[0].node.id,
          isMature: main.primaryVideos.edges[0].node.isMature,
          thumbnail: main.primaryVideos.edges[0].node.thumbnail.url,
          runtime: main.primaryVideos.edges[0].node.runtime.value,
          caption: main.primaryVideos.edges[0].node.description?.value ?? null,
          urls: main.primaryVideos.edges[0].node.playbackURLs.map(url => ({
            resolution: url.displayName.value,
            mimeType: url.mimeType ?? null,
            url: url.url,
          })),
        },
      }),
      images: {
        total: misc.images.total,
        images: misc.images.edges.map(image => ({
          id: image.node.id,
          url: image.node.url,
          caption: image.node.caption,
        })),
      },
      videos: {
        total: misc.videos.total,
        videos: misc.videos.edges.map(video => ({
          id: video.node.id,
          type: video.node.contentType.displayName.value,
          caption: video.node.name.value,
          runtime: video.node.runtime.value,
          thumbnail: video.node.thumbnail.url,
        })),
      },
    },
    accolades: {
      wins: misc.wins.total,
      nominations: misc.nominationsExcludeWins.total,
      ...(misc.prestigiousAwardSummary && {
        awards: {
          name: misc.prestigiousAwardSummary.award.text,
          id: misc.prestigiousAwardSummary.award.id,
          event: misc.prestigiousAwardSummary.award.event.id,
          nominations: misc.prestigiousAwardSummary.nominations,
          wins: misc.prestigiousAwardSummary.wins,
        },
      }),
    },
    knownFor: misc.knownForFeature.edges.map(item => ({
      id: item.node.title.id,
      title: item.node.title.titleText.text,
      ...(item.node.title.primaryImage && {
        poster: {
          id: item.node.title.primaryImage.id,
          url: item.node.title.primaryImage.url,
          caption: item.node.title.primaryImage.caption.plainText,
        },
      }),
      type: {
        id: item.node.title.titleType.id,
        text: item.node.title.titleType.text,
      },
      certificate: item.node.title.certificate?.rating ?? null,
      ...(item.node.title.releaseYear && {
        releaseYear: {
          start: item.node.title.releaseYear.year,
          end: item.node.title.releaseYear.endYear ?? null,
        },
      }),
      runtime: item.node.title.runtime?.seconds ?? null,
      ratings: {
        avg: item.node.title.ratingsSummary.aggregateRating ?? null,
        numVotes: item.node.title.ratingsSummary.voteCount,
      },
      genres: item.node.title.titleGenres?.genres.map(genre => genre.genre.text) ?? [],

      summary: {
        numEpisodes: item.node.summary.episodeCount ?? null,
        years: {
          start: item.node.summary.yearRange.year,
          end: item.node.summary.yearRange.endYear ?? null,
        },
        characters: item.node.summary.principalCharacters?.map(character => character.name) ?? null,
        jobs: item.node.summary.principalJobs?.map(job => job.text) ?? null,
      },
    })),
    credits: {
      total: misc.totalCredits?.total ?? null,
      summary: {
        titleType: misc.creditSummary.titleTypeCategories.map(cat => ({
          total: cat.total,
          id: cat.titleTypeCategory.id,
          label: cat.titleTypeCategory.text,
        })),
        genres:
          misc.creditSummary.genres.map(genre => ({
            total: genre.total,
            name: genre.genre.displayableProperty.value.plainText,
          })) ?? [],
      },
      released: getCredits(misc.releasedPrimaryCredits),
      // unreleased: getCredits<'unreleased'>(misc.unreleasedPrimaryCredits),
    },
    personalDetails: {
      officialSites: misc.personalDetailsExternalLinks.edges.map(item => ({
        name: item.node.label,
        url: item.node.url,
      })),
      alsoKnownAs: misc.akas.edges.map(item => item.node.displayableProperty.value.plainText),
      height: misc.height?.displayableProperty.value.plainText ?? null,
      birth: {
        location: misc.birthLocation?.text ?? null,
        date: main.birthDate?.displayableProperty.value.plainText ?? null,
      },
      death: {
        location: misc.deathLocation?.displayableProperty.value.plainText ?? null,
        cause: misc.deathCause?.displayableProperty.value.plainText ?? null,
        date: main.deathDate?.displayableProperty.value.plainText ?? null,
      },
      spouses:
        misc.personalDetailsSpouses?.map(spouse => ({
          name: spouse.spouse.asMarkdown.plainText,
          id: spouse.spouse.name?.id ?? null,
          range: spouse.timeRange.displayableProperty.value.plaidHtml,
          attributes: spouse.attributes?.map(attr => attr.text) ?? null,
        })) ?? null,
      children: misc.children.edges.map(child => ({
        name: child.node.relationName.displayableProperty.value.plainText,
        id: child.node.relationName.name?.id ?? null,
      })),
      parents: misc.parents.edges.map(parent => ({
        name: parent.node.relationName.displayableProperty.value.plainText,
        id: parent.node.relationName.name?.id ?? null,
      })),
      relatives: misc.others.edges.map(relative => ({
        relation: relative.node.relationshipType.text,
        id: relative.node.relationName.name?.id ?? null,
        name: relative.node.relationName.displayableProperty.value.plainText,
      })),
      otherWorks: misc.otherWorks.edges.map(work => ({
        summary: work.node.category?.text ?? null,
        text: work.node.text.plaidHtml,
      })),
      publicity: {
        total: misc.publicityListings.total,
        filmBiographies: misc.nameFilmBiography.total,
        printBiographies: misc.namePrintBiography.total,
        interviews: misc.publicityInterview.total,
        articles: misc.publicityArticle.total,
        magazines: misc.publicityMagazineCover.total,
        pictorials: misc.publicityPictorial.total,
      },
    },
    didYouKnow: {
      ...(misc.trivia.edges.length && {
        trivia: {
          total: misc.triviaTotal.total,
          html: misc.trivia.edges[0].node.displayableArticle.body.plaidHtml,
        },
      }),
      ...(misc.trademarks.edges.length && {
        trademark: {
          total: misc.trademarksTotal.total,
          html: misc.trademarks.edges[0].node.displayableArticle.body.plaidHtml,
        },
      }),
      ...(misc.quotes.edges.length && {
        quotes: {
          total: misc.quotesTotal.total,
          html: misc.quotes.edges[0].node.displayableArticle.body.plaidHtml,
        },
      }),
      nicknames: misc.nickNames.map(name => name.displayableProperty.value.plainText),
      ...(misc.titleSalaries.edges.length && {
        salary: {
          total: misc.titleSalariesTotal.total,
          value: misc.titleSalaries.edges[0].node.displayableProperty.value.plainText,
          title: {
            id: misc.titleSalaries.edges[0].node.title.id,
            year: misc.titleSalaries.edges[0].node.title.releaseYear?.year ?? null,
            text: misc.titleSalaries.edges[0].node.title.titleText.text,
          },
        },
      }),
    },
  };

  return cleanData;
};

type RawReleased = RawName['props']['pageProps']['mainColumnData']['releasedPrimaryCredits'];
type RawUnreleased = RawName['props']['pageProps']['mainColumnData']['unreleasedPrimaryCredits'];
const getCredits = <T extends 'released' | 'unreleased' = 'released'>(
  credits: T extends 'released' ? RawReleased : RawUnreleased
) =>
  credits.map(creditItem => ({
    category: creditItem.category,
    total: creditItem.credits.total,
    titles: creditItem.credits.edges.map(item => ({
      id: item.node.title.id,
      title: item.node.title.titleText.text,
      ...(item.node.title.primaryImage && {
        poster: {
          id: item.node.title.primaryImage.id,
          url: item.node.title.primaryImage.url,
          caption: item.node.title.primaryImage.caption.plainText,
        },
      }),
      type: {
        id: item.node.title.titleType.id,
        text: item.node.title.titleType.text,
      },
      certificate: item.node.title.certificate?.rating ?? null,
      ...(item.node.title.releaseYear && {
        releaseYear: {
          start: item.node.title.releaseYear.year,
          end: item.node.title.releaseYear.endYear ?? null,
        },
      }),
      runtime: item.node.title.runtime?.seconds ?? null,
      ratings: {
        avg: item.node.title.ratingsSummary.aggregateRating ?? null,
        numVotes: item.node.title.ratingsSummary.voteCount,
      },
      test: JSON.stringify(item.node.title),
      genres: item.node.title.titleGenres?.genres.map(genre => genre.genre.text) ?? [],
      productionStatus: item.node.title.productionStatus.currentProductionStage.text,

      summary: {
        numEpisodes: item.node.episodeCredits.total,
        years: {
          start: item.node.episodeCredits.yearRange?.year ?? null,
          end: item.node.episodeCredits.yearRange?.endYear ?? null,
        },
        characters: item.node.characters?.map(char => char.name) ?? null,
        jobs: item.node.jobs?.map(job => job.text) ?? null,
      },
    })),
  }));

export default cleanName;
