import { NextApiRequest, NextApiResponse } from 'next';
import Find, { FindQueryParams } from 'src/interfaces/shared/search';
import getOrSetApiCache from 'src/utils/getOrSetApiCache';
import basicSearch from 'src/utils/fetchers/basicSearch';
import { cleanQueryStr } from 'src/utils/helpers';
import { findKey } from 'src/utils/constants/keys';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryObj = req.query as FindQueryParams;
  const query = queryObj.q?.trim();

  if(!query) {
	res.status(200);
    res.json({
	  title: null,
	  results: null
	});
  }

  try {
	const entries = Object.entries(queryObj);
    const queryStr = cleanQueryStr(entries);
    const result = await getOrSetApiCache(findKey(queryStr), basicSearch, queryStr);
    res.status(200);
    res.json({
	  title: query,
	  results: result
	});
  } catch (error: any) {
    const { message, statusCode } = error;
    res.status(statusCode);
    res.json({
	  success: false,
	  message: message
	 });
  }
}
