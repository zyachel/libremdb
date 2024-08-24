import type { NextApiRequest, NextApiResponse } from 'next';
import type { TitleReviewsCursored } from 'src/interfaces/shared/titleReviews';
import { cursoredReviews } from 'src/utils/fetchers/titleReviews';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { titleReviewsKey } from 'src/utils/constants/keys';
import { AppError, cleanQueryStr, getErrorProperties } from 'src/utils/helpers';
import { keys as titleReviewsQueryKeys } from 'src/utils/constants/titleReviewsFilters';

type ResponseData =
  | { status: true; data: TitleReviewsCursored }
  | { status: false; message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    if (req.method !== 'GET') throw new AppError('Invalid method', 400);

    const titleId = req.query.titleId as string;
    const paginationKey = req.query.paginationKey as string;
    const queryObj = req.query as Record<string, string>;
    const queryStr = cleanQueryStr(queryObj, titleReviewsQueryKeys);
    const data = await getOrSetApiCache(
      titleReviewsKey(titleId, queryStr, paginationKey),
      cursoredReviews,
      titleId,
      paginationKey,
      queryStr
    );
    res.status(200).json({ status: true, data });
  } catch (error) {
    const { message, statusCode } = getErrorProperties(error);
    res.status(statusCode).json({ status: false, message });
  }
}
