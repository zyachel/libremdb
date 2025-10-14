export default interface RawList {
  props: {
    pageProps: {
      aboveTheFoldData: {
        authorName: string
        isListOwner: boolean
        pageViews: {
          totalPageViews: number
          weekPageViews: number
        }
        visibility: string
      }
      initialFilterProps: {
        facetFields: {
          genres: Array<{
            filterId: string
            text: string
            total: number
          }>
          keywords: Array<{
            filterId: string
            text: string
            total: number
          }>
          watchOptions: Array<{
            filterId: string
            text: string
            total: number
          }>
          titleTypes: Array<{
            filterId: string
            text: string
            total: number
          }>
        }
        initialFilters: {}
      }
      mainColumnData: {
        list: {
          author: {
            username: {
              text: string
            }
            userId: string
          }
          id: string
          name?: {
            originalText: string
          }
          listType: {
            id: string
          }
          listClass: {
            id: string
            name: {
              text: string
            }
          }
          description?: {
            originalText: {
              plaidHtml: string
              markdown: string
              plainText: string
            }
          }
          items: {
            total: number
          }
          createdDate: string
          lastModifiedDate: string
          primaryImage: {
            image: {
              id: string
              caption: {
                plainText: string
              }
              height: number
              width: number
              url: string
            }
          }
          visibility: {
            id: string
          }
          titleListItemSearch?: {
            total: number
            pageInfo: {
              hasNextPage: boolean
              hasPreviousPage: boolean
              endCursor: string
            }
            edges: Array<ListTitleItem>
          }
          nameListItemSearch?: {
            total: number
            pageInfo: {
              hasNextPage: boolean
              hasPreviousPage: boolean
              endCursor: string
            }
            edges: Array<ListNameItem>
          }
          imageItems?: {
            total: number
            pageInfo: {
              hasNextPage: boolean
              hasPreviousPage: boolean
              endCursor: string
            }
            edges: Array<ListImageItem>
          }
        }
      }
      showPrivateListMessaging: boolean
      totalItems: number
      totalPossibleItems: number
      initialPageNumber: number
      urqlState: any
      fetchState: any
    }
    __N_SSP: boolean
  }
  page: string
  query: {
    lsconst: string
  }
  buildId: string
  assetPrefix: string
  runtimeConfig: {
    env: string
    stage: string
    cachedGraphQLEndpoint: string
    graphQLEndpoint: string
    graphQLTimeout: string
    adsPublicSiteHost: string
    jwPlayerAssetEndpoint: string
    jwPlayerAssetExpirimentalEndpoint: string
  }
  isFallback: boolean
  gssp: boolean
  locale: string
  locales: Array<string>
  defaultLocale: string
  scriptLoader: Array<any>
}

export interface ListTitleItem {
  node: {
    itemId: string
    absolutePosition: number
    createdDate: string
    description: any
  }
  listItem: {
    id: string
    titleText: {
      text: string
    }
    titleType: {
      id: string
      text: string
      canHaveEpisodes: boolean
      displayableProperty: {
        value: {
          plainText: string
        }
      }
    }
    originalTitleText: {
      text: string
    }
    primaryImage: {
      id: string
      width: number
      height: number
      url: string
      caption: {
        plainText: string
      }
    }
    releaseYear: {
      year: number
      endYear: any
    }
    ratingsSummary: {
      aggregateRating: number
      voteCount: number
    }
    runtime: {
      seconds: number
    }
    certificate?: {
      rating: string
    }
    canRate: {
      isRatable: boolean
    }
    titleGenres: {
      genres: Array<{
        genre: {
          text: string
        }
      }>
    }
    series: any
    latestTrailer?: {
      id: string
    }
    plot: {
      plotText: {
        plainText: string
      }
    }
    releaseDate: {
      day: number
      month: number
      year: number
    }
    productionStatus: {
      currentProductionStage: {
        id: string
        text: string
      }
    }
    episodes: any
    principalCreditsV2: Array<{
      grouping: {
        groupingId: string
        text: string
      }
      credits: Array<{
        name: {
          id: string
          nameText: {
            text: string
          }
        }
      }>
    }>
    metacritic?: {
      metascore: {
        score: number
      }
    }
  }
}

export interface ListNameItem {
  node: {
    itemId: string
    absolutePosition: number
    createdDate: string
    description: any
  }
  listItem: {
    id: string
    primaryImage: {
      url: string
      caption: {
        plainText: string
      }
      width: number
      height: number
    }
    nameText: {
      text: string
    }
    primaryProfessions: Array<{
      category: {
        text: string
      }
    }>
    professions: Array<{
      profession: {
        text: string
      }
    }>
    knownForV2: {
      credits: Array<{
        title: {
          id: string
          originalTitleText?: {
            text: string
          }
          titleText: {
            text: string
          }
          titleType: {
            canHaveEpisodes: boolean
          }
          releaseYear: {
            year: number
            endYear?: number
          }
        }
        episodeCredits: {
          yearRange?: {
            year: number
            endYear: number
          }
        }
      }>
    }
    bio: {
      displayableArticle: {
        body: {
          plaidHtml: string
        }
      }
    }
  }
}

export interface ListImageItem {
  node: {
    itemId: string
    createdDate: string
    absolutePosition: number
    description: any
    listItem: {
      id: string
      url: string
      height: number
      width: number
      caption: {
        plainText: string
      }
      names: Array<{
        id: string
        nameText: {
          text: string
        }
      }>
      titles: Array<{
        id: string
        titleText: {
          text: string
        }
        originalTitleText: {
          text: string
        }
        releaseYear: {
          year: number
          endYear: any
        }
      }>
    }
  }
}
