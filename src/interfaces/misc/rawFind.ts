import { ResultMetaTitleTypes, ResultMetaTypes } from '../shared/search';

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
          id: string;
          displayNameText: string;
          knownForJobCategory: string | 0;
          knownForTitleText: string | 0;
          knownForTitleYear: string | 0;
          avatarImageModel?: {
            url: string;
            // maxHeight: number;
            // maxWidth: number;
            caption: string;
          };
          akaName?: string;
        }>;
        // nextCursor?: string;
        // hasExactMatches?: boolean;
      };
      titleResults: {
        results: Array<{
          id: string;
          titleNameText: string;
          titleReleaseText?: string;
          titleTypeText: string;
          titlePosterImageModel?: {
            url: string;
            // maxHeight: number;
            // maxWidth: number;
            caption: string;
          };
          topCredits: Array<string>;
          imageType: string;
          seriesId?: string;
          seriesNameText?: string;
          seriesReleaseText?: string;
          seriesTypeText?: string;
          seriesSeasonText?: string;
          seriesEpisodeText?: string;
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
