import type { NextApiRequest, NextApiResponse } from 'next';
import type TitleEpisodes from 'src/interfaces/shared/titleEpisodes';
import episodes from 'src/utils/fetchers/titleEpisodes';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { titleEpisodesKey } from 'src/utils/constants/keys';
import { keys } from 'src/utils/constants/titleEpisodesFilters';
import { AppError, cleanQueryStr } from 'src/utils/helpers';

type ResponseData = { status: true; data: TitleEpisodes } | { status: false; message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    if (req.method !== 'GET') throw new AppError('Invalid method', 400);

    const titleId = req.query.titleId as string;
    const queryObj = req.query as Record<string, string>;
    const queryStr = cleanQueryStr(queryObj, keys);
    const data = await getOrSetApiCache(titleEpisodesKey(titleId, queryStr), episodes, titleId, queryStr);
    res.status(200).json({ status: true, data });
  } catch (error: any) {
    const { message = 'Not found', statusCode = 404 } = error;
    res.status(statusCode).json({ status: false, message });
  }
}
