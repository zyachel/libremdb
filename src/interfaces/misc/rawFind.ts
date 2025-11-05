import {
  ResultMetaTitleTypes,
  ResultMetaTypes,
} from 'src/interfaces/shared/search';

export default interface RawFind {
  props: {
    pageProps: {
      findPageMeta: {
        searchTerm: string;
        includeAdult: false;
        isExactMatch: boolean;
        searchType?: ResultMetaTypes;
        titleSearchType?: ResultMetaTitleTypes[];
      };
      nameResults: {
        results: Array<{
          index: string;
          listItem: {
            nameId: string;
            nameText: string;
            knownFor?: {
              originalTitleText: string;
              titleId: string;
              titleText: string;
              canHaveEpisodes: false;
              yearRange: {
                year: number;
              }
            };
            primaryImage?: {
              url: string;
              height: number;
              width: number;
              caption: string;
            };
            professions: string[];
            bio?: string;
          }
        }>;
        // nextCursor?: string;
        // hasExactMatches?: boolean;
      };
      titleResults: {
        results: Array<{
          index: string;
          listItem: {
            titleId: string;
            titleText: string;
            titleType: {
              canHaveEpisodes: boolean;
              id: string;
              text: string;
            };
            originalTitleText: string;
            plot: string;
            primaryImage: {
              url: string;
              height: number;
              width: number;
              caption: string;
            };
            ratingSummary: {
              aggregateRating: number;
              voteCount: number;
            };
            releaseDate?: {
              day: number;
              month: number;
              year: number;
            };
            runtime: number;
            trailerId: string,
            certificate?: string;
          }
        }>;
        // nextCursor?: string;
        // hasExactMatches?: boolean;
      };
      companyResults: {
        results: Array<{
          id: string;
          companyName: string;
          countryText: string;
          typeText: string | 0;
        }>;
        // nextCursor?: string;
        // hasExactMatches?: boolean;
      };
      keywordResults: {
        results: Array<{
          id: string;
          keywordText: string;
          numTitles: number;
        }>;
        // nextCursor?: string;
        // hasExactMatches?: boolean;
      };
      resultsSectionOrder: Array<string>;
    };
  };
}

// const x: RawFind<'tt'> = {
//   props: {pageProps: {findPageMeta: {
//     titleSearchType: ['MOVIE']
//   }}}
// }
