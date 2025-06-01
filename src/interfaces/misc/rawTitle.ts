export default interface RawTitle {
  props: {
    pageProps: {
      aboveTheFoldData: {
        canHaveEpisodes: boolean;
        canRate: {
          isRatable: boolean;
        };
        castPageTitle: {
          edges: Array<{
            node: {
              name: {
                id: string;
                nameText: {
                  text: string;
                };
              };
            };
          }>;
        };
        certificate?: {
          rating: string;
        };
        countriesOfOrigin?: {
          countries: Array<{
            id: string;
          }>;
        };
        creatorsPageTitle: Array<{
          credits: Array<{
            name: {
              nameText: {
                text: string;
              };
            };
          }>;
        }>;
        credits: {
          total: number;
        };
        criticReviewsTotal: {
          total: number;
        };
        directorsPageTitle: Array<{
          credits: Array<{
            name: {
              id: string;
              nameText: {
                text: string;
              };
            };
          }>;
        }>;
        engagementStatistics?: {
          watchlistStatistics: {
            displayableCount: {
              text: string;
            };
          };
        };
        externalLinks: {
          total: number;
        };
        featuredReviews: {
          edges: Array<{
            node: {
              author: {
                nickName: string;
              };
              authorRating?: number;
              submissionDate: string;
              summary: {
                originalText: string;
              };
              text: {
                originalText: {
                  plainText: string;
                };
              };
            };
          }>;
        };
        genres: {
          genres: Array<{
            id: string;
            text: string;
          }>;
        };
        id: string;
        images: {
          edges: Array<{
            node: {
              id: string;
            };
          }>;
          total: number;
        };
        interests: {
          edges: Array<{
            node: {
              id: string;
              primaryText: {
                text: string;
              };
            };
          }>;
        };
        isAdult: boolean;
        keywords: {
          edges: Array<{
            node: {
              text: string;
            };
          }>;
          total: number;
        };
        meta: {
          canonicalId: string;
          publicationStatus: string;
        };
        metacritic?: {
          metascore: {
            score: number;
          };
        };
        meterRanking?: {
          currentRank: number;
          rankChange: {
            changeDirection: string;
            difference: number;
          };
        };
        originalTitleText: {
          text: string;
        };
        plot?: {
          language?: {
            id: string;
          };
          plotText?: {
            plainText: string;
          };
        };
        plotContributionLink: {
          url: string;
        };
        primaryImage?: {
          caption: {
            plainText: string;
          };
          height: number;
          id: string;
          url: string;
          width: number;
        };
        primaryVideos: {
          edges: Array<{
            node: {
              contentType: {
                displayName: {
                  value: string;
                };
                id: string;
              };
              createdDate: string;
              description?: {
                language: string;
                value: string;
              };
              id: string;
              isMature: boolean;
              name: {
                language: string;
                value: string;
              };
              playbackURLs: Array<{
                displayName: {
                  language: string;
                  value: string;
                };
                url: string;
                videoDefinition: string;
                videoMimeType?: string;
              }>;
              previewURLs: Array<{
                displayName: {
                  language: string;
                  value: string;
                };
                url: string;
                videoDefinition: string;
                videoMimeType: string;
              }>;
              primaryTitle: {
                id: string;
                originalTitleText: {
                  text: string;
                };
                releaseYear: {
                  year: number;
                };
                titleText: {
                  text: string;
                };
              };
              recommendedTimedTextTrack: null;
              runtime: {
                value: number;
              };
              thumbnail: {
                height: number;
                url: string;
                width: number;
              };
              timedTextTracks: Array<null>;
            };
          }>;
        };
        principalCredits: Array<{
          category: {
            id: string;
            text: string;
          };
          credits: Array<{
            attributes?: Array<{
              text: string;
            }>;
            name: {
              id: string;
              nameText: {
                text: string;
              };
            };
          }>;
          totalCredits: number;
        }>;
        production: {
          edges: Array<{
            node: {
              company: {
                companyText: {
                  text: string;
                };
                id: string;
              };
            };
          }>;
        };
        productionStatus: {
          currentProductionStage: {
            id: string;
            text: string;
          };
          productionStatusHistory?: Array<{
            status: {
              id: string;
              text: string;
            };
          }>;
          restriction?: {
            restrictionReason: Array<string>;
            unrestrictedTotal: number;
          };
        } | null;
        ratingsSummary: {
          aggregateRating?: number;
          voteCount: number;
        };
        releaseDate: {
          country: {
            text: string;
          };
          day: number;
          month: number;
          year: number;
        };
        releaseYear: {
          endYear: any;
          year: number;
        };
        reviews: {
          total: number;
        };
        runtime?: {
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
          seconds: number;
        };
        series?: {
          episodeNumber: {
            episodeNumber: number;
            seasonNumber: number;
          };
          nextEpisode: {
            id: string;
          };
          previousEpisode:
            | {
                id: string;
              }
            | undefined;
          series: {
            id: string;
            titleText: {
              text: string;
            };
            originalTitleText: {
              text: string;
            };
            titleType: {
              id: string;
            };
            releaseYear: {
              year: number;
              endYear: any;
            };
          };
        };
        subNavCredits: {
          total: number;
        };
        subNavFaqs: {
          total: number;
        };
        subNavReviews: {
          total: number;
        };
        subNavTopQuestions: {
          total: number;
        };
        subNavTrivia: {
          total: number;
        };
        titleGenres: {
          genres: Array<{
            genre: {
              text: string;
            };
          }>;
        };
        titleText: {
          text: string;
        };
        titleType: {
          canHaveEpisodes: boolean;
          categories: Array<{
            value: string;
          }>;
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
          id: string;
          isEpisode: boolean;
          isSeries: boolean;
          text: string;
        };
        triviaTotal: {
          total: number;
        };
        videos: {
          total: number;
        };
      };
      mainColumnData: {
        aggregateRatingsBreakdown: {
          histogram: {
            histogramValues: Array<{
              rating: number;
              voteCount: number;
            }>;
          };
        };
        akas: {
          edges: Array<{
            node: {
              text: string;
            };
          }>;
        };
        alternateVersions: {
          edges: Array<{
            node: {
              text: {
                plaidHtml: string;
              };
            };
          }>;
          total: number;
        };
        canHaveEpisodes: boolean;
        canRate: {
          isRatable: boolean;
        };
        cast: {
          edges: Array<{
            node: {
              attributes?: Array<{
                text: string;
              }>;
              category: {
                id: string;
                text: string;
              };
              characters?: Array<{
                name: string;
              }>;
              episodeCredits: {
                total: number;
                yearRange?: {
                  year: number;
                  endYear: number;
                };
              };
              name: {
                id: string;
                nameText: {
                  text: string;
                };
                primaryImage?: {
                  height: number;
                  url: string;
                  width: number;
                };
              };
            };
          }>;
          total: number;
        };
        companies: {
          total: number;
        };
        connections: {
          edges: Array<{
            node: {
              associatedTitle: {
                id: string;
                originalTitleText: {
                  text: string;
                };
                releaseYear: {
                  year: number;
                };
                series?: {
                  series: {
                    originalTitleText: {
                      text: string;
                    };
                    titleText: {
                      text: string;
                    };
                  };
                };
                titleText: {
                  text: string;
                };
              };
              category: {
                text: string;
              };
            };
          }>;
        };
        contributionQuestions: {
          contributionLink: {
            url: string;
          };
          edges: Array<{
            node: {
              entity: {
                primaryImage?: {
                  url: string;
                  width: number;
                  height: number;
                  caption: {
                    plainText: string;
                  };
                };
              };
              questionId: string;
              questionText: {
                plainText: string;
              };
              contributionLink: {
                url: string;
              };
            };
          }>;
        };
        countriesDetails: {
          countries: Array<{
            id: string;
            text: string;
          }>;
        };
        crazyCredits: {
          edges: Array<{
            node: {
              text: {
                plaidHtml: string;
              };
            };
          }>;
        };
        creators: Array<{
          name: {
            id: string;
            nameText: {
              text: string;
            };
          };
          attributes: any;
        }>;
        detailsExternalLinks: {
          edges: Array<{
            node: {
              externalLinkRegion?: { text: string };
              label: string;
              url: string;
            };
          }>;
          total: number;
        };
        directors: Array<{
          category: {
            id: string;
            text: string;
          };
          credits: Array<{
            name: {
              id: string;
              nameText: {
                text: string;
              };
            };
            attributes?: Array<{ text: string }>;
          }>;
          totalCredits: number;
        }>;
        episodes?: {
          episodes: {
            total: number;
          };
          seasons: Array<{
            number: number;
          }>;
          years: Array<{
            year: number;
          }>;
          totalEpisodes: {
            total: number;
          };
          topRated: {
            edges: Array<{
              node: {
                ratingsSummary: {
                  aggregateRating: number;
                };
              };
            }>;
          };
        };
        faqs: {
          edges: Array<{
            node: {
              id: string;
              question: {
                plainText: string;
              };
            };
          }>;
          total: number;
        };
        featuredReviews: {
          edges: Array<{
            node: {
              author: {
                userId: string;
                username: {
                  text: string;
                };
              };
              authorRating?: number;
              id: string;
              summary: {
                originalText: string;
              };
              text: {
                originalText: {
                  plaidHtml: string;
                };
              };
            };
          }>;
        };
        filmingLocations: {
          edges: Array<{
            node: {
              attributes: Array<string>;
              location: string;
              text: string;
            };
          }>;
          total: number;
        };
        goofs: {
          edges: Array<{
            node: {
              text: {
                plaidHtml: string;
              };
            };
          }>;
        };
        goofsTotal: {
          total: number;
        };
        id: string;
        inIframeAddLink: {
          url: string;
        };
        isAdult: boolean;
        lifetimeGross?: {
          total: {
            amount: number;
            currency: string;
          };
        };
        moreLikeThisTitles: {
          edges: Array<{
            node: {
              canHaveEpisodes: boolean;
              canRate: {
                isRatable: boolean;
              };
              certificate?: {
                rating: string;
              };
              id: string;
              originalTitleText: {
                text: string;
              };
              primaryImage?: {
                caption?: {
                  plainText: string;
                };
                height: number;
                id: string;
                url: string;
                width: number;
              };
              ratingsSummary: {
                aggregateRating?: number;
                voteCount: number;
              };
              releaseYear?: {
                endYear?: number;
                year: number;
              };
              runtime?: {
                seconds: number;
              };
              titleGenres?: {
                genres: Array<{
                  genre: {
                    text: string;
                  };
                }>;
              };
              titleText: {
                text: string;
              };
              titleType: {
                canHaveEpisodes: boolean;
                displayableProperty: {
                  value: {
                    plainText: string;
                  };
                };
                id: string;
                text: string;
              };
            };
          }>;
        };
        nominationsExcludeWins: {
          total: number;
        };
        notInIframeAddLink: {
          url: string;
        };
        openingWeekendGross?: {
          gross: {
            total: {
              amount: number;
              currency: string;
            };
          };
          weekendEndDate: string;
        };
        originalTitleText: {
          text: string;
        };
        prestigiousAwardSummary?: {
          award: {
            event: {
              id: string;
            };
            id: string;
            text: string;
          };
          nominations: number;
          wins: number;
        };
        primaryImage?: {
          caption: {
            plainText: string;
          };
          height: number;
          id: string;
          url: string;
          width: number;
        };
        production: {
          edges: Array<{
            node: {
              company: {
                companyText: {
                  text: string;
                };
                id: string;
              };
            };
          }>;
        };
        productionBudget?: {
          budget: {
            amount: number;
            currency: string;
          };
        };
        productionStatus: {
          currentProductionStage: {
            id: string;
            text: string;
          };
          productionStatusHistory?: Array<{
            status: {
              id: string;
              text: string;
            };
          }>;
          restriction?: {
            restrictionReason: Array<string>;
          };
        };
        quotes: {
          edges: Array<{
            node: {
              lines: Array<{
                characters?: Array<{
                  character: string;
                  name?: {
                    id: string;
                  };
                }>;
                stageDirection?: string;
                text: string;
              }>;
            };
          }>;
        };
        quotesTotal: {
          total: number;
        };
        ratingsSummary: {
          aggregateRating: number;
          notificationText?: string;
          topRanking?: {
            id: string;
            rank: number;
            text: {
              value: string;
            };
          };
          voteCount: number;
        };
        releaseDate?: {
          country: {
            id: string;
            text: string;
          };
          day: number;
          month: number;
          year: number;
        };
        reviews: {
          total: number;
        };
        reviewSummary?: {
          overall: {
            medium: {
              value: {
                plaidHtml: string;
              };
            };
          };
          themes: Array<{
            label: {
              value: string;
            };
            sentiment: string;
            themeId: string;
          }>;
        };
        runtime: {
          seconds: number;
        };
        series?: {
          series: {
            runtime?: {
              seconds: number;
            };
          };
        };
        soundtrack: {
          edges: Array<{
            node: {
              comments?: Array<{
                plaidHtml: string;
              }>;
              text: string;
            };
          }>;
        };
        spokenLanguages: {
          spokenLanguages: Array<{
            id: string;
            text: string;
          }>;
        };
        technicalSpecifications: {
          aspectRatios: {
            items: Array<{
              aspectRatio: string;
              attributes: Array<any>;
            }>;
          };
          colorations: {
            items: Array<{
              attributes: Array<any>;
              conceptId: string;
              text: string;
            }>;
          };
          soundMixes: {
            items: Array<{
              attributes: Array<any>;
              id: string;
              text: string;
            }>;
          };
        };
        titleMainImages: {
          edges: Array<{
            node: {
              caption: {
                plainText: string;
              };
              height: number;
              id: string;
              url: string;
              width: number;
            };
          }>;
          total: number;
        };
        titleText: {
          text: string;
        };
        titleType: {
          canHaveEpisodes: boolean;
          id: string;
        };
        topQuestions: {
          edges: Array<{
            node: {
              attributeId: string;
              question: {
                plainText: string;
              };
            };
          }>;
          total: number;
        };
        trivia: {
          edges: Array<{
            node: {
              relatedNames: any;
              text: {
                plaidHtml: string;
              };
              trademark: any;
            };
          }>;
        };
        triviaTotal: {
          total: number;
        };
        videos: {
          total: number;
        };
        videoStrip: {
          edges: Array<{
            node: {
              contentType: {
                displayName: {
                  value: string;
                };
              };
              id: string;
              name: {
                value: string;
              };
              runtime: {
                value: number;
              };
              thumbnail: {
                height: number;
                url: string;
                width: number;
              };
            };
          }>;
        };
        wins: {
          total: number;
        };
        worldwideGross?: {
          total: {
            amount: number;
            currency: string;
          };
        };
        writers: Array<{
          category: {
            id: string;
            text: string;
          };
          credits: Array<{
            name: {
              id: string;
              nameText: {
                text: string;
              };
            };
            attributes?: Array<{ text: string }>;
          }>;
          totalCredits: number;
        }>;
      };
      tconst: string;
    };
  };
}
