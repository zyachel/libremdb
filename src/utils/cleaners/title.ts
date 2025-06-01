import RawTitle from 'src/interfaces/misc/rawTitle';
import { formatDate } from 'src/utils/helpers';

const cleanTitle = (rawData: RawTitle) => {
  const {
    props: {
      pageProps: { aboveTheFoldData: main, mainColumnData: misc },
    },
  } = rawData;

  const cleanData = {
    titleId: main.id,
    basic: {
      id: main.id,
      isAdult: main.isAdult,
      title: main.titleText.text,
      // ...(main.originalTitleText.text.toLowerCase() !==
      //   main.titleText.text.toLowerCase() && {
      //   originalTitle: main.originalTitleText.text,
      // }),
      type: {
        id: main.titleType.id as 'movie' | 'tvSeries' | 'tvEpisode' | 'videoGame',
        name: main.titleType.text,
      },
      ...(main.productionStatus && {
        status: {
          id: main.productionStatus.currentProductionStage.id,
          text: main.productionStatus.currentProductionStage.text,
        },
      }),
      ceritficate: main.certificate?.rating || null,
      ...(main.releaseYear && {
        releaseYear: {
          start: main.releaseYear.year,
          end: main.releaseYear.endYear,
        },
      }),
      runtime: main.runtime?.seconds || null,
      ratings: {
        avg: main.ratingsSummary.aggregateRating || null,
        numVotes: main.ratingsSummary.voteCount,
      },
      ...(main.meterRanking && {
        ranking: {
          position: main.meterRanking.currentRank,
          change: main.meterRanking.rankChange.difference,
          direction: main.meterRanking.rankChange.changeDirection as 'UP' | 'DOWN' | 'FLAT',
        },
      }),
      genres: main.genres.genres.map(genre => ({
        id: genre.id,
        text: genre.text,
      })),
      interests: main.interests.edges.map(interest => ({
        id: interest.node.id,
        text: interest.node.primaryText.text,
      })),
      plot: main.plot?.plotText?.plainText || null,
      primaryCrew: main.principalCredits.map(type => ({
        type: { category: type.category.text, id: type.category.id },
        crew: type.credits.map(person => ({
          attributes: person.attributes?.map(attr => attr.text) || null,
          name: person.name.nameText.text,
          id: person.name.id,
        })),
      })),
      ...(main.primaryImage && {
        poster: {
          url: main.primaryImage.url,
          id: main.primaryImage.id,
          caption: main.primaryImage.caption.plainText,
        },
      }),
    },
    cast: misc.cast.edges.map(cast => ({
      name: cast.node.name.nameText.text,
      id: cast.node.name.id,
      image: cast.node.name.primaryImage?.url || null,
      attributes: cast.node.attributes?.map(attr => attr.text) || null,
      characters: cast.node.characters?.map(name => name.name) || null,
    })),
    media: {
      ...(main.primaryVideos.edges.length && {
        trailers: main.primaryVideos.edges.map(trailer => ({
          id: trailer.node.id,
          isMature: trailer.node.isMature,
          thumbnail: trailer.node.thumbnail.url,
          runtime: trailer.node.runtime.value,
          caption: trailer.node.description?.value ?? null,
          urls: trailer.node.playbackURLs.map(url => ({
            resolution: url.displayName.value as 'SD' | '480p',
            mimeType: url.videoMimeType ?? null,
            url: url.url,
          })),
        })),
      }),
      images: {
        total: misc.titleMainImages.total,
        images: misc.titleMainImages.edges.map(image => ({
          id: image.node.id,
          url: image.node.url,
          caption: image.node.caption,
        })),
      },
      videos: {
        total: misc.videos.total,
        videos: misc.videoStrip.edges.map(video => ({
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
          event: misc.prestigiousAwardSummary.award.event,
          nominations: misc.prestigiousAwardSummary.nominations,
          wins: misc.prestigiousAwardSummary.wins,
        },
      }),
      topRating: misc.ratingsSummary.topRanking?.rank || null,
    },
    watchlist: {
      text: main.engagementStatistics?.watchlistStatistics.displayableCount.text || null,
    },
    meta: {
      // for tv episode
      ...(main.series && {
        infoEpisode: {
          numSeason: main.series.episodeNumber?.seasonNumber || null,
          numEpisode: main.series.episodeNumber?.episodeNumber || null,
          prevId: main.series.previousEpisode?.id || null,
          nextId: main.series.nextEpisode.id,
          series: {
            id: main.series.series.id,
            title: main.series.series.titleText.text,
            startYear: main.series.series.releaseYear.year,
            endYear: main.series.series.releaseYear.endYear,
          },
        },
      }),
      // for tv series
      ...(misc.episodes && {
        infoSeries: {
          totalEpisodes: misc.episodes.episodes.total,
          seasons: misc.episodes.seasons.map(season => season.number),
          years: misc.episodes.years.map(year => year.year),
          topRatedEpisode: misc.episodes.topRated.edges[0].node.ratingsSummary.aggregateRating,
        },
      }),
    },
    keywords: {
      total: main.keywords.total,
      list: main.keywords.edges.map(word => word.node.text),
    },
    didYouKnow: {
      ...(misc.trivia.edges.length && {
        trivia: {
          total: misc.triviaTotal.total,
          html: misc.trivia.edges[0].node.text.plaidHtml,
        },
      }),
      ...(misc.goofs.edges.length && {
        goofs: {
          total: misc.goofsTotal.total,
          html: misc.goofs.edges[0].node.text.plaidHtml,
        },
      }),
      ...(misc.quotes.edges.length && {
        quotes: {
          total: misc.quotesTotal.total,
          lines: misc.quotes.edges[0].node.lines.map(line => ({
            name: line.characters?.[0].character || null,
            id: line.characters?.[0].name?.id || null,
            stageDirection: line.stageDirection || null,
            text: line.text,
          })),
        },
      }),
      ...(misc.crazyCredits.edges.length && {
        crazyCredits: {
          html: misc.crazyCredits.edges[0].node.text.plaidHtml,
        },
      }),
      ...(misc.alternateVersions.edges.length && {
        alternativeVersions: {
          total: misc.alternateVersions.total,
          html: misc.alternateVersions.edges[0].node.text.plaidHtml,
        },
      }),
      ...(misc.connections.edges.length && {
        connections: {
          startText: misc.connections.edges[0].node.category.text,
          title: {
            id: misc.connections.edges[0].node.associatedTitle.id,
            year: misc.connections.edges[0].node.associatedTitle.releaseYear?.year ?? null,
            text: misc.connections.edges[0].node.associatedTitle.titleText.text,
          },
        },
      }),
      ...(misc.soundtrack.edges.length && {
        soundTrack: {
          title: misc.soundtrack.edges[0].node.text,
          htmls: misc.soundtrack.edges[0].node.comments?.map(html => html.plaidHtml) || null,
        },
      }),
    },
    reviews: {
      metacriticScore: main.metacritic?.metascore.score || null,
      numCriticReviews: main.criticReviewsTotal.total,
      numUserReviews: misc.reviews.total,
      ratingsDistribution:
        misc.aggregateRatingsBreakdown.histogram?.histogramValues.map(v => ({
          rating: v.rating,
          votes: v.voteCount,
        })) || [],
      ...(misc.reviewSummary && {
        ai: {
          summary: misc.reviewSummary.overall.medium.value.plaidHtml,
          themes: misc.reviewSummary.themes.map(t => ({
            text: t.label.value,
            id: t.themeId,
            sentiment: t.sentiment as 'POSITIVE' | 'NEGATIVE',
          })),
        },
      }),
      ...(misc.featuredReviews.edges.length && {
        featuredReviews: misc.featuredReviews.edges.map(featuredReview => ({
          id: featuredReview.node.id,
          reviewer: {
            id: featuredReview.node.author.userId,
            name: featuredReview.node.author.username.text,
          },
          rating: featuredReview.node.authorRating,
          review: {
            summary: featuredReview.node.summary.originalText,
            html: featuredReview.node.text.originalText.plaidHtml,
          },
        })),
      }),
    },
    details: {
      ...(misc.releaseDate && {
        releaseDate: {
          date: formatDate(
            misc.releaseDate.year,
            misc.releaseDate.month - 1, // month starts from 0
            misc.releaseDate.day
          ),
          country: {
            id: misc.releaseDate.country.id,
            text: misc.releaseDate.country.text,
          },
        },
      }),
      ...(misc.countriesDetails && {
        countriesOfOrigin: misc.countriesDetails.countries.map(country => ({
          id: country.id,
          text: country.text,
        })),
      }),
      ...(misc.detailsExternalLinks.edges.length && {
        officialSites: {
          total: misc.detailsExternalLinks.total,
          sites: misc.detailsExternalLinks.edges.map(site => ({
            name: site.node.label,
            url: site.node.url,
            country: site.node.externalLinkRegion?.text || null,
          })),
        },
      }),
      ...(misc.spokenLanguages && {
        languages: misc.spokenLanguages.spokenLanguages.map(lang => ({
          id: lang.id,
          text: lang.text,
        })),
      }),
      alsoKnownAs: misc.akas.edges[0]?.node.text || null,
      ...(misc.filmingLocations.edges.length && {
        filmingLocations: {
          total: misc.filmingLocations.total,
          locations: misc.filmingLocations.edges.map(loc => loc.node.text),
        },
      }),
      ...(misc.production.edges.length && {
        production: {
          total: misc.companies.total,
          companies: misc.production.edges.map(c => ({
            id: c.node.company.id,
            name: c.node.company.companyText.text,
          })),
        },
      }),
    },
    boxOffice: {
      ...(misc.productionBudget && {
        budget: {
          amount: misc.productionBudget.budget.amount,
          currency: misc.productionBudget.budget.currency,
        },
      }),
      ...(misc.worldwideGross && {
        gross: {
          amount: misc.worldwideGross.total.amount,
          currency: misc.worldwideGross.total.currency,
        },
      }),
      ...(misc.lifetimeGross && {
        grossUs: {
          amount: misc.lifetimeGross.total.amount,
          currency: misc.lifetimeGross.total.currency,
        },
      }),
      ...(misc.openingWeekendGross && {
        openingGrossUs: {
          amount: misc.openingWeekendGross.gross.total.amount,
          currency: misc.openingWeekendGross.gross.total.currency,
          date: formatDate(misc.openingWeekendGross.weekendEndDate),
        },
      }),
    },
    technicalSpecs: {
      ...(misc.technicalSpecifications.soundMixes.items.length && {
        soundMixes: misc.technicalSpecifications.soundMixes.items.map(item => ({
          id: item.id,
          name: item.text,
        })),
      }),
      ...(misc.technicalSpecifications.aspectRatios.items.length && {
        aspectRatios: misc.technicalSpecifications.aspectRatios.items.map(item => item.aspectRatio),
      }),
      ...(misc.technicalSpecifications.colorations.items.length && {
        colorations: misc.technicalSpecifications.colorations.items.map(item => ({
          id: item.conceptId,
          name: item.text,
        })),
      }),
      ...(main.runtime && { runtime: main.runtime?.seconds }),
    },
    moreLikeThis: misc.moreLikeThisTitles.edges.map(title => ({
      id: title.node.id,
      title: title.node.titleText.text,
      ...(title.node.primaryImage && {
        poster: {
          id: title.node.primaryImage.id,
          url: title.node.primaryImage.url,
        },
      }),
      type: {
        id: title.node.titleType.id as 'movie' | 'tvSeries' | 'tvEpisode' | 'videoGame',
        text: title.node.titleType.text,
      },
      certificate: title.node.certificate?.rating || null,
      ...(title.node.releaseYear && {
        releaseYear: {
          start: title.node.releaseYear.year,
          end: title.node.releaseYear.endYear || null,
        },
      }),
      runtime: title.node.runtime?.seconds || null,
      ratings: {
        avg: title.node.ratingsSummary.aggregateRating || null,
        numVotes: title.node.ratingsSummary.voteCount,
      },
      genres: title.node.titleGenres?.genres.map(genre => genre.genre.text) ?? null,
    })),
    faqs: {
      questions: misc.faqs.edges.map(q => ({ question: q.node.question, id: q.node.id })),
      total: misc.faqs.total,
    },
  };

  return cleanData;
};

export default cleanTitle;
