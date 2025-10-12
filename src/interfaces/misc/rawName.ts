export default interface Name {
  props: {
    pageProps: {
      aboveTheFold: {
        bio: {
          text: {
            plaidHtml: string;
            plainText: string;
          };
        };
        birthDate: {
          date?: string;
          dateComponents: {
            day?: number;
            isBCE: boolean;
            month?: number;
            year: number;
          };
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
        };
        deathDate?: {
          date?: string;
          dateComponents: {
            day?: number;
            month?: number;
            year: number;
          };
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
        };
        deathStatus: 'ALIVE' | 'DEAD';
        disambiguator?: {
          text: string;
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
        knownForV2: {
          credits: Array<{
            creditedRoles: {
              edges: Array<{
                node: {
                  category: {
                    text: string;
                  };
                };
              }>;
            };
            title: {
              titleText: {
                text: string;
              };
            };
          }>;
        };
        meta: {
          canonicalId: string;
          publicationStatus: string;
        };
        meterRanking?: {
          currentRank: number;
          rankChange: {
            changeDirection: 'UP' | 'DOWN' | 'FLAT';
            difference: number;
          };
        };
        nameText: {
          text: string;
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
        primaryProfessions: Array<{
          category: {
            id: string;
            text: string;
          };
        }>;
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
                metricDimensions: Array<{
                  name: string;
                  value: string;
                }>;
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
                  endYear: any;
                  year: number;
                };
                titleText: {
                  text: string;
                };
                titleType: {
                  canHaveEpisodes: boolean;
                };
              };
              recommendedTimedTextTrack: {
                displayName: {
                  language: string;
                  value: string;
                };
                language: string;
                refTagFragment: string;
                type: string;
                url: string;
              };
              runtime: {
                value: number;
              };
              thumbnail: {
                height: number;
                url: string;
                width: number;
              };
              timedTextTracks: Array<{
                displayName: {
                  language: string;
                  value: string;
                };
                language: string;
                refTagFragment: string;
                type: string;
                url: string;
              }>;
            };
          }>;
        };
        professions: Array<{
          profession: {
            id: string;
            text: string;
          };
        }>;
        searchIndexing: {
          disableIndexing: boolean;
        };
        subNavAwardNominations: {
          total: number;
        };
        subNavBio: {
          id: string;
        };
        subNavFaqs: {
          total: number;
        };
        subNavTrivia: {
          total: number;
        };
        videos: {
          total: number;
        };
      };
      mainColumnData: {
        akas: {
          edges: Array<{
            node: {
              displayableProperty: {
                value: {
                  plainText: string;
                };
              };
            };
          }>;
        };
        birthDate: {
          dateComponents: {
            day?: number;
            month?: number;
            year: number;
          };
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
        };
        birthLocation: {
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
          text: string;
        };
        children: {
          edges: Array<{
            node: {
              relationshipType: {
                id: string;
                text: string;
              };
              relationName: {
                name?: {
                  id: string;
                };
                displayableProperty: {
                  value: {
                    plainText: string;
                  };
                };
              };
            };
          }>;
          pageInfo: {
            endCursor?: string;
            hasNextPage: boolean;
          };
          total: number;
        };
        creditSummary: {
          genres: Array<{
            genre: {
              genreId: string;
              text: string;
            };
            total: number;
          }>;
          totalCredits: {
            restriction: any;
            total: number;
          };
        };
        deathCause?: {
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
        };
        deathDate?: {
          dateComponents: {
            day?: number;
            month?: number;
            year: number;
          };
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
        };

        deathLocation?: {
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
          text: string;
        };
        demographicData: Array<null>;
        faqs: {
          edges: Array<{
            node: {
              answer: {
                plaidHtml: string;
                plainText: string;
              };
              attributeId: string;
              question: {
                plainText: string;
              };
            };
          }>;
          total: number;
        };
        groupings: {
          edges: Array<{
            node: {
              credits: {
                total: number;
              };
              grouping: {
                groupingId: string;
                text: string;
              };
            };
          }>;
        };
        height?: {
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
        };
        id: string;
        images: {
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
        knownForFeatureV2: {
          credits: Array<{
            creditedRoles: {
              edges: Array<{
                node: {
                  attributes?: Array<{
                    text: string;
                  }>;
                  category: {
                    categoryId: string;
                    text: string;
                    traits: Array<string>;
                  };
                  characters: {
                    edges: Array<{
                      node: {
                        name: string;
                      };
                    }>;
                  };
                  episodeCredits: {
                    displayableSeasons: {
                      edges: Array<any>;
                      total: number;
                    };
                    displayableYears: {
                      edges: Array<any>;
                      total: number;
                    };
                    total: number;
                    yearRange: any;
                  };
                  text: string;
                };
              }>;
            };
            title: {
              canRate: {
                isRatable: boolean;
              };
              certificate?: {
                rating: string;
              };
              id: string;
              latestTrailer?: {
                id: string;
              };
              originalTitleText: {
                text: string;
              };
              primaryImage: {
                caption: {
                  plainText: string;
                };
                height: number;
                id: string;
                url: string;
                width: number;
              };
              productionStatus: {
                currentProductionStage: {
                  id: string;
                  text: string;
                };
                productionStatusHistory: Array<{
                  status: {
                    id: string;
                    text: string;
                  };
                }>;
              };
              ratingsSummary: {
                aggregateRating?: number;
                voteCount: number;
              };
              releaseYear: {
                endYear?: number;
                year: number;
              };
              runtime?: {
                seconds: number;
              };
              series: null;
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
                id: 'movie' | 'tvSeries' | 'tvEpisode' | 'videoGame';
                text: string;
              };
            };
          }>;
        };
        nameFilmBiography: {
          total: number;
        };
        namePortrayal: {
          total: number;
        };
        namePrintBiography: {
          total: number;
        };
        nameText: {
          text: string;
        };
        newCreditCategoryIdToOldCategoryIdObject: Record<string, string>;
        nickNames: Array<{
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
        }>;
        nominationsExcludeWins: {
          total: number;
        };
        others: {
          edges: Array<{
            node: {
              relationName: {
                displayableProperty: {
                  value: {
                    plainText: string;
                  };
                };
                name: {
                  id: string;
                };
              };
              relationshipType: {
                id: string;
                text: string;
              };
            };
          }>;
          pageInfo: {
            endCursor: string;
            hasNextPage: boolean;
          };
          total: number;
        };
        otherWorks: {
          edges: Array<{
            node: {
              category?: {
                text: string;
              };
              text: {
                plaidHtml: string;
              };
            };
          }>;
          total: number;
        };
        parents: {
          edges: Array<{
            node: {
              relationName: {
                displayableProperty: {
                  value: {
                    plainText: string;
                  };
                };
                name?: {
                  id: string;
                };
              };
              relationshipType: {
                id: string;
                text: string;
              };
            };
          }>;
          pageInfo: {
            endCursor: string;
            hasNextPage: boolean;
          };
          total: number;
        };
        personalDetailsExternalLinks: {
          edges: Array<{
            node: {
              label: string;
              url: string;
            };
          }>;
          total: number;
        };
        personalDetailsSpouses?: Array<{
          spouse: {
            name?: {
              id: string;
              nameText: {
                text: string;
              };
            };
            asMarkdown: {
              plainText: string;
            };
          };
          attributes?: Array<{
            id: string;
            text: string;
          }>;
          timeRange: {
            displayableProperty: {
              value: {
                plaidHtml: string;
              };
            };
          };
        }>;
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
        primaryImage: {
          caption: {
            plainText: string;
          };
          height: number;
          id: string;
          url: string;
          width: number;
        };
        professions: Array<{
          professionCategory: {
            linkedCreditCategory: {
              categoryId: string;
            };
          };
        }>;
        publicityArticle: {
          total: number;
        };
        publicityInterview: {
          total: number;
        };
        publicityListings: {
          total: number;
        };
        publicityMagazineCover: {
          total: number;
        };
        publicityPictorial: {
          total: number;
        };
        quotes: {
          edges: Array<{
            node: {
              displayableArticle: {
                body: {
                  plaidHtml: string;
                };
              };
            };
          }>;
        };
        quotesTotal: {
          total: number;
        };
        released: {
          edges: Array<{
            node: {
              credits: {
                edges: Array<{
                  node: {
                    creditedRoles: {
                      edges: Array<{
                        node: {
                          attributes?: Array<{
                            text: string;
                          }>;
                          category: {
                            categoryId: string;
                            text: string;
                            traits: Array<string>;
                          };
                          characters?: {
                            edges: Array<{
                              node: {
                                name: string;
                              };
                            }>;
                          };
                          text?: string;
                        };
                      }>;
                    };
                    episodeCredits: {
                      displayableSeasons: {
                        edges: Array<{
                          node: {
                            season: string;
                          };
                        }>;
                        total: number;
                      };
                      displayableYears: {
                        edges: Array<{
                          node: {
                            year: string;
                          };
                        }>;
                        total: number;
                      };
                      total: number;
                      yearRange?: {
                        endYear?: number;
                        year: number;
                      };
                    };
                    title: {
                      canRate: {
                        isRatable: boolean;
                      };
                      certificate?: {
                        rating: string;
                      };
                      id: string;
                      latestTrailer?: {
                        id: string;
                      };
                      originalTitleText: {
                        text: string;
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
                      productionStatus: {
                        currentProductionStage: {
                          id: string;
                          text: string;
                        };
                        productionStatusHistory: Array<{
                          status: {
                            id: string;
                            text: string;
                          };
                        }>;
                      };
                      ratingsSummary: {
                        aggregateRating?: number;
                        voteCount: number;
                      };
                      releaseYear: {
                        endYear?: number;
                        year: number;
                      };
                      runtime?: {
                        seconds: number;
                      };
                      series: null;
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
                  };
                }>;
                pageInfo: {
                  endCursor: string;
                  hasNextPage: boolean;
                };
                total: number;
              };
              grouping: {
                groupingId: string;
                text: string;
              };
            };
          }>;
        };
        selfVerifiedData: {
          guildAffiliations: {
            edges: Array<any>;
          };
        };
        titleSalaries: {
          edges: Array<{
            node: {
              title: {
                id: string;
                titleText: {
                  text: string;
                };
                originalTitleText: {
                  text: string;
                };
                releaseYear: {
                  year: number;
                };
              };
              displayableProperty: {
                value: {
                  plainText: string;
                };
              };
            };
          }>;
        };
        titleSalariesTotal: {
          total: number;
        };
        trademarks: {
          edges: Array<{
            node: {
              displayableArticle: {
                body: {
                  plaidHtml: string;
                };
              };
            };
          }>;
        };
        trademarksTotal: {
          total: number;
        };
        trivia: {
          edges: Array<{
            node: {
              displayableArticle: {
                body: {
                  plaidHtml: string;
                };
              };
            };
          }>;
        };
        triviaTotal: {
          total: number;
        };
        unreleased: {
          edges: Array<{
            node: {
              credits: {
                edges: Array<{
                  node: {
                    creditedRoles: {
                      edges: Array<{
                        node: {
                          attributes?: Array<{
                            text: string;
                          }>;
                          category: {
                            categoryId: string;
                            text: string;
                            traits: Array<string>;
                          };
                          characters?: {
                            edges: Array<{
                              node: {
                                name: string;
                              };
                            }>;
                          };
                          text: string;
                        };
                      }>;
                    };
                    episodeCredits: {
                      displayableSeasons: {
                        edges: Array<{
                          node: {
                            season: string;
                            displayableProperty: {
                              value: {
                                plainText: string;
                              };
                            };
                          };
                        }>;
                        total: number;
                      };
                      displayableYears: {
                        total: number;
                        edges: Array<{
                          node: {
                            year: string;
                            displayableProperty: {
                              value: {
                                plainText: string;
                              };
                            };
                          };
                        }>;
                      };
                      total: number;
                      yearRange: any;
                    };
                    title: {
                      canRate: {
                        isRatable: boolean;
                      };
                      certificate?: {
                        rating: string;
                      };
                      id: string;
                      latestTrailer: any;
                      originalTitleText: {
                        text: string;
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
                      productionStatus: {
                        currentProductionStage: {
                          id: string;
                          text: string;
                        };
                        productionStatusHistory: Array<{
                          status: {
                            id: string;
                            text: string;
                          };
                        }>;
                      };
                      ratingsSummary: {
                        aggregateRating: null;
                        voteCount: number;
                      };
                      releaseYear?: {
                        year: number;
                        endYear: null;
                      };
                      runtime?: {
                        seconds: number;
                      };
                      series: null;
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
                  };
                }>;
                pageInfo: {
                  endCursor: string;
                  hasNextPage: boolean;
                };
                total: number;
              };
              grouping: {
                groupingId: string;
                text: string;
              };
            };
          }>;
        };
        videos: {
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
              primaryTitle: {
                originalTitleText: {
                  text: string;
                };
                releaseYear: {
                  endYear?: number;
                  year: number;
                };
                titleText: {
                  text: string;
                };
                titleType: {
                  canHaveEpisodes: boolean;
                };
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
          total: number;
        };
        wins: {
          total: number;
        };
      };
    };
  };
}
