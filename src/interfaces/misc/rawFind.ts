import { ResultMetaTitleTypes, ResultMetaTypes } from "src/interfaces/shared/search";

export default interface RawFind {
  props: {
    pageProps: {
      companyResults: {
        results: Array<{
          id: string;
          companyName: string;
          countryText: string;
          typeText: string | 0;
        }>;
        nextCursor?: string;
        hasExactMatches?: boolean;
      };
      findPageMeta: {
        searchTerm: string;
        includeAdult: false;
        isExactMatch: boolean;
        searchType?: ResultMetaTypes;
        titleSearchType?: ResultMetaTitleTypes[];
      };
      interestResults: {
        hasExactMatches: boolean;
        results: Array<{
          id: string;
          imageType: string;
          interestPosterImageModel: {
            caption: string;
            maxHeight: number;
            maxWidth: number;
            url: string;
          };
          primaryText: string;
          secondaryText: string;
        }>;
      };
      keywordResults: {
        results: Array<{
          id: string;
          keywordText: string;
          numTitles: number;
        }>;
        nextCursor?: string;
        hasExactMatches?: boolean;
      };
      nameResults: {
        hasExactMatches: boolean
        nextCursor: string
        results: Array<{
          index: string
          listItem: {
            bio: string
            knownFor: {
              canHaveEpisodes: boolean
              originalTitleText: string
              titleId: string
              titleText: string
              yearRange: {
                year: number
                endYear?: number
              }
            }
            nameId: string
            nameText: string
            primaryProfessions: Array<string>
            professions: Array<string>
            primaryImage?: {
              caption: string
              height: number
              url: string
              width: number
            }
          }
        }>
      }
      resultsSectionOrder: Array<string>;
      titleResults: {
        hasExactMatches: boolean
        nextCursor: string
        results: Array<{
          index: string
          listItem: {
            canRate: boolean
            certificate: string
            endYear?: number
            genres: Array<string>
            hasWatchOption: boolean
            metascore?: number
            originalTitleText: string
            plot: string
            primaryImage: {
              caption: string
              height: number
              id: string
              url: string
              width: number
            }
            principalCredits: []
            productionStatus: {
              __typename: string
              currentProductionStage: {
                __typename: string
                id: string
                text: string
              }
            }
            ratingSummary: {
              aggregateRating: number
              voteCount: number
            }
            releaseDate: {
              __typename: string
              day: number
              month: number
              year: number
            }
            releaseYear: number
            runtime: number
            titleId: string
            titleText: string
            titleType: {
              canHaveEpisodes: boolean
              id: string
              text: string
            }
            trailerId: string
          }
        }>
      }
    };
  };
}
