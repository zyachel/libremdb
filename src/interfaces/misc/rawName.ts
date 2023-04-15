export default interface Name {
  props: {
    pageProps: {
      aboveTheFold: {
        id: string;
        nameText: {
          text: string;
        };
        disambiguator?: {
          text: string;
        };
        /*
        searchIndexing: {
          disableIndexing: boolean
        }*/
        knownFor: {
          edges: Array<{
            node: {
              title: {
                titleText: {
                  text: string;
                };
              };
              summary: {
                principalCategory: {
                  text: string;
                };
              };
            };
          }>;
        };
        /*
        images: {
          total: number;
        };*/

        primaryImage: {
          id: string;
          url: string;
          height: number;
          width: number;
          caption: {
            plainText: string;
          };
        };
        /*
        meta: {
          canonicalId: string
          publicationStatus: string
        }
        */

        primaryProfessions: Array<{
          category: {
            text: string;
          };
        }>;
        bio: {
          text: {
            plainText: string;
            plaidHtml: string;
          };
        };
        birthDate: {
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
          date?: string;
          dateComponents: {
            day?: number;
            month?: number;
            year: number;
            isBCE: boolean;
          };
        };
        deathDate?: {
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
          date?: string;
          dateComponents: {
            day?: number;
            month?: number;
            year: number;
          };
        };
        deathStatus: 'ALIVE' | 'DEAD';
        meterRanking?: {
          currentRank: number;
          rankChange: {
            changeDirection: 'UP' | 'DOWN' | 'FLAT';
            difference: number;
          };
        };
        subNavBio: {
          id: string;
        };
        subNavTrivia: {
          total: number;
        };
        subNavAwardNominations: {
          total: number;
        };
        // videos: {
        //   total: number;
        // };
        primaryVideos: {
          edges: Array<{
            node: {
              id: string;
              isMature: boolean;
              createdDate: string;
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
              recommendedTimedTextTrack?: {
                displayName: {
                  value: string;
                  language: string;
                };
                refTagFragment: string;
                language: string;
                url: string;
              };
              timedTextTracks: Array<{
                displayName: {
                  value: string;
                  language: string;
                };
                refTagFragment: string;
                language: string;
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
              primaryTitle: {
                originalTitleText: {
                  text: string;
                };
                titleText: {
                  text: string;
                };
                releaseYear: {
                  year: number;
                  endYear: null;
                };
                titleType: {
                  canHaveEpisodes: boolean;
                };
              };
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
        images: {
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
        // primaryImage: {
        //   id: string;
        //   caption: {
        //     plainText: string;
        //   };
        //   height: number;
        //   width: number;
        //   url: string;
        // };
        // imageUploadLink: null;
        // nameText: {
        //   text: string;
        // };
        knownFor: {
          edges: Array<{
            node: {
              summary: {
                attributes?: Array<{
                  text: string;
                }>;
                episodeCount?: number;
                principalCategory: {
                  text: string;
                  id: string;
                };
                principalCharacters?: Array<{
                  name: string;
                }>;
                principalJobs?: Array<{
                  id: string;
                  text: string;
                }>;
                yearRange: {
                  year: number;
                  endYear?: number;
                };
              };
              credit: {
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
                  displayableSeasons: {
                    total: number;
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
                  };
                };
                jobs?: Array<{
                  id: string;
                  text: string;
                }>;
              };
              title: {
                id: string;
                canRate: {
                  isRatable: boolean;
                };
                certificate?: {
                  rating: string;
                };
                originalTitleText: {
                  text: string;
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
                  text: string;
                  id: 'movie' | 'tvSeries' | 'tvEpisode' | 'videoGame';
                };
                primaryImage: {
                  id: string;
                  url: string;
                  height: number;
                  width: number;
                  caption: {
                    plainText: string;
                  };
                };
                ratingsSummary: {
                  aggregateRating?: number;
                  voteCount: number;
                };
                latestTrailer?: {
                  id: string;
                };
                releaseYear: {
                  year: number;
                  endYear?: number;
                };
                runtime?: {
                  seconds: number;
                };
                series: null;
                episodes?: {
                  displayableSeasons: {
                    total: number;
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
                };
                titleGenres: {
                  genres: Array<{
                    genre: {
                      text: string;
                    };
                  }>;
                };
                productionStatus: {
                  currentProductionStage: {
                    id: string;
                    text: string;
                  };
                };
              };
            };
          }>;
        };
        primaryProfessions: Array<{
          category: {
            text: string;
            id: string;
          };
        }>;
        releasedPrimaryCredits: Array<{
          category: {
            id: string;
            text: string;
          };
          credits: {
            total: number;
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
                    endYear?: number;
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
                  displayableSeasons: {
                    total: number;
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
                  };
                };
                title: {
                  id: string;
                  canRate: {
                    isRatable: boolean;
                  };
                  certificate?: {
                    rating: string;
                  };
                  originalTitleText: {
                    text: string;
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
                    text: string;
                    id: string;
                  };
                  primaryImage?: {
                    id: string;
                    url: string;
                    height: number;
                    width: number;
                    caption: {
                      plainText: string;
                    };
                  };
                  ratingsSummary: {
                    aggregateRating?: number;
                    voteCount: number;
                  };
                  latestTrailer?: {
                    id: string;
                  };
                  releaseYear: {
                    year: number;
                    endYear?: number;
                  };
                  runtime?: {
                    seconds: number;
                  };
                  series: null;
                  episodes?: {
                    displayableSeasons: {
                      total: number;
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
                  };
                  titleGenres: {
                    genres: Array<{
                      genre: {
                        text: string;
                      };
                    }>;
                  };
                  productionStatus: {
                    currentProductionStage: {
                      id: string;
                      text: string;
                    };
                  };
                };
                jobs?: Array<{
                  id: string;
                  text: string;
                }>;
              };
            }>;
            // pageInfo: {
            //   hasNextPage: boolean;
            //   hasPreviousPage: boolean;
            //   endCursor: string;
            // };
          };
        }>;
        unreleasedPrimaryCredits: Array<{
          category: {
            id: string;
            text: string;
          };
          credits: {
            total: number;
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
                  yearRange: null;
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
                  displayableSeasons: {
                    total: number;
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
                  };
                };
                title: {
                  id: string;
                  canRate: {
                    isRatable: boolean;
                  };
                  certificate?: {
                    rating: string;
                  };
                  originalTitleText: {
                    text: string;
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
                    text: string;
                    id: string;
                  };
                  primaryImage?: {
                    id: string;
                    url: string;
                    height: number;
                    width: number;
                    caption: {
                      plainText: string;
                    };
                  };
                  ratingsSummary: {
                    aggregateRating: null;
                    voteCount: number;
                  };
                  latestTrailer?: {
                    id: string;
                  };
                  releaseYear?: {
                    year: number;
                    endYear: null;
                  };
                  runtime?: {
                    seconds: number;
                  };
                  series: null;
                  episodes?: {
                    displayableSeasons: {
                      total: number;
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
                  };
                 titleGenres: {
                  genres: Array<{
                    genre: {
                      text: string;
                    };
                  }>;
                };
                  productionStatus: {
                    currentProductionStage: {
                      id: string;
                      text: string;
                    };
                  };
                };
                jobs?: Array<{
                  id: string;
                  text: string;
                }>;
              };
            }>;
            // pageInfo: {
            //   hasNextPage: boolean;
            //   hasPreviousPage: boolean;
            //   endCursor: string;
            // };
          };
        }>;
        jobs: Array<{
          category: {
            id: string;
            text: string;
          };
          credits: {
            total: number;
          };
        }>;
        totalCredits: {
          total: number;
          // restriction?: {
          //   unrestrictedTotal: number;
          //   explanations: Array<{
          //     reason: string;
          //     text: string;
          //   }>;
          // };
        };
        creditSummary: {
          titleTypeCategories: Array<{
            total: number;
            titleTypeCategory: {
              id: string;
              text: string;
            };
          }>;
          genres: Array<{
            total: number;
            genre: {
              id: string;
              displayableProperty: {
                value: {
                  plainText: string;
                };
              };
            };
          }>;
        };
        videos: {
          total: number;
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
              primaryTitle: {
                originalTitleText: {
                  text: string;
                };
                titleText: {
                  text: string;
                };
                releaseYear: {
                  year: number;
                  endYear?: number;
                };
                titleType: {
                  canHaveEpisodes: boolean;
                };
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
        // birthDate: {
        //   dateComponents: {
        //     day?: number;
        //     month?: number;
        //     year: number;
        //   };
        //   displayableProperty: {
        //     value: {
        //       plainText: string;
        //     };
        //   };
        // };
        birthLocation: {
          text: string;
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
        };
        // deathDate?: {
        //   dateComponents: {
        //     day?: number;
        //     month?: number;
        //     year: number;
        //   };
        //   displayableProperty: {
        //     value: {
        //       plainText: string;
        //     };
        //   };
        // };
        deathLocation?: {
          text: string;
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
        };
        deathCause?: {
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
        };
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
          attributes: Array<{
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
        parents: {
          total: number;
          // pageInfo: {
          //   hasNextPage: boolean;
          //   endCursor?: string;
          // };
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
        };
        children: {
          total: number;
          // pageInfo: {
          //   hasNextPage: boolean;
          //   endCursor?: string;
          // };
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
        };
        others: {
          total: number;
          // pageInfo: {
          //   hasNextPage: boolean;
          //   endCursor?: string;
          // };
          edges: Array<{
            node: {
              relationshipType: {
                id: string;
                text: string;
              };
              relationName: {
                name: {
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
        };
        personalDetailsExternalLinks: {
          edges: Array<{
            node: {
              url: string;
              label: string;
            };
          }>;
          total: number;
        };
        publicityListings: {
          total: number;
        };
        nameFilmBiography: {
          total: number;
        };
        namePrintBiography: {
          total: number;
        };
        namePortrayal: {
          total: number;
        };
        publicityInterview: {
          total: number;
        };
        publicityArticle: {
          total: number;
        };
        publicityPictorial: {
          total: number;
        };
        publicityMagazineCover: {
          total: number;
        };
        demographicData: Array<null>;
        triviaTotal: {
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
        quotesTotal: {
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
        trademarksTotal: {
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
        nickNames: Array<{
          displayableProperty: {
            value: {
              plainText: string;
            };
          };
        }>;
        titleSalariesTotal: {
          total: number;
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
      };
    };
  };
}
