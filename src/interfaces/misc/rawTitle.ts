export default interface RawTitle {
  props: {
    pageProps: {
      aboveTheFoldData: {
        id: string;
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
        canHaveEpisodes: boolean;
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
        titleText: {
          text: string;
        };
        titleType: {
          text: string;
          id: string;
          isSeries: boolean;
          isEpisode: boolean;
        };
        originalTitleText: {
          text: string;
        };
        certificate?: {
          rating: string;
        };
        releaseYear?: {
          year: number;
          endYear: any;
        };
        releaseDate?: {
          day: number;
          month: number;
          year: number;
        };
        runtime?: {
          seconds: number;
        };
        canRate: {
          isRatable: boolean;
        };
        ratingsSummary: {
          aggregateRating?: number;
          voteCount: number;
        };
        meterRanking?: {
          currentRank: number;
          rankChange: {
            changeDirection: string;
            difference: number;
          };
        };
        primaryImage?: {
          id: string;
          width: number;
          height: number;
          url: string;
          caption: {
            plainText: string;
          };
        };
        images: {
          total: number;
        };
        videos: {
          total: number;
        };
        primaryVideos: {
          edges: Array<{
            node: {
              id: string;
              isMature: boolean;
              contentType: {
                id: string;
                displayName: {
                  value: string;
                };
              };
              thumbnail: {
                url: string;
                height: number;
                width: number;
              };
              runtime: {
                value: number;
              };
              description?: {
                value: string;
                language: string;
              };
              name: {
                value: string;
                language: string;
              };
              playbackURLs: Array<{
                displayName: {
                  value: string;
                  language: string;
                };
                mimeType: string;
                url: string;
              }>;
              previewURLs: Array<{
                displayName: {
                  value: string;
                  language: string;
                };
                mimeType: string;
                url: string;
              }>;
            };
          }>;
        };
        externalLinks: {
          total: number;
        };
        metacritic?: {
          metascore: {
            score: number;
          };
        };
        keywords: {
          total: number;
          edges: Array<{
            node: {
              text: string;
            };
          }>;
        };
        genres: {
          genres: Array<{
            text: string;
            id: string;
          }>;
        };
        plot?: {
          plotText?: {
            plainText: string;
          };
          language?: {
            id: string;
          };
        };
        plotContributionLink: {
          url: string;
        };
        credits: {
          total: number;
        };
        principalCredits: Array<{
          totalCredits: number;
          category: {
            text: string;
            id: string;
          };
          credits: Array<{
            name: {
              nameText: {
                text: string;
              };
              id: string;
            };
            attributes?: Array<{
              text: string;
            }>;
          }>;
        }>;
        reviews: {
          total: number;
        };
        criticReviewsTotal: {
          total: number;
        };
        triviaTotal: {
          total: number;
        };
        meta: {
          canonicalId: string;
          publicationStatus: string;
        };
        castPageTitle: {
          edges: Array<{
            node: {
              name: {
                nameText: {
                  text: string;
                };
              };
            };
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
        directorsPageTitle: Array<{
          credits: Array<{
            name: {
              nameText: {
                text: string;
              };
            };
          }>;
        }>;
        countriesOfOrigin?: {
          countries: Array<{
            id: string;
          }>;
        };
        production: {
          edges: Array<{
            node: {
              company: {
                id: string;
                companyText: {
                  text: string;
                };
              };
            };
          }>;
        };
        featuredReviews: {
          edges: Array<{
            node: {
              author: {
                nickName: string;
              };
              summary: {
                originalText: string;
              };
              text: {
                originalText: {
                  plainText: string;
                };
              };
              authorRating: number;
              submissionDate: string;
            };
          }>;
        };
      };
      mainColumnData: {
        id: string;
        wins: {
          total: number;
        };
        nominations: {
          total: number;
        };
        prestigiousAwardSummary?: {
          nominations: number;
          wins: number;
          award: {
            text: string;
            id: string;
            event: {
              id: string;
            };
          };
        };
        ratingsSummary: {
          topRanking?: {
            id: string;
            text: {
              value: string;
            };
            rank: number;
          };
        };
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
        videos: {
          total: number;
        };
        videoStrip: {
          edges: Array<{
            node: {
              id: string;
              contentType: {
                displayName: {
                  value: string;
                };
              };
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
        titleMainImages: {
          total: number;
          edges: Array<{
            node: {
              id: string;
              url: string;
              caption: {
                plainText: string;
              };
              height: number;
              width: number;
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
          };
        };
        primaryImage?: {
          id: string;
        };
        imageUploadLink?: {
          url: string;
        };
        titleType: {
          id: string;
          canHaveEpisodes: boolean;
        };
        cast: {
          edges: Array<{
            node: {
              name: {
                id: string;
                nameText: {
                  text: string;
                };
                primaryImage?: {
                  url: string;
                  width: number;
                  height: number;
                };
              };
              attributes?: Array<{
                text: string;
              }>;
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
            };
          }>;
        };
        creators: Array<{
          totalCredits: number;
          category: {
            text: string;
          };
          credits: Array<{
            name: {
              id: string;
              nameText: {
                text: string;
              };
            };
            attributes: any;
          }>;
        }>;
        directors: Array<{
          totalCredits: number;
          category: {
            text: string;
          };
          credits: Array<{
            name: {
              id: string;
              nameText: {
                text: string;
              };
            };
            attributes: any;
          }>;
        }>;
        writers: Array<{
          totalCredits: number;
          category: {
            text: string;
          };
          credits: Array<{
            name: {
              id: string;
              nameText: {
                text: string;
              };
            };
            attributes?: Array<{
              text: string;
            }>;
          }>;
        }>;
        isAdult: boolean;
        moreLikeThisTitles: {
          edges: Array<{
            node: {
              id: string;
              titleText: {
                text: string;
              };
              titleType: {
                id: string;
                text: string;
              };
              originalTitleText: {
                text: string;
              };
              primaryImage?: {
                id: string;
                width: number;
                height: number;
                url: string;
              };
              releaseYear?: {
                year: number;
                endYear?: number;
              };
              ratingsSummary: {
                aggregateRating?: number;
                voteCount: number;
              };
              runtime?: {
                seconds: number;
              };
              certificate?: {
                rating: string;
              };
              canRate: {
                isRatable: boolean;
              };
              titleGenres: {
                genres: Array<{
                  genre: {
                    text: string;
                  };
                }>;
              };
              canHaveEpisodes: boolean;
            };
          }>;
        };
        triviaTotal: {
          total: number;
        };
        trivia: {
          edges: Array<{
            node: {
              text: {
                plaidHtml: string;
              };
              trademark: any;
              relatedNames: any;
            };
          }>;
        };
        goofsTotal: {
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
        quotesTotal: {
          total: number;
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
                text: string;
                stageDirection?: string;
              }>;
            };
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
        alternateVersions: {
          total: number;
          edges: Array<{
            node: {
              text: {
                plaidHtml: string;
              };
            };
          }>;
        };
        connections: {
          edges: Array<{
            node: {
              associatedTitle: {
                id: string;
                releaseYear: {
                  year: number;
                };
                titleText: {
                  text: string;
                };
                originalTitleText: {
                  text: string;
                };
                series: any;
              };
              category: {
                text: string;
              };
            };
          }>;
        };
        soundtrack: {
          edges: Array<{
            node: {
              text: string;
              comments?: Array<{
                plaidHtml: string;
              }>;
            };
          }>;
        };
        titleText: {
          text: string;
        };
        originalTitleText: {
          text: string;
        };
        releaseYear?: {
          year: number;
        };
        reviews: {
          total: number;
        };
        featuredReviews: {
          edges: Array<{
            node: {
              id: string;
              author: {
                nickName: string;
                userId: string;
              };
              summary: {
                originalText: string;
              };
              text: {
                originalText: {
                  plaidHtml: string;
                };
              };
              authorRating: number;
              submissionDate: string;
              helpfulness: {
                upVotes: number;
                downVotes: number;
              };
            };
          }>;
        };
        canRate: {
          isRatable: boolean;
        };
        iframeAddReviewLink: {
          url: string;
        };
        faqsTotal: {
          total: number;
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
        };
        releaseDate?: {
          day: number;
          month: number;
          year: number;
          country: {
            id: string;
            text: string;
          };
        };
        countriesOfOrigin?: {
          countries: Array<{
            id: string;
            text: string;
          }>;
        };
        detailsExternalLinks: {
          edges: Array<{
            node: {
              url: string;
              label: string;
              externalLinkRegion?: {
                text: string;
              };
            };
          }>;
          total: number;
        };
        spokenLanguages: {
          spokenLanguages: Array<{
            id: string;
            text: string;
          }>;
        };
        akas: {
          edges: Array<{
            node: {
              text: string;
            };
          }>;
        };
        filmingLocations: {
          edges: Array<{
            node: {
              text: string;
            };
          }>;
          total: number;
        };
        production: {
          edges: Array<{
            node: {
              company: {
                id: string;
                companyText: {
                  text: string;
                };
              };
            };
          }>;
        };
        companies: {
          total: number;
        };
        productionBudget?: {
          budget: {
            amount: number;
            currency: string;
          };
        };
        lifetimeGross?: {
          total: {
            amount: number;
            currency: string;
          };
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
        worldwideGross?: {
          total: {
            amount: number;
            currency: string;
          };
        };
        technicalSpecifications: {
          soundMixes: {
            items: Array<{
              id: string;
              text: string;
              attributes: Array<any>;
            }>;
          };
          aspectRatios: {
            items: Array<{
              aspectRatio: string;
              attributes: Array<any>;
            }>;
          };
          colorations: {
            items: Array<{
              conceptId: string;
              text: string;
              attributes: Array<any>;
            }>;
          };
        };
        runtime?: {
          seconds: number;
        };
        series?: {
          series: {
            runtime?: {
              seconds: number;
            };
          };
        };
        canHaveEpisodes: boolean;
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
      };
    };
  };
}
