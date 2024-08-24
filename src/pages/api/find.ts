import type { NextApiRequest, NextApiResponse } from 'next';
import Find, { type FindQueryParams } from 'src/interfaces/shared/search';
import basicSearch from 'src/utils/fetchers/basicSearch';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import { findKey } from 'src/utils/constants/keys';
import { AppError, cleanQueryStr, getErrorProperties } from 'src/utils/helpers';
import { findFilterable } from 'src/utils/constants/find';

type ResponseData =
  | { status: true; data: { title: null | string; results: null | Find } }
  | { status: false; message: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    if (req.method !== 'GET') throw new AppError('Invalid method', 400);

    const queryObj = req.query as FindQueryParams;
    const query = queryObj.q?.trim();

    if (!query) {
      return res.status(200).json({ status: true, data: { title: null, results: null } });
    }

    const queryStr = cleanQueryStr(queryObj, findFilterable);
    const results = await getOrSetApiCache(findKey(queryStr), basicSearch, queryStr);

    res.status(200).json({ status: true, data: { title: query, results } });
  } catch (error) {
    const { message, statusCode } = getErrorProperties(error);
    res.status(statusCode).json({ status: false, message });
  }
}
