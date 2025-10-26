import * as cheerio from 'cheerio';
import axiosInstance, { isSaneError } from 'src/utils/axiosInstance';
import { AppError } from 'src/utils/helpers';

const trivia = async (titleId: string, page: number = 1) => {
  try {
    // Fetch the trivia page (with optional page parameter)
    const url = page > 1 ? `/title/${titleId}/trivia?page=${page}` : `/title/${titleId}/trivia`;

    const res = await axiosInstance(url);
    const $ = cheerio.load(res.data);
    const rawData = $('script#__NEXT_DATA__').text();

    if (!rawData) {
      throw new AppError('Could not find trivia data', 404);
    }

    let parsedData;
    try {
      parsedData = JSON.parse(rawData);
    } catch (e) {
      throw new AppError('Invalid JSON data', 500);
    }

    const pageProps = parsedData?.props?.pageProps;

    if (!pageProps) {
      throw new AppError('Invalid data structure - no pageProps', 500);
    }

    // Extract metadata
    const mainData = pageProps.contentData?.entityMetadata;
    const triviaCategories = pageProps.contentData?.data?.title?.triviaCategories;
    const titleData = pageProps.contentData?.data?.title;

    const meta = {
      title: mainData?.titleText?.text || mainData?.originalTitleText?.text || '',
      year: mainData?.releaseYear?.year ? `(${mainData.releaseYear.year})` : '',
      image: mainData?.primaryImage?.url || null,
      titleId: mainData?.id || titleId,
    };

    // Extract trivia items from triviaCategories array
    const triviaList: Array<{ html: string; text: string; isSpoiler?: boolean }> = [];

    if (triviaCategories && typeof triviaCategories === 'object') {
      const categoriesArray = Object.values(triviaCategories);

      categoriesArray.forEach((category: any) => {
        // Extract regular trivia
        if (category?.trivia?.edges && Array.isArray(category.trivia.edges)) {
          category.trivia.edges.forEach((edge: any) => {
            const htmlContent = edge?.node?.displayableArticle?.body?.plaidHtml;
            if (htmlContent) {
              triviaList.push({
                html: htmlContent,
                text: htmlContent.replace(/<[^>]*>/g, '').trim(),
              });
            }
          });
        }

        // Extract spoiler trivia
        if (category?.spoilerTrivia?.edges && Array.isArray(category.spoilerTrivia.edges)) {
          category.spoilerTrivia.edges.forEach((edge: any) => {
            const htmlContent = edge?.node?.displayableArticle?.body?.plaidHtml;
            if (htmlContent) {
              triviaList.push({
                html: htmlContent,
                text: htmlContent.replace(/<[^>]*>/g, '').trim(),
                isSpoiler: true,
              });
            }
          });
        }
      });
    }

    // Get total count from subNavTrivia
    const total = titleData?.subNavTrivia?.total || triviaList.length;

    return {
      meta,
      total,
      items: triviaList,
      hasMore: triviaList.length > 0 && triviaList.length < total,
    };
  } catch (err) {
    if (isSaneError(err) && err.response?.status === 404) {
      throw new AppError('not found', 404, err);
    }

    if (err instanceof AppError) throw err;

    throw new AppError('something went wrong', 500, err);
  }
};

export default trivia;
