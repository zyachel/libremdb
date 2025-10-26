type DataKind = 'IMAGES' | 'TITLES' | 'PEOPLE'; // VIDEOS;

export default interface RawList<T extends DataKind = DataKind> {
  props: {
    pageProps: {
      aboveTheFoldData: {
        authorName: string;
        disableIndexAndFollow: boolean;
        isListOwner: boolean;
        pageViews: {
          totalPageViews: number;
          weekPageViews: number;
        };
        visibility: 'PUBLIC';
      };
      mainColumnData: {
        list: {
          author: {
            username: {
              text: string;
            };
            userId: string;
          };
          id: string;
          name?: {
            originalText: string;
          };
          listType: {
            id: T;
          };
          listClass: {
            id: string;
            name: {
              text: string;
            };
          };
          description?: {
            originalText?: {
              plaidHtml: string;
              markdown: string;
              plainText: string;
            };
          };
          items: {
            total: number;
          };
          createdDate: string;
          lastModifiedDate: string;
          primaryImage: {
            image: {
              id: string;
              caption: {
                plainText: string;
              };
              height: number;
              width: number;
              url: string;
            };
          };
          visibility: {
            id: 'PUBLIC';
          };
          titleListItemSearch: T extends 'TITLES' ? ItemShell<ListTitleItem> : never;
          nameListItemSearch: T extends 'PEOPLE' ? ItemShell<ListNameItem> : never;
          imageItems: T extends 'IMAGES' ? ItemShell<ListImageItem, 'inside'> : never;
        };
      };
      showPrivateListMessaging: boolean;
      totalItems: number;
      totalPossibleItems: number;
      initialPageNumber: number;
    };
  };
}

// everything is same across all three datakinds save for the location of `listItem`
// which is inside the node in case of `IMAGES`. hence this generic mess.
interface ItemShell<T, Pos extends 'outside' | 'inside' = 'outside'> {
  total: number;
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string;
  };
  edges: Array<{
    node: {
      itemId: string;
      absolutePosition: number;
      createdDate: string;
      description?: {
        originalText?: {
          plaidHtml: string;
        };
      };
      listItem: Pos extends 'inside' ? T : never;
    };
    listItem: Pos extends 'outside' ? T : never;
  }>;
}

interface ListTitleItem {
  id: string;
  titleText: {
    text: string;
  };
  titleType: {
    id: string;
    text: string;
    canHaveEpisodes: boolean;
    displayableProperty: {
      value: {
        plainText: string;
      };
    };
  };
  originalTitleText: {
    text: string;
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
  releaseYear: {
    year: number;
    endYear?: number;
  };
  ratingsSummary: {
    aggregateRating: number;
    voteCount: number;
  };
  runtime: {
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
  series: any;
  latestTrailer?: {
    id: string;
  };
  plot: {
    plotText: {
      plainText: string;
    };
  };
  releaseDate: {
    day: number;
    month: number;
    year: number;
  };
  productionStatus: {
    currentProductionStage: {
      id: string;
      text: string;
    };
  };
  episodes: any;
  principalCreditsV2: Array<{
    grouping: {
      groupingId: string;
      text: string;
    };
    credits: Array<{
      name: {
        id: string;
        nameText: {
          text: string;
        };
      };
    }>;
  }>;
  metacritic?: {
    metascore: {
      score: number;
    };
  };
}

interface ListNameItem {
  id: string;
  primaryImage: {
    url: string;
    caption: {
      plainText: string;
    };
    width: number;
    height: number;
  };
  nameText: {
    text: string;
  };
  primaryProfessions: Array<{
    category: {
      text: string;
    };
  }>;
  professions: Array<{
    profession: {
      text: string;
    };
  }>;
  knownForV2: {
    credits: Array<{
      title: {
        id: string;
        originalTitleText?: {
          text: string;
        };
        titleText: {
          text: string;
        };
        titleType: {
          canHaveEpisodes: boolean;
        };
        releaseYear: {
          year: number;
          endYear?: number;
        };
      };
      episodeCredits: {
        yearRange?: {
          year: number;
          endYear: number;
        };
      };
    }>;
  };
  bio: {
    displayableArticle: {
      body: {
        plaidHtml: string;
      };
    };
  };
}

interface ListImageItem {
  id: string;
  url?: string;
  height?: number;
  width?: number;
  caption?: {
    plainText: string;
  };
  names?: Array<{
    id: string;
    nameText: {
      text: string;
    };
  }>;
  titles?: Array<{
    id: string;
    titleText: {
      text: string;
    };
    originalTitleText: {
      text: string;
    };
    releaseYear: {
      year: number;
      endYear?: number;
    };
  }>;
}
