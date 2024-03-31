import type { NextApiRequest, NextApiResponse } from 'next';
import type TitleReviews from 'src/interfaces/shared/titleReviews';
import reviews from 'src/utils/fetchers/titleReviews';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { titleReviewsKey } from 'src/utils/constants/keys';
import { keys } from 'src/utils/constants/titleReviewsFilters';
import { AppError, cleanQueryStr } from 'src/utils/helpers';

type ResponseData = { status: true; data: TitleReviews } | { status: false; message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    if (req.method !== 'GET') throw new AppError('Invalid method', 400);

    const titleId = req.query.titleId as string;
    const queryObj = req.query as Record<string, string>;
    const queryStr = cleanQueryStr(queryObj, keys);
    const data = await getOrSetApiCache(titleReviewsKey(titleId), reviews, titleId, queryStr);
    res.status(200).json({ status: true, data });
  } catch (error: any) {
    const { message = 'Not found', statusCode = 404 } = error;
    res.status(statusCode).json({ status: false, message });
  }
}
